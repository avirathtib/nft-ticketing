import "../styles/globals.css";
import React, { useState, createContext } from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export const WalletContext = createContext();
export const ContractContext = createContext();

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  const [wallet, setWallet] = useState("");
  const [nftContract, setNftContract] = useState("");
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      <ContractContext.Provider value={{ nftContract, setNftContract }}>
        <ThirdwebProvider desiredChainId={activeChainId}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ContractContext.Provider>
    </WalletContext.Provider>
  );
}

export default MyApp;
