import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <>
      <Head>
        <title>Clone-book</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
      </>
  );
}

export default MyApp;
