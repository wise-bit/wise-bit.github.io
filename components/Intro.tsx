import { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

interface Props {
  username: string;
}

const Intro: NextPage<Props> = (props) => {
  const { username } = props;

  return (
    <>
      <h1 className={styles.title}>
        Hi I&apos;m <span className={'highlight'}>{username}</span> !
      </h1>
      <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>
        Computer Science and Mathematics Undergrad Student
      </h3>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: '20px' }}>
          <Link href='https://github.com/wise-bit'>
            <h2
              className={'highlight clickable'}
              style={{ backgroundColor: '#cc5850', width: '150px' }}
            >
              Github
            </h2>
          </Link>
        </div>
        <div style={{ margin: '20px' }}>
          <Link href='https://www.linkedin.com/in/satrajit-c'>
            <h2
              className={'highlight clickable'}
              style={{ backgroundColor: '#326340', width: '150px' }}
            >
              LinkedIn
            </h2>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '0px',
          height: 'auto',
        }}
      >
        <div style={{ margin: '20px' }}>
          <Link href='./files/CV.pdf'>
            <h2
              className={'highlight clickable'}
              style={{ backgroundColor: '#509fcc', width: '150px' }}
            >
              Résumé
            </h2>
          </Link>
        </div>
        <div style={{ margin: '20px' }}>
          <Link href='mailto:satrajit314@gmail.com'>
            <h2
              className={'highlight clickable'}
              style={{ backgroundColor: '#bab759', width: '150px' }}
            >
              Email
            </h2>
          </Link>
        </div>
      </div>

      <h3 style={{ color: '#777777', marginTop: '100px', textAlign: 'center' }}>
        <span className={'highlight2'}>v3</span> is still under development,{' '}
        <Link href='/legacy'>
          <span className={'highlight2 clickable'}>check out v2</span>
        </Link>
      </h3>
    </>
  );
};

// export component
export default Intro;
