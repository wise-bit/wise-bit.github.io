import styles from '../styles/Index.module.css';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar />
        <Home username='sat' />
        {/* <Footer /> */}
      </main>
    </div>
  );
}
