import {
  AppBar,
  Typography,
  IconButton,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import {
  setFaceImage,
  setPreview,
  resetFace,
} from "../../redux/products/actions";
import { useDispatch } from "react-redux";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.light,
  },
}));
function Appbar() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const b64 = (image) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      dispatch(setFaceImage(reader.result.split(",")[1]));
      dispatch(setPreview(reader.result.split(",")[1]));
    };
  };
  return (
    <AppBar
      className={classes.header}
      position="static"
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #d4cdcd",
        boXShadow: " 0px 0px 16px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: { xs: "space-between" } }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton>
            <MenuOutlined fontSize="large" />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <Box sx={{ marginLeft: 2 }}>
            <Button className="homeborderstyle">
              <a href="index.html">
                <img alt="" src="images/homelogo.svg" height="30px" />
              </a>
            </Button>
          </Box>
          <Box>
            <Button
              className="facerecogstyle"
              onClick={() => {
                dispatch(resetFace());
              }}
            >
              <img alt="" src="images/facerecog.svg" height="30px" />
            </Button>
          </Box>
          <Box>
            <Button className="addimagestyle" component="label">
              <img alt="" src="images/imagerecog.svg" height="30px" />
              <input
                onChange={(e) => {
                  b64(e.currentTarget.files[0]);
                }}
                type="file"
                hidden
              />
            </Button>
          </Box>
        </Box>
        <Box>
          <Box>
            <a style={{ textDecoration: "none" }} href="#">
              <Typography variant={{ xs: "h3", sm: "h2" }} color="white">
                Passport Visa Print
              </Typography>
            </a>
          </Box>
        </Box>
        <Box sx={{ marginRight: 4 }}></Box>
      </Stack>
    </AppBar>
  );
}

export default Appbar;
