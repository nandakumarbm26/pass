import React, { useState, useRef, useEffect } from "react";
import Centerpane from "../../aequm/components/Centerpane";
import InstructionPage from "./InstructionPage";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Alert,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setRequiremnets,
  getCountryParams,
  setProcessedPhoto,
  setPhoto,
  setPage,
  setMode,
} from "./../../redux/country/action";
import axios from "axios";
import { UploadFileRounded } from "@mui/icons-material";

function Page() {
  // const [page, setPage] = useState(0);
  const webRef = useRef();
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [terms, setTerms] = useState(false);
  const termsAccepted = (data) => {
    if (data == true) {
    }
  };
  return (
    <div>
      <Box sx={{ minHeight: "90vh", width: "100vw" }}>
        {state.page === 0 && <Page1 termsAccepted={termsAccepted} />}
        {state.page === 1 && <Page2 />}
        {state.page === 2 && state.mode === "Camera" && (
          <Centerpane webRef={webRef} />
        )}
        {state.page === 2 && state.mode === "Upload" && <Upload />}
        {state.page === 3 && <Page4 />}
      </Box>
      {/* <label >Accept state.Terms of Use.</label> */}
      {/* <input type="checkbox" value={true} /> */}
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
        {state.page != 0 && (
          <Button
            size="large"
            variant="contained"
            disabled={state.page === 0}
            sx={{ width: "10vw" }}
            onClick={() => state.page > 0 && dispatch(setPage(state.page - 1))}
          >
            Previous
          </Button>
        )}
        <Button
          size="large"
          variant="contained"
          sx={{ width: "10vw" }}
          disabled={
            state.page === 3 ||
            (state.page === 1 && state.mode === "") ||
            (state.page === 2 && state.photo === "")
          }
          onClick={() => state.page <= 3 && dispatch(setPage(state.page + 1))}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}
function Upload() {
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const b64 = (image) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      dispatch(setPhoto(reader.result.split(",")[1]));
    };
  };
  return (
    <Box>
      <Button
        variant="contained"
        color="black"
        component="label"
        fullWidth
        startIcon={<UploadFileRounded />}
        sx={{
          color: "white",
          width: "50%",
          left: "25vw",
          top: "47vh",
          position: "absolute",
        }}
      >
        Add photo
        <input
          onChange={(e) => {
            b64(e.currentTarget.files[0]);
          }}
          type="file"
          hidden
        />
      </Button>
    </Box>
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
  const modeRef = useRef();
  const countryUpdate = () => {
    dispatch(getCountryParams(countryRef.current.value));
  };

  const updateRequirments = () => {
    dispatch(setRequiremnets(requirementRef.current.value));
    console.log(requirementRef.current.value);
  };
  const updateMode = () => {
    dispatch(setMode(modeRef.current.value));
    dispatch(setPhoto(""));
    console.log(modeRef.current.value);
  };
  const data = [1, 2, 3, 4, 5, 6];
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
              {/* <option value="UK">United Kingdom</option> */}
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
        <Grid item sm={4} xs={12}>
          <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
            Mode
          </h5>
          <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
            <select ref={modeRef} id="Mode" name="Mode" onChange={updateMode}>
              <option value="Upload">Upload</option>
              <option value="Camera">Camera</option>
            </select>
          </h4>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          height: "65vh",
          justifyContent: "center",
          overflow: { xs: "scroll", sm: "hidden" },
        }}
      >
        {data.map((d, index) => {
          return (
            <Grid item sm={4}>
              <img src={`images/instruction${d}.png`} height={250} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function Page4() {
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [shadow, setShadow] = useState(false);
  const [loading, setLoading] = useState("false");
  const [image, setImage] = useState("");
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const process = () => {
    setLoading(true);
    // https://gapi.aequmindia.in/api/passport
    if (state.photo !== "")
      axios
        .post("https://gapi.aequmindia.in/api/passport", {
          face: state.photo,
          country: state.country,
        })
        .then((res) => {
          try {
            dispatch(
              setProcessedPhoto({
                hd: res.data["image"].split("'")[1],
                sd: res.data["imageSd"].split("'")[1],
              })
            );
            if (res.data["spectacles"]) {
              alert("Please remove specs and retake photo.");
              // dispatch(setProcessedPhoto(res.data["image"].split("'")[1]));
              dispatch(setPhoto(""));
              dispatch(setPage(2));
            }
            if (res.data["shadow"]) {
              setShadow(true);
            }
            if (res.data["mouthopen"]) {
              alert("Mouth is open retake photo.");
              dispatch(setPhoto(""));
              dispatch(setPage(2));
            }

            setLoading(false);
          } catch {}
          try {
            if (res.data["error"]) {
              alert(res.data["err"]);
              dispatch(setPhoto(""));
              dispatch(setPage(2));
            }
          } catch {}
          console.log(res);
        })
        .then(async () => {
          toDataURL("https://gapi.aequmindia.in/api/download").then((data) =>
            setImage(data)
          );
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
          {shadow && (
            <Alert sx={{ margin: "auto" }} severity="warning">
              Please check lighting condition.
            </Alert>
          )}
          <img
            src={"data:image/jpeg;base64," + state.processedPhotoHD}
            height={400}
            width={400}
          />
          <Stack direction="row">
            <Box>
              <a
                href={"data:image/jpeg;base64," + state.processedPhotoHD}
                download="myimage.jpeg"
                style={{ display: "none" }}
                id="download"
              >
                Download HD
              </a>
              <Button
                variant="contained"
                onClick={() => document.getElementById("download").click()}
              >
                Download HD
              </Button>
            </Box>
            <Box>
              <a
                href={`${image}`}
                download="myimage.jpg"
                style={{ display: "none" }}
                id="downloadSD"
              >
                Download print photo
              </a>
              <Button
                variant="contained"
                onClick={() => document.getElementById("downloadSD").click()}
              >
                Download print photo
              </Button>
            </Box>
          </Stack>
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
    <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
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
