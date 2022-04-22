import React from "react";
import { Box } from "@mui/material";
import Webcam from "react-webcam";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import store from "../../redux/country/reducer";
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
  console.log(state);
  const classes = useStyles();
  const videoConstraints = {
    width: state.countryParams.width,
    height: state.countryParams.height,
  };
  return (
    <Box>
      <Webcam
        ref={webRef}
        imageSmoothing={true}
        mirrored={true}
        videoConstraints={videoConstraints}
        className={
          window.innerWidth < 514 ? classes.cameraxs : classes.camerasma
        }
        screenshotFormat="image/jpeg"
      />
    </Box>
  );
}

export default Capture;
