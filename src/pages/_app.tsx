import "~/styles/main.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import {  useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { client } from "~/lib/client";
import Layout from "~/components/Layout";
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.remove();
    }
  }, []);
  return (
    
    <ThemeProvider>
      <Analytics />
      <WagmiConfig client={client}>
        <ConnectKitProvider
          options={{
            disclaimer: (
              <>
                By connecting your wallet you agree to the
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Terms_of_service"
                >
                  Terms of Service
                </a>
                and
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Privacy_policy"
                >
                  Privacy Policy
                </a>
              </>
            ),
          }}
        >
          <Layout>
            <GoogleAnalytics trackPageViews gaMeasurementId="G-DBTH5Q7V8S" />
            <Component {...pageProps} />
          </Layout>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
