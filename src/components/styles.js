import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    position: "relative",
    "&::after": {
      content: '""',
      height: "91px",
      display: "block",
      [theme.breakpoints.down("md")]: {
        height: "180px",
      },
    },
  },
  toolbar: {
    height: "144px",
    [theme.breakpoints.down("800")]: {
      height: "80px",
    },
  },
  content: {
    flexGrow: 1,
    width: "100%",
  },
}));
