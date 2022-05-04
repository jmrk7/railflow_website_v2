import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../src/createEmotionCache";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" style={{ boxSizing: "content-box" }}>
        <Head>
          {/* PWA primary color */}
          <link rel="shortcut icon" href={"/favicon.ico"} />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
          <script
            key="salespanel"
            dangerouslySetInnerHTML={{
              __html: `
      (function(e, f, g, h, i){
        $salespanel = window.$salespanel || (window.$salespanel = []);
        __sp = i;
        var a=f.createElement(g);
        a.type="text/javascript";
        a.async=1;
        a.src=("https:" == f.location.protocol ? "https://" : "http://") + h;
        var b = f.getElementsByTagName(g)[0];
        b.parentNode.insertBefore(a,b);
    })(window, document, "script", "salespanel.io/src/js/0085b0e0-a475-4471-969b-e46f570ea356/sp.js", "0085b0e0-a475-4471-969b-e46f570ea356");  
      `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            key="chatlio"
            dangerouslySetInnerHTML={{
              __html: `
          window._chatlio = window._chatlio||[];
          !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
            n.setAttribute('data-widget-id','76e10e85-fcbd-4bb1-69d9-433d77176bc8');
            c.parentNode.insertBefore(n,c);
          }();`,
            }}
          />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
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
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
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
