import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { WalletContext } from "./_app";
import Create from "./createEvent";

export default function Home() {
  const { wallet, setWallet } = useContext(WalletContext);
  const address = useAddress();
  useEffect(() => {
    setWallet(address);
  }, [address]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Premier NFT Ticketing Solution</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <ConnectWallet accentColor="#f213a4" colorMode="dark" />
          <p>address is: {address}</p>
          <Create />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
