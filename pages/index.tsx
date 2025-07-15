import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Index.module.css';
import Home from '../components/Home';

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Satrajit Chatterjee</title>
        <meta name='description' content='Satrajit Chatterjee' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Home username="sat" />
      </main>
    </div>
  );
};

export default Index;
