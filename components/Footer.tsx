import { NextPage } from 'next';

import styles from '../styles/Footer.module.css';

interface Props {
  colorMode?: boolean;
}

const Navbar: NextPage<Props> = (props) => {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          Copyright © 2026 <a href='https://github.com/wise-bit'>wise-bit</a>
        </div>
      </footer>
    </>
  );
};

export default Navbar;

