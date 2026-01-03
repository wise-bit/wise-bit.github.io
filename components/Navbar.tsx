'use client';

import { NextPage } from 'next';
import styles from '../styles/Navbar.module.css';

interface Props {
  colorMode?: boolean;
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const Navbar: NextPage<Props> = (props) => {
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.hiText}>
          {'hi :)'}
        </div>
        <div
          className={styles.navBtn}
          onClick={() => scrollToSection('terminalBox')}
        >
          {'> terminal'}
        </div>
        <div
          className={styles.navBtn}
          onClick={() => scrollToSection('portfolioBox')}
        >
          {'> portfolio'}
        </div>
        <div
          className={styles.navBtn}
          onClick={() => scrollToSection('dinoGame')}
        >
          {'> dino_game'}
        </div>
      </div>
    </>
  );
};

export default Navbar;

