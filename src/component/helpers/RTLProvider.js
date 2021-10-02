import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: indigo["800"],
    },
  },
});
const RTLProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default RTLProvider;
