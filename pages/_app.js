import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import createEmotionCache from "../src/createEmotionCache";
import CookieConsent from "react-cookie-consent";

import "../styles/app.css";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>TestRail Integration Platform and Tools - Railflow</title>
      </Head>

      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        cookieName="privacy-accepted"
        style={{
          background: "#20222b",
          maxWidth: 700,
          fontFamily: "Space Grotesk",
          display: "flex",
          alignItems: "center",
          padding: 20,
          lineHeight: 1.8,
          margin: 8,
          justifyContent: "end"
        }}
        buttonStyle={{
          color: "white",
          background: "#303fe1",
          fontSize: 16,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 4,
          fontWeight: "bold",
        }}
        expires={150}
      >
        We use cookies to give you the best experience possible. By continuing
        browsing our website, you agree with our{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://railflow.io/privacy"
          style={{ color: "white" }}
        >
          Privacy Policy
        </a>
        .
      </CookieConsent>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
