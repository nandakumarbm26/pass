import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Grid, Alert } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CameraAltOutlined } from "@mui/icons-material";
import Capture from "./Capture";
import App from "../../component/FaceDetector";

import { cameraReq, setPhoto } from "../../redux/country/action";

const useStyles = makeStyles((theme) => ({
  border: {
    width: "100%",
    minHeight: "80%",
    borderRadius: 10,
    borderStyle: "solid",
    padding: 5,
    borderWidth: 6,
    borderColor: theme.palette.black.main,
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    justifyContent: "center",
  },

  inside: {
    width: "100%",
    minHeight: "80%",
  },
  pb: {
    color: theme.palette.secondary.light,
    height: "40px",
    width: "40px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    margin: "auto",
    marginTop: 10,
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//http://127.0.0.1:5000/passport
//https://gapi.aequmindia.in/api/passport
export const URI = "https://gapi.aequmindia.in/api/passport";
function Centerpane({ height, webRef, status }) {
  const videoRef = React.useRef();
  const canvasRef = React.useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store);
  const classes = useStyles();
  const reCapture = () => {
    dispatch(setPhoto(""));
    dispatch(cameraReq(true));
  };
  const capture = () => {
    canvasRef.current
      .getContext("2d")
      .drawImage(
        videoRef.current,
        0,
        0,
        state.params.width,
        state.params.height
      );
    let image_data_url = canvasRef.current.toDataURL("image/png");
    dispatch(setPhoto(image_data_url.split(",")[1]));
    dispatch(cameraReq(false));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: "10px",
      }}
    >
      {" "}
      <Button
        variant="contained"
        sx={{ width: "20%", margin: "auto" }}
        startIcon={<CameraAltOutlined />}
        disabled={!state.faceStats}
        onClick={() => {
          state.photo == "" ? capture() : reCapture();
        }}
      >
        {state.photo == "" ? "Capture" : "Try again"}
      </Button>
      <Box className={classes.border} style={{ width: "75vw", margin: "auto" }}>
        {state.photo == "" ? (
          <App videoRef={videoRef} canvasRef={canvasRef} />
        ) : (
          <img src={"data:image/png;base64," + state.photo} />
        )}
      </Box>
      {/* <Grid
        container
        columnSpacing={2}
        sx={{
          display: { xs: "flex" },
          justifyContent: "space-around",
          marginTop: "1vh",
        }}
      > */}
      {/* <Grid item sm={6}> */}
      {/* </Grid> */}
      {/* <Grid item sm={6}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            startIcon={<CameraAltOutlined />}
            disabled={state.photo == ""}
            // http://127.0.0.1:5000/passport  localhost api uri
            //https://gapi.aequmindia.in/api/passport
            onClick={process}
          >
            Process
          </Button>
        </Grid> */}
      {/* </Grid> */}
      {!state.faceStats && (
        <Alert sx={{ margin: "auto" }} severity="warning">
          Place your face within the grid
        </Alert>
      )}
      {/* {state.smile && <Alert severity="warning">Do not Smile</Alert>} */}
    </Box>
  );
}

export default Centerpane;
