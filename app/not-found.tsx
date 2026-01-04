'use client';

import Link from 'next/link';
import styles from '../styles/NotFound.module.css';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.homeBtnContainer}>
        <h1>{'404 not found :('}</h1>
        <div className={styles.homeBtn}>
          <Link href='/'>back to home</Link>
        </div>
      </div>
      <div className={styles.notFoundImageContainer}>
        <Image
          src='/files/calvin_hobbes_invert.png'
          alt='Comic Strip Image'
          width={500}
          height={500}
          className={styles.notFoundImage}
          loading='eager'
        />
      </div>
    </div>
  );
}
