import "@/styles/globals.css";
import Navigator from "@/components/navigator";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="w-full h-full p-8">
        <Component {...pageProps} />
      </div>
      <Navigator />
    </>
  );
}
