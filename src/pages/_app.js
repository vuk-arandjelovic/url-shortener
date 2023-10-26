import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
// next
import Head from "next/head";
// util
import createEmotionCache from "@utils/createEmotionCache";
// theme
import ThemeProvider from "../theme";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  emotionCache: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
