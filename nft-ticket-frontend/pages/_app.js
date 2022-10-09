import "../styles/globals.css";
import React, { useState, createContext } from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export const WalletContext = createContext();

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  const [wallet, setWallet] = useState();
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </WalletContext.Provider>
  );
}

export default MyApp;
