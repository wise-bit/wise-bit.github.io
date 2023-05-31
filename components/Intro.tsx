import { NextPage } from 'next';
import styles from '../styles/Intro.module.css';
import CodeEditor from './CodeEditor';
import { useEffect, useState } from 'react';

interface Props {
  username: string;
}

const Intro: NextPage<Props> = (props) => {
  // const { username } = props;
  const [fileContents, setFileContents] = useState('');
  const [nameContents, setNameContents] = useState('');

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const fileResponse = await fetch('/api/readFile');
        const fileData = await fileResponse.json();
        setFileContents(fileData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }

      try {
        const nameResponse = await fetch('/api/readName');
        const nameData = await nameResponse.json();
        setNameContents(nameData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFileContents();
  }, []);

  // More work needs to be done here

  return (
    <>
      <div className={styles.title}>
        <pre>{nameContents}</pre>
      </div>
      <div>
        <CodeEditor displayText={fileContents} nest={0} />
        <CodeEditor displayText={fileContents} nest={0} />
      </div>
    </>
  );
};

// export component
export default Intro;
