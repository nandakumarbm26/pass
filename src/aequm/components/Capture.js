import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Webcam from "react-webcam";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import * as faceapi from "face-api.js";
import App from "../../component/FaceDetector";
import { captureVideo } from "../../redux/country/action";
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
  const state = useSelector((state) => state.store);
  const classes = useStyles();
  const videoConstraints = {
    width: state.countryParams.width,
    height: state.countryParams.height,
  };

  return (
    <Box>
      <App />
      <Webcam
        ref={webRef}
        imageSmoothing={true}
        mirrored={true}
        videoConstraints={videoConstraints}
        className={
          window.innerWidth < 514 ? classes.cameraxs : classes.camerasm
        }
        screenshotFormat="image/jpeg"
      />
    </Box>
  );
}

export default Capture;
