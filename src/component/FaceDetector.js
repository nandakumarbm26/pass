import { useSelector, useDispatch } from "react-redux";
import { faceStats, cameraReq } from "../redux/country/action";
import ReactDOM from "react-dom";
import * as faceapi from "face-api.js";
import React, { useEffect, useRef } from "react";
import { Alert } from "@mui/material";

function App() {
  const open = useRef();
  const close = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store);
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [smile, setSmile] = React.useState(false);
  const [bent, setBent] = React.useState(false);
  const videoRef = React.useRef();
  const videoHeight = state.countryParams.height;
  const videoWidth = state.countryParams.width;
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
      .getUserMedia({ video: { width: videoWidth, height: videoHeight } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const constraints = {
    xstart:
      state.countryParams.width * ((1 - state.countryParams.faceWidth) / 2),
    xend:
      state.countryParams.width -
      state.countryParams.width * ((1 - state.countryParams.faceWidth) / 2),
    ystart:
      state.countryParams.height * ((1 - state.countryParams.faceHeight) / 2),
    yend:
      state.countryParams.height -
      state.countryParams.height * ((1 - state.countryParams.faceHeight) / 2),
    x: state.countryParams.width,
    y: state.countryParams.height,
  };
  // useEffect(() => {
  //   alert("face expression should be neutral");
  // }, [smile]);
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
          if (
            resizedDetections[0].landmarks._positions[0].x >
              constraints.xstart &&
            resizedDetections[0].landmarks._positions[16].x <
              constraints.xend &&
            resizedDetections[0].landmarks._positions[8].y <=
              constraints.yend &&
            resizedDetections[0].landmarks._positions[8].y >
              constraints.yend - 50.0 &&
            resizedDetections[0].landmarks._positions[19].y > constraints.ystart
          ) {
            dispatch(faceStats(true));
          } else {
            dispatch(faceStats(false));
          }
        } catch (e) {}
        try {
          resizedDetections[0].expressions.neutral < 0.7
            ? setSmile(true)
            : setSmile(false);
        } catch (e) {
          dispatch(faceStats(false));
        }
        // console.log(
        //   resizedDetections[0].landmarks._positions[16].x -
        //     resizedDetections[0].landmarks._positions[0].x
        // );
        try {
          var slope =
            (resizedDetections[0].landmarks._positions[27].y -
              resizedDetections[0].landmarks._positions[8].y) /
            (resizedDetections[0].landmarks._positions[27].x -
              resizedDetections[0].landmarks._positions[8].x);
          if (slope < -65 || slope > 65) {
            setBent(false);
          } else {
            setBent(true);
          }
        } catch (e) {}
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <div style={{ position: "absolute", top: "0" }}>
      {smile && (
        <Alert id="alert" severity="warning">
          expression should be neutral. do not smile
        </Alert>
      )}
      {bent && (
        <Alert id="alert" severity="warning">
          face should be straight
        </Alert>
      )}
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
                  style={{
                    borderRadius: "10px",
                    minHeight: "70vh",
                    width: "100%",
                  }}
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
    </div>
  );
}

export default App;
