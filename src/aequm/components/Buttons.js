import { styled } from "@mui/styles";
import { Button } from "@mui/material";

export const PrimaryButton = styled(Button)((theme) => ({
  color: theme.palette.secondary.light,
  width: "100%",
  height: "40px",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  margin: 1,
}));

export const BlackButton = styled(Button)((theme) => ({
  color: theme.palette.secondary.light,
  width: "100%",
  height: "40px",
  backgroundColor: theme.palette.black.main,
  "&:hover": {
    backgroundColor: theme.palette.black.light,
  },
  margin: 1,
}));
