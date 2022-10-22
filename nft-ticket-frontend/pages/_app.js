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
        <ThirdwebProvider
          chainRpc={{
            [ChainId.Goerli]:
              "https://goerli.infura.io/v3/0727e64a7aa44b46a36ba9c62119f6c3",
          }}
          desiredChainId={activeChainId}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ContractContext.Provider>
    </WalletContext.Provider>
  );
}

export default MyApp;
