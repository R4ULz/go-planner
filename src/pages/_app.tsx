import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '../contexts/UserContext'; 
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
       <Script
          src="https://cdn.userway.org/widget.js"
          data-userway="true"
          async
        ></Script>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;