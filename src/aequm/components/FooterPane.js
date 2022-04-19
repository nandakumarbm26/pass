import React from "react";
import { Box, Button, IconButton } from "@mui/material";
function FooterPane() {
  return (
    <div>
      <div className="capture">
        <IconButton>
          <img src="images/capture.svg" class="centercapture" />
        </IconButton>
      </div>
      <Box>
        <Button
          sx={{ backgroundColor: "#bf7b2e", color: "#fff", borderRadius: 6 }}
        >
          face scan
        </Button>
      </Box>
    </div>
  );
}

export default FooterPane;
