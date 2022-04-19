import { ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import React from "react";
import Appbar from "./components/Appbar";
import Body from "./components/Body";
import { customTheme } from "./theme";
import { CssBaseline } from "@mui/material";

function Aequm() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <Stack direction="column" spacing={{ sm: 2 }}>
          <Appbar />
          <Body />
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default Aequm;
