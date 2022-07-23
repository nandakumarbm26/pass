import React from "react";
import { Alert } from "@mui/material";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setTimeout(4000);
    return () => {
      var elm = document.getElementById("alert");
      elm.remove();
    };
  }, []);
  return;
}

export default Alert;
