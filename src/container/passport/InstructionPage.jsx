import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box1: {
    backgroundColor: theme.palette.secondary.light,
    width: "100%",
    minHeight: "inherit",
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

  return (
    <Box className={classes.box1}>
      <Typography variant="h4">Instructions</Typography>
      <Grid container>
        <Grid item className={classes.instruction} sm={12}>
          1. Stand in Well LIT Area for clear Photos.
        </Grid>
        <Grid item className={classes.instruction} sm={12}>
          2. Clean your camera berfore usage.
        </Grid>
        <Grid item className={classes.instruction} sm={12}>
          3. Make Sure your face is visible completly
        </Grid>
        <Grid item className={classes.instruction} sm={12}>
          4. Keep your background clear from objects.
        </Grid>
        <Grid item className={classes.instruction} sm={12}>
          5. For succesful attempt please follow photo instructions for visa and
          passport.
        </Grid>
      </Grid>
    </Box>
  );
}

export default InstructionPage;
