import React, { useState, useRef, useEffect } from "react";
import Centerpane from "../../aequm/components/Centerpane";
import InstructionPage from "./InstructionPage";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setRequiremnets,
  getCountryParams,
  setProcessedPhoto,
} from "./../../redux/country/action";
import axios from "axios";

function Page() {
  const [page, setPage] = useState(0);
  const webRef = useRef();
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ minHeight: "90vh", width: "100vw" }}>
        {page === 0 && <Page1 />}
        {page === 1 && <Page2 />}
        {page === 2 && <Centerpane webRef={webRef} />}
        {page === 3 && <Page4 />}
      </Box>
      <Box
        sx={{
          minHeight: "5vh",
          width: "70vw",
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Button
          size="large"
          variant="contained"
          disabled={page === 0}
          sx={{ width: "10vw" }}
          onClick={() => page > 0 && setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ width: "10vw" }}
          disabled={page === 3 || (page === 2 && state.photo === "")}
          onClick={() => page <= 3 && setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}

function Page1() {
  return (
    <div style={{ width: "75vw", margin: "auto" }}>
      <InstructionPage />
    </div>
  );
}
function Page2() {
  const dispatch = useDispatch();
  const countryRef = useRef();
  const requirementRef = useRef();
  const countryUpdate = () => {
    dispatch(getCountryParams(countryRef.current.value));
  };

  const updateRequirments = () => {
    dispatch(setRequiremnets(requirementRef.current.value));
    console.log(requirementRef.current.value);
  };
  return (
    <div style={{ width: "75vw", margin: "auto" }}>
      <Grid
        container
        rowGap={2}
        className="wrapper__box-price wrap__flex-sm-50 text-center text-md-left d-flex justify-content-between align-items-center"
      >
        <Grid item sm={4} xs={12}>
          <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
            Country
          </h5>
          <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
            <select
              id="Country"
              name="Country"
              ref={countryRef}
              onChange={countryUpdate}
            >
              <option value="US">United States of America</option>
              <option value="UK">United Kingdom</option>
            </select>
          </h4>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
            Requirement
          </h5>
          <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
            <select
              ref={requirementRef}
              id="Country"
              name="Country"
              onChange={updateRequirments}
            >
              <option value="passport">Passport</option>
              <option value="visa">Visa</option>
              <option value="passport + visa">Passport + Visa</option>
            </select>
          </h4>
        </Grid>
      </Grid>
    </div>
  );
}

function Page4() {
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("false");
  const process = () => {
    console.log("photo" + state.photo);
    setLoading(true);
    if (state.photo !== "")
      axios
        .post("https://gapi.aequmindia.in/api/passport", {
          face: state.photo,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setProcessedPhoto(res.data["image"].split("'")[1]));
          if (res.data["status"]) {
            alert("Please remove specs and retake photo.");
            dispatch(setProcessedPhoto(res.data["image"].split("'")[1]));
          }
          setLoading(false);
        });
  };
  useEffect(process, []);
  return (
    <div>
      {loading && <LoadingProgress />}
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            width: "70vw",
            margin: "auto",
          }}
        >
          <img src={"data:image/png;base64," + state.processedPhoto} />
          <a
            href={"data:image/jpeg;base64," + state.processedPhoto}
            download="myimage.jpg"
            style={{ display: "none" }}
            id="download"
          >
            Download
          </a>
          <Button
            variant="contained"
            onClick={() => document.getElementById("download").click()}
          >
            Download
          </Button>
        </Box>
      )}
    </div>
  );
}

function LoadingProgress() {
  const caption = [
    "checking aspect ratio...",
    "checking face placemennt...",
    "checking face visibility",
    "checking eyewear...",
    "enhancing image...",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {caption.map((text) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CircularProgress />
          <h5>{text}</h5>
        </div>
      ))}
    </div>
  );
}

export default Page;
