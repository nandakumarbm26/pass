import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import HdIcon from "@mui/icons-material/Hd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles((theme) => ({
  box1: {
    backgroundColor: theme.palette.secondary.light,
    width: "100%",
    minHeight: "100%",
    padding: "2vh",
  },
  instruction: {
    padding: "10px",
    minHeight: 20,
    width: "100%",
  },
}));

function InstructionPage() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const state = useSelector((state) => state.store);
  return <Box>{page == 0 && <PassportRequirements />}</Box>;
}

function PassportRequirements() {
  return (
    <Box>
      <h4>US passport photo - Size & Requirements</h4>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: 5 }}>
        <Grid container columnSpacing={10} rowSpacing={10}>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <AspectRatioIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">Size</Box>
                <Box>Width : 2in </Box>
                <Box>Height : 2in </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <HdIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">Resolution</Box>
                <Box>300dpi </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <AccountCircleIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">Image definition parameters</Box>
                <Box>
                  Head height: 1.29 in Bottom of the Photo to the Eye Line: 1.18
                  in
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <AccountCircleIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">
                  Is it suitable for online submission?
                </Box>
                <Box>Yes</Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <AccountCircleIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">Is it printable? </Box>
                <Box>Yes</Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className="Label">
              <AccountCircleIcon fontSize="large" className="icon" />
              <Box>
                <Box className="LabelTag">Background Color</Box>
                <Box
                  sx={{
                    height: "30px",
                    width: "50px",
                    backgroundColor: "white",
                    border: "2px solid black",
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <img src="images/reqImage.png" />
      </Stack>
    </Box>
  );
}
export default InstructionPage;
