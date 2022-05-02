import * as React from "react";
import {
  Stack,
  Box,
  Stepper,
  Step,
  Grid,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import "aos/dist/aos.css";

import { makeStyles } from "@mui/styles";
import { StepContent } from "@mui/material";
import Centerpane from "../../aequm/components/Centerpane";
import { useRef, useEffect, useState } from "react";
import InstructionPage from "./InstructionPage";
import { useSelector, useDispatch } from "react-redux";
import { setRequiremnets, getCountryParams } from "../../redux/country/action";
import BlinkDetect from "../../component/BlinkDetect";

const steps = ["Take Photo", "Check", "Payment"];
const useStyles = makeStyles((theme) => ({
  left: {
    backgroundColor: theme.palette.secondary.light,
  },
  border: {
    width: "100%",
    minHeight: "80%",
    borderRadius: 10,
    borderStyle: "solid",
    padding: 5,
    borderWidth: 6,
    borderColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state.store);
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const webRef = useRef();
  const [orientation, setOrientation] = useState("");
  const countryRef = useRef();
  const requirementRef = useRef();
  useEffect(() => {
    if (window.innerWidth < 767) {
      setOrientation("Horizontal");
    } else {
      setOrientation("vertical");
    }
    console.log(orientation);
  }, []);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleClick = () => {
    // Changing state
    setOpen(!open);
    console.log(state);
  };

  const countryUpdate = () => {
    dispatch(getCountryParams(countryRef.current.value));
  };

  const updateRequirments = () => {
    dispatch(setRequiremnets(requirementRef.current.value));
    console.log(requirementRef.current.value);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Stack flexDirection={{ sm: "row", xs: "column" }}>
      <Box
        className={classes.left}
        sx={{
          width: { sm: "40vw", xs: "100vw" },
          minHeight: { sm: "100vh" },
          padding: 5,
        }}
      >
        <Stepper activeStep={activeStep} orientation={orientation}>
          <Step key={"instructions"}>
            <StepLabel>Instructions</StepLabel>
            <StepContent>
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
            </StepContent>
          </Step>
          <Step key={"validate"}>
            <StepLabel>Take Photo</StepLabel>

            {/* <StepContent>
              <Box sx={{ height: "50vh" }}><Capture /></Box>
            </StepContent> */}
          </Step>
          <Step key={"purchase"}>
            <StepLabel>Download</StepLabel>
            {/* <StepContent>
              <Box sx={{ height: "50vh" }}></Box>
            </StepContent> */}
          </Step>
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              <Box sx={{ flex: "1 1 auto" }} />

              <Button
                disabled={
                  activeStep == 1 ? state.photo == "" && activeStep == 1 : false
                }
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <Box
        sx={{
          width: { sm: "60vw", xs: "100vw" },
          minHeight: { sm: "100vh", xs: "60vh" },
          padding: { sm: 5, xs: 1 },
        }}
        className={classes.left}
      >
        {activeStep === 0 && <InstructionPage />}
        {activeStep === 2 && (
          <>
            <Box className={classes.border} sx={{ width: "100%" }}>
              <img src={"data:image/jpeg;base64," + state.photo} />
            </Box>
            <a
              href={"data:image/jpeg;base64," + state.photo}
              download="myimage.jpg"
              style={{ display: "none" }}
              id="download"
            >
              Download
            </a>
            <Button
              variant="contained"
              sx={{ margin: "2vh" }}
              onClick={() => document.getElementById("download").click()}
            >
              Buy Now
            </Button>
          </>
        )}
        {activeStep === 1 && <Centerpane webRef={webRef} />}
        {/* {activeStep === 1 && <BlinkDetect />} */}
      </Box>
    </Stack>
  );
}
