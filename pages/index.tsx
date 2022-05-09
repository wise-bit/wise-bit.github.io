import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from "next/image";
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Satrajit Chatterjee</title>
        <meta name="description" content="By Satrajit Chatterjee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hi I'm <span className={'highlight'}>&nbsp;Sat&nbsp;</span> !
        </h1>

        <h3>v3 is still under development ;-;</h3>
      </main>
    </div>
  );
};

export default Home;
