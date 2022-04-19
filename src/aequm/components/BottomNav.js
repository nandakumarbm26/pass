import React, { useRef, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CameraAltRounded,
  PersonPinCircleSharp,
  ShareRounded,
  UploadRounded,
} from "@mui/icons-material";
import URI from "./Centerpane";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "../../redux/country/action";
const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.main,
  },
}));
function BottomNav({ webRef: webRef }) {
  const [face, setFace] = useState("");
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const capture = () => {
    setFace(webRef.current.getScreenshot().split(",")[1]);
    setReset(true);
    dispatch(setPhoto(webRef.current.getScreenshot().split(",")[1]));
  };

  const state = useSelector((state) => state.store);
  const classes = useStyles();
  return (
    <BottomNavigation showLabels className={classes.nav}>
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Process"
        icon={<PersonPinCircleSharp />}
        onClick={() => {
          axios
            .post("https://gapi.aequmindia.in/api/passport", { face: face })
            .then((res) => {
              console.log(res.data);
              dispatch(setPhoto(res.data));
              setFace(res.data);
            });
        }}
      />
      <BottomNavigationAction
        label={state.face == "" ? "Capture" : "Take Photo"}
        icon={<CameraAltRounded />}
        sx={{ color: "white" }}
        onClick={() => {
          state.photo == "" ? capture() : dispatch(setPhoto(""));
        }}
      />
      <BottomNavigationAction
        href={"data:image/png;base64," + state.preview}
        target="_blank"
        download
        label="Share"
        sx={{ color: "white" }}
        icon={<ShareRounded />}
      />
      {/* <IconButton
        onClick={() => {
          state.face === "" ? captureFace() : dispatch(resetFace());
        }}
      >
        <CameraAltRounded fontSize="large" htmlColor="white" />
      </IconButton> */}
      <input onInput={(e) => {}} value="" type="file" hidden ref={inputRef} />
    </BottomNavigation>
  );
}

export default BottomNav;
