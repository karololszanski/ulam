import { createTheme } from "@mui/material/styles";
import { teal, red, grey } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: grey,
    secondary: teal,
    error: {
      main: red.A400,
    },
    background: {
      default: "#1D1F21", //#1D1F21 #28292B
    },
  },
  typography: {
    fontFamily: ["open-sans", "sans-serif"].join(","),
  },
});

export default theme;
