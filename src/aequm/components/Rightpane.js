import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const useStyles = makeStyles((theme) => ({
  box1: {
    height: "70vh",
    width: "auto",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
  },
  box2: {
    height: "96%",
    width: "96%",
    backgroundColor: theme.palette.secondary.light,
    margin: "auto",
    marginTop: "10px",
    borderRadius: 10,
  },
  productImage: {
    width: "50%",
    marginTop: "10px",
    marginBottom: "10px",
  },
  button1: {
    width: "70%",
    margin: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    borderRadius: 10,
  },
  button2: {
    width: "70%",
    margin: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    borderRadius: 10,
    backgroundColor: theme.palette.black,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 6,
    margin: 5,
    backgroundColor: theme.palette.secondary.main,
    height: "150px",
    width: "100%",
  },
  icon: {
    height: 25,
    width: 25,
  },
}));

function Rightpane() {
  const state = useSelector((state) => state.store);
  const classes = useStyles();
  console.log(state);
  return (
    <Box sx={{ alignContent: "center" }}>
      <Stack component="div" direction="column" spacing={1}>
        <Box component="div" className={classes.box1}>
          <Box component="div" className={classes.box2}>
            <Stack component="div" direction="column">
              <Button variant="contained" disableElevation>
                Converted photo
              </Button>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  className={classes.productImage}
                  alt="product"
                  src="../images/facerecog.svg"
                />
                <Box className={classes.card}>
                  <Typography
                    fontWeight="bold"
                    textAlign="center"
                    variant="caption"
                  >
                    PHOTO
                  </Typography>
                  <Typography fontWeight="bold" textAlign="center" variant="h6">
                    {state.country}
                  </Typography>
                </Box>
              </Box>
              <Button
                className={classes.button1}
                variant="contained"
                endIcon={<ArrowCircleDownIcon />}
                disableElevation
                href={"data:image/png;base64," + state.photo}
                target="_blank"
                download
              >
                Download
              </Button>
            </Stack>
          </Box>
        </Box>
        <Grid container>
          <Grid item sm={6}>
            {/* <Button
              className={classes.button2}
              variant="contained"
              disableElevation
            >
              Share
            </Button> */}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default Rightpane;
