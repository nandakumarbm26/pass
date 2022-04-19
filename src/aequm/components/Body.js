import { Grid, Stack, Box, BottomNavigation, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Centerpane from "./Centerpane";
import Leftpane from "./Leftpane";
import Rightpane from "./Rightpane";
import BottomNav from "./BottomNav";
import { useSelector } from "react-redux";
function Body() {
  const webRef = useRef(null);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const state = useSelector((state) => state.store);
  return (
    <>
      {isDesktop ? (
        <Grid
          container
          columnSpacing={1}
          rowSpacing={1}
          sx={{
            padding: { xs: 1, sm: 2 },
            display: { sm: "flex", xs: "none" },
          }}
        >
          <Grid item sm={3}>
            <Leftpane height="70vh" />
          </Grid>
          <Grid item sm={6}>
            <Centerpane height="70vh" webRef={webRef} />
          </Grid>
          <Grid item sm={3}>
            <Rightpane />
          </Grid>
        </Grid>
      ) : (
        <Stack sx={{ display: { sm: "block" } }}>
          <Centerpane height="40vh" webRef={webRef} />
          <Box sx={{ height: "7vh", textAlign: "center" }}>
            <Typography variant="caption" fontWeight="bold">
              {state.activeProduct?.title}
            </Typography>
          </Box>
          <Leftpane height="40vh" />
          <BottomNav webRef={webRef} />
        </Stack>
      )}
    </>
  );
}

export default Body;
