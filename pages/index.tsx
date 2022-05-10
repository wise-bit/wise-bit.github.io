import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import Intro from "../components/Intro";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Satrajit Chatterjee</title>
        <meta name="description" content="By Satrajit Chatterjee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Intro username="Sat" />
      </main>
    </div>
  );
};

export default Home;
