import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./aequm/theme";
import { CssBaseline } from "@mui/material";
import Homepage from "./container/homepage/index2";
import Passport from "./aequm/Aequm";
import App from "./container/passport/Page";
import * as faceapi from "face-api.js";

export default function index() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        {/* <Router forceRefresh>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/passport">
              <Passport />
            </Route>
          </Switch>
        </Router> */}
        <App />
      </ThemeProvider>
    </Fragment>
  );
}

// function App() {
//   const [modelsLoaded, setModelsLoaded] = React.useState(false);
//   const [captureVideo, setCaptureVideo] = React.useState(false);
//   const [image, setImage] = React.useState("");
//   const videoRef = React.useRef();
//   const videoHeight = 1080;
//   const videoWidth = 1920;
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
//   }, []);

//   const startVideo = () => {
//     setCaptureVideo(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: videoWidth, height: videoHeight } })
//       .then((stream) => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//         console.log(video.srcObject.getTracks());
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
//         canvasRef &&
//           canvasRef.current &&
//           faceapi.draw.drawFaceExpressions(
//             canvasRef.current,
//             resizedDetections
//           );
//       }
//     }, 100);
//   };

//   const closeWebcam = () => {
//     videoRef.current.pause();
//     videoRef.current.srcObject.getTracks()[0].stop();
//     setCaptureVideo(false);
//   };

//   return (
//     <div>
//       <div style={{ textAlign: "center", padding: "10px" }}>
//         {captureVideo && modelsLoaded ? (
//           <button
//             onClick={closeWebcam}
//             style={{
//               cursor: "pointer",
//               backgroundColor: "green",
//               color: "white",
//               padding: "15px",
//               fontSize: "25px",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             Close Webcam
//           </button>
//         ) : (
//           <button
//             onClick={startVideo}
//             style={{
//               cursor: "pointer",
//               backgroundColor: "green",
//               color: "white",
//               padding: "15px",
//               fontSize: "25px",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             Open Webcam
//           </button>
//         )}
//       </div>
//       {captureVideo ? (
//         modelsLoaded ? (
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 padding: "10px",
//                 maxHeight: "70vh",
//                 maxWidth: "100vw",
//               }}
//             >
//               <video
//                 ref={videoRef}
//                 height={videoHeight}
//                 width={videoWidth}
//                 onPlay={handleVideoOnPlay}
//                 style={{
//                   borderRadius: "10px",
//                   maxHeight: "70vh",
//                   maxWidth: "100vw",
//                 }}
//               />
//               <canvas
//                 ref={canvasRef}
//                 style={{
//                   position: "absolute",
//                   maxHeight: "70vh",
//                   maxWidth: "100vw",
//                 }}
//               />
//             </div>
//           </div>
//         ) : (
//           <div>loading...</div>
//         )
//       ) : (
//         <></>
//       )}
//       <button
//         style={{
//           cursor: "pointer",
//           backgroundColor: "green",
//           color: "white",
//           padding: "15px",
//           fontSize: "25px",
//           border: "none",
//           borderRadius: "10px",
//         }}
//         onClick={() => {
//           canvasRef.current
//             .getContext("2d")
//             .drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
//           let image_data_url = canvasRef.current.toDataURL("image/png");
//           closeWebcam();
//           canvasRef.current.innerHTML = image_data_url;

//           // data url of the image
//           console.log(image_data_url);
//         }}
//       >
//         Capture
//       </button>
//     </div>
//   );
// }
