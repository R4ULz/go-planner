import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '../contexts/UserContext'; 
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
       <Head>
       <script
          src="https://cdn.userway.org/widget.js"
          data-userway="true"
          async
        ></script>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;