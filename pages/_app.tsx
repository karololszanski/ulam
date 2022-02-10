import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import theme from "../app/styles/default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { particlesOptions } from "styles/particles";
import { Provider } from "react-redux";
import { store } from "store/store";

export default function ExtendedApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Particles id="tsparticles" options={particlesOptions} />
        <ToastContainer />
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
