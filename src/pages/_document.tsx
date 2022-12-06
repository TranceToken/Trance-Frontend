import { Html, Head, Main, NextScript } from "next/document";
import { clsx } from "clsx";

export default function Document() {
  return (
    <Html>
      <Head>
  <meta http-equiv="Cache-Control" content="max-age=31536000" />
  <link rel="prefetch" as="fetch" href="/merkle.ts" />
</Head>
      <body
        className={clsx("bg-base-100", {
          "bg-[url(/images/bg.svg)] bg-[no-repeat] bg-[center] bg-[fixed]":
            true,
        })}
      >
        <div id="globalLoader">
  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
</div>
        <Main />

        <NextScript />

      </body>
    </Html>
  );
}
