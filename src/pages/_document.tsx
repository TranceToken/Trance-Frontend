import { Html, Head, Main, NextScript } from "next/document";
import { clsx } from "clsx";

export default function Document() {
  return (
    <Html>
      <Head>

</Head>
      <body
        className={clsx("bg-base-100", {
          "bg-[url(/images/bg.svg)] bg-[no-repeat] bg-[center] bg-[fixed]":
            true,
        })}
      >

        <div id="globalLoader">

  <figure>
  <img src="https://i.pinimg.com/originals/75/10/f6/7510f688ca667f1b933beefe02139328.gif" alt="" />
 <figcaption> Trance Loading...</figcaption>
  </figure>

</div>

        <Main />

        <NextScript />

      </body>
    </Html>
  );
}
