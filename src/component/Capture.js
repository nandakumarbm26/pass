import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Webcam from "react-webcam";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import App from "./FaceDetector";
import { cameraFace, captureVideo } from "../redux/country/action";
const useStyles = makeStyles((theme) => ({
  camerasm: {
    height: "70vh",
    width: "100%",
  },
  cameraxs: {
    height: "50vh",
    width: "100%",
  },
}));

function Capture({ webRef }) {
  const dispatch = useDispatch();
  // const [facingMode, setFacingMode] = useState("user");
  const state = useSelector((state) => state.store);
  const classes = useStyles();
  const videoConstraints = {
    width: { min: 500, ideal: state.countryParams.width },
    height: { min: 500, ideal: state.countryParams.height },
    facingMode: { exact: `${state.cameraFace}` },
  };
  const margin = `0% ${((1 - state.countryParams.faceWidth) / 2) * 100}%`;
  useEffect(() => {}, [state.cameraFace]);
  return (
    <Box sx={{ position: "relative" }}>
      <Webcam
        ref={webRef}
        imageSmoothing={true}
        mirrored={true}
        videoConstraints={videoConstraints}
        className={
          window.innerWidth < 514 ? classes.cameraxs : classes.camerasm
        }
        screenshotFormat="image/png"
      />
      <App />

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          margin: margin,
          minHeight: `${state.countryParams.faceHeight * 100}%`,
          boxSizing: "border-box",
          width: `${state.countryParams.faceWidth * 100}%`,
          border: "10px solid black",
          borderTopLeftRadius: "600px",
          borderTopRightRadius: "600px",
          display: { xs: "none", sm: "block" },
        }}
      ></Box>
      <Box
        sx={{
          borderLeft: { xs: "1px solid black", sm: "5px solid black" },
          minHeight: "100%",
          position: "absolute",
          top: "0%",
          left: "50%",
        }}
      ></Box>
    </Box>
  );
}

export default Capture;
