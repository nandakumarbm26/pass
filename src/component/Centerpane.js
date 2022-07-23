import React from "react";
import { Box, Button, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CameraAltOutlined } from "@mui/icons-material";
import Capture from "./Capture";

import { cameraReq, setPhoto } from "../redux/country/action";

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
    console.log(webRef.current.getScreenshot());
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
      <Button
        variant="contained"
        sx={{
          width: { sm: "20%", xs: "40%" },
          margin: "auto",
          display: { xs: "none", sm: "block" },
        }}
        startIcon={<CameraAltOutlined />}
        disabled={!state.faceStats && !state.faceSmile}
        onClick={() => {
          state.photo == "" ? capture() : reCapture();
        }}
      >
        {state.photo == "" ? "Capture" : "Try again"}
      </Button>
      <Button
        variant="contained"
        sx={{
          width: { sm: "20%", xs: "40%" },
          margin: "auto",
          display: { xs: "block", sm: "none" },
        }}
        startIcon={<CameraAltOutlined />}
        onClick={() => {
          state.photo == "" ? capture() : reCapture();
        }}
      >
        {state.photo == "" ? "Capture" : "Try again"}
      </Button>
      <Box
        className={classes.border}
        sx={{ width: { sm: "75vw", xs: "95vw" }, margin: "auto" }}
      >
        {state.photo == "" ? (
          <Capture webRef={webRef} />
        ) : (
          <img src={"data:image/png;base64," + state.photo} />
        )}
      </Box>
      <Box sx={{ textAlign: "center", color: "red", backgroundColor: "#fdd" }}>
        place your face inside the grid and use reference line to keep your face
        straight
      </Box>

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
