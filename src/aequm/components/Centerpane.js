import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Grid, Alert } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CameraAltOutlined } from "@mui/icons-material";
import Capture from "./Capture";
import axios from "axios";

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
function Centerpane({ height, webRef }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store);
  const classes = useStyles();
  const reCapture = () => {
    dispatch(setPhoto(""));
    dispatch(cameraReq(true));
  };
  const capture = () => {
    // setFace(webRef.current.getScreenshot().split(",")[1]);
    dispatch(setPhoto(webRef.current.getScreenshot().split(",")[1]));
    dispatch(cameraReq(false));
  };
  const process = () => {
    axios
      .post("https://gapi.aequmindia.in/api/passport", {
        face: state.photo,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setPhoto(res.data["image"].split("'")[1]));
        if (res.data["status"]) {
          alert("Please remove specs and retake photo.");
          dispatch(setPhoto(""));
        }
      });
  };
  return (
    <>
      <Box className={classes.border} sx={{ width: "100%" }}>
        {state.photo == "" ? (
          <Capture webRef={webRef} />
        ) : (
          <img src={"data:image/jpeg;base64," + state.photo} />
        )}
      </Box>
      <Grid
        container
        columnSpacing={2}
        sx={{
          display: { xs: "flex" },
          justifyContent: "space-around",
          marginTop: "1vh",
        }}
      >
        <Grid item sm={6}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            startIcon={<CameraAltOutlined />}
            disabled={!state.faceStats}
            onClick={() => {
              state.photo == "" ? capture() : reCapture();
            }}
          >
            {state.photo == "" ? "Capture" : "Try again"}
          </Button>
        </Grid>
        <Grid item sm={6}>
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
        </Grid>
      </Grid>
      {!state.faceStats && (
        <Alert severity="warning">Place your face within the grid</Alert>
      )}
      {/* {state.smile && <Alert severity="warning">Do not Smile</Alert>} */}
    </>
  );
}

export default Centerpane;
