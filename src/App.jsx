import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./aequm/theme";
import { CssBaseline } from "@mui/material";
import Homepage from "./container/homepage/index2";
import Passport from "./aequm/Aequm";
import App from "./container/passport/Page";
import "./index.css";
export default function index() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        {/* <Router forceRefresh>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/passport">
              <Passport />
            </Route>
          </Switch>
        </Router> */}
        <App />
      </ThemeProvider>
    </Fragment>
  );
}
