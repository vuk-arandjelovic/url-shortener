import * as React from "react";
// next
import Document, { Html, Head, Main, NextScript } from "next/document";
// @emotion
import createEmotionServer from "@emotion/server/create-instance";
// utils
import createEmotionCache from "../utils/createEmotionCache";
// theme
import palette from "../theme/palette";
import { primaryFont } from "../theme/typography";

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={primaryFont.className}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />

          {/* PWA primary color */}
          <meta name="theme-color" content={palette("light").primary.main} />

          {/* Favicon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#222c51"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#222c51" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#03d1ff" />

          {/* Emotion */}
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}

          {/* Meta */}
          <meta name="description" content="Portal to your projects" />
          <meta
            name="keywords"
            content="react,material,kit,application,dashboard,admin,template"
          />
          <meta name="author" content="Digital Bridges" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
