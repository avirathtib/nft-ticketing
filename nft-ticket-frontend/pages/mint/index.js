import React, { useContext } from "react";
import { ContractContext } from "../_app";
import { WalletContext } from "../_app";
import { useContract } from "@thirdweb-dev/react";
function mint() {
  const { wallet, setWallet } = useContext(WalletContext);
  const { nftContract, setNftContract } = useContext(ContractContext);
  const { contract } = useContract(nftContract, "nft-drop");
  return (
    <div>
      {console.log(nftContract)}
      {console.log(contract)}
      <p>hello</p>
    </div>
  );
}

export default mint;
