import React, { Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./component/theme";
import { CssBaseline } from "@mui/material";
import App from "./passport/Page";
import "./index.css";
export default function index() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </Fragment>
  );
}
