import { NextPage } from 'next';
import styles from '../styles/IntroText.module.css';

interface Props {}

const IntroText: NextPage<Props> = () => {
  return (
    <>
      <div className={styles.introText}>
        <p>
          {`
        hi i'm sat (the govt calls me satrajit chatterjee, you might find
        me as \`wise(-)bit\` on the internet) i'm a developer, working on finance 
        simulation, AI and computational genomics projects.
        `}
        </p>
      </div>
      <div className={`${styles.introText} ${styles.introTextBottom}`}>
        <p>
          {`
        this text mostly exists because SEO can't process my fancy
        custom interactive code layout ;)
        `}
        </p>
      </div>
      <div className={styles.logLinkText}>
        <div>
          also see:{' '}
          <a
            href='https://log.satrajit.ca'
            rel='noopener noreferrer'
          >
            <b>sat logs</b>
          </a>
        </div>
      </div>
    </>
  );
};

export default IntroText;
