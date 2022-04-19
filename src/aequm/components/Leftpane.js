import { Box, Button, Stack, Grid, Card, Typography } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { PrimaryButton } from "./Buttons";
import { customTheme } from "../theme";
import { getCountryParams } from "../../redux/country/action";

// const BlackButton = (props) =>
//   styled(<Button {...props} />)(({ theme }) => ({
//     color: theme.palette.secondary.light,
//     width: "100%",
//     height: "40px",
//     backgroundColor: theme.palette.black.main,
//     "&:hover": {
//       backgroundColor: theme.palette.black.light,
//     },
//     margin: 1,
//   }));

const useStyles = makeStyles((theme) => ({
  box1: {
    width: "auto",
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    height: "95%",
    width: "95%",
    backgroundColor: theme.palette.secondary.light,
    margin: "auto",
    borderRadius: 10,
    overflow: "scroll",
    overflowX: "hidden",
  },
  country: {
    height: "300px",
    backgroundColor: theme.palette.secondary.light,
  },
  card: {
    height: "10vh",
    padding: "1vh",
    backgroundColor: theme.palette.primary.light,
    margin: 8,
  },
  im: {
    float: "left",
    maxInlineSize: "100%",
    objectFit: "cover",
    width: "35%",
    height: "90%",
  },
}));

function Leftpane(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store);
  console.log(state);
  return (
    <ThemeProvider theme={customTheme}>
      <Box>
        <Stack direction="column" spacing={1}>
          <Box className={classes.box1} sx={{ height: props.height }}>
            <Box className={classes.box2}>
              <Stack>
                <Card className={classes.card}>
                  <div style={{ height: "100%" }}>
                    <img src="../images/us.png" className={classes.im} />
                    <Typography variant="h4" color="white">
                      USA
                    </Typography>
                  </div>
                </Card>
                <Card className={classes.card}>
                  <div style={{ height: "100%" }}>
                    <img src="../images/uk.png" className={classes.im} />
                    <Typography variant="h4" color="white">
                      UK
                    </Typography>
                  </div>
                </Card>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Leftpane;
