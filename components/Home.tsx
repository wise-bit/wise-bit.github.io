import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import CodeEditor from './CodeEditor';
import HeaderText from './HeaderText';
import Terminal from './Terminal';
import Dino from './Dino';

interface Props {
  username: string;
}

const Home: NextPage<Props> = (_props) => {
  // const { username } = props;
  // const [nameContents, setNameContents] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [expandAll, setExpandAll] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const fileResponse = await fetch('/api/readSelf');
        const fileData = await fileResponse.json();
        setFileContents(fileData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }

      try {
        const fileResponse = await fetch('/api/readPublicKey');
        const fileData = await fileResponse.json();
        setPublicKey(fileData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }

      try {
        setResumeLink('/files/satrajit-resume.pdf');
      } catch (error) {
        console.error('Error fetching S3 URL:', error);
      }

      /*
      try {
        const nameResponse = await fetch('/api/readName');
        const nameData = await nameResponse.json();
        setNameContents(nameData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
      */

      /*
      const resumeResponse = await fetch('/api/generateResume');
      const resumeData = await resumeResponse.json();
      setResumeLink(resumeData.url);
      */
    };

    fetchFileContents();
  }, []);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (document.activeElement?.tagName !== 'INPUT') {
      if (e.key === '-' || e.key === '_') {
        setExpandAll(false);
      } else if (e.key === '+' || e.key === '=') {
        setExpandAll(true);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const portfolio_components = fileContents.split(/\r?\n\/\/ ---\r?\n/);

  return (
    <>
      <div className={styles.mainpage}>
        {/* Text header */}
        <div className={styles.title}>
          <HeaderText />
        </div>

        {/* Terminal */}
        <div className={styles.terminal}>
          <Terminal publicKey={publicKey} />
        </div>

        {/* Code Editor */}
        <div>
          {portfolio_components.map((component, index) => {
            return (
              <CodeEditor
                key={index}
                displayText={component}
                nest={0}
                resumeLink={resumeLink}
                preExpand={(expandAll === null && index === 0) || !!expandAll}
              />
            );
          })}
        </div>

        {/* Dino */}
        <div>
          <Dino />
        </div>
      </div>
    </>
  );
};

// export component
export default Home;
