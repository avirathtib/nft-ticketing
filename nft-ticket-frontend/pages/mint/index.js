import React, { useContext } from "react";
import { ContractContext } from "../_app";
import { WalletContext } from "../_app";
import { useContract } from "@thirdweb-dev/react";
function mint() {
  const { wallet, setWallet } = useContext(WalletContext);
  const { contract, setContract } = useContext(ContractContext);
  const { mintContract } = useContract(contract, "nft-drop");
  return (
    <div>
      {console.log(mintContract)}

      <p>hello {mintContract}</p>
    </div>
  );
}

export default mint;
