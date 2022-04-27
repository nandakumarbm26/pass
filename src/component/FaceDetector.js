// import React, { useEffect } from "react";
// import * as faceapi from "face-api.js";
import { useSelector, useDispatch } from "react-redux";
import { faceStats, cameraReq } from "../redux/country/action";

// function App() {
//   const dispatch = useDispatch();
//   const [modelsLoaded, setModelsLoaded] = React.useState(false);
//   const [captureVide, setCaptureVide] = React.useState(false);
//   const state = useSelector((state) => state.store);

//   const videoRef = React.useRef();
//   const videoHeight = 480;
//   const videoWidth = 640;
//   const canvasRef = React.useRef();

//   React.useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + "/models";

//       Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//         faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//       ]).then(setModelsLoaded(true));
//     };
//     loadModels();
//     startVideo();
//   }, []);

//   const startVideo = () => {
//     setCaptureVide(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then((stream) => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((err) => {
//         console.error("error:", err);
//       });
//   };

//   const handleVideoOnPlay = () => {
//     setInterval(async () => {
//       if (canvasRef && canvasRef.current) {
//         canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
//           videoRef.current
//         );
//         const displaySize = {
//           width: videoWidth,
//           height: videoHeight,
//         };

//         faceapi.matchDimensions(canvasRef.current, displaySize);

//         const detections = await faceapi
//           .detectAllFaces(
//             videoRef.current,
//             new faceapi.TinyFaceDetectorOptions()
//           )
//           .withFaceLandmarks()
//           .withFaceExpressions();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );
//         try {
//           resizedDetections[0].landmarks._positions[27] &&
//             dispatch(faceStats(true));
//         } catch (e) {
//           dispatch(faceStats(false));
//         }
//         canvasRef &&
//           canvasRef.current &&
//           canvasRef.current
//             .getContext("2d")
//             .clearRect(0, 0, videoWidth, videoHeight);
//         canvasRef &&
//           canvasRef.current &&
//           faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
//         canvasRef &&
//           canvasRef.current &&
//           faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
//       }
//     }, 100);
//   };
//   useEffect(() => {
//     console.log(state);
//   }, [state.captureVide]);

//   const closeWebcam = () => {
//     videoRef.current.pause();
//     videoRef.current.srcObject.getTracks()[0].stop();
//     setCaptureVide(false);
//   };

//   return (
//     <div style={{ display: "none" }}>
//       {state.captureVide ? (
//         modelsLoaded ? (
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 padding: "10px",
//               }}
//             >
//               <video
//                 ref={videoRef}
//                 height={videoHeight}
//                 width={videoWidth}
//                 onPlay={handleVideoOnPlay}
//                 style={{ borderRadius: "10px" }}
//               />
//               <canvas ref={canvasRef} style={{ position: "absolute" }} />
//             </div>
//           </div>
//         ) : (
//           <div>loading...</div>
//         )
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }

// export default App;
import * as faceapi from "face-api.js";
import React, { useEffect, useRef } from "react";

function App() {
  const open = useRef();
  const close = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store);
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [smile, setSmile] = React.useState(false);
  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
    startVideo();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };
  useEffect(
    () =>
      smile &&
      alert("Facial expression should be Neutral. Please do not Smile!"),
    [smile]
  );
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        try {
          resizedDetections[0].landmarks._positions[27] &&
            dispatch(faceStats(true));
          resizedDetections[0].expressions.neutral < 0.7
            ? setSmile(true)
            : setSmile(false);
        } catch (e) {
          dispatch(faceStats(false));
        }
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <div style={{ display: "none" }}>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
