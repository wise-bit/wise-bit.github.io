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
  // const [nameContents, setNameContents] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const fileResponse = await fetch('/api/readFile');
        const fileData = await fileResponse.json();
        setFileContents(fileData.fileContents);
      } catch (error) {
        console.error('Error fetching file:', error);
      }

      // try {
      //   const nameResponse = await fetch('/api/readName');
      //   const nameData = await nameResponse.json();
      //   setNameContents(nameData.fileContents);
      // } catch (error) {
      //   console.error('Error fetching file:', error);
      // }

      try {
        // const resumeResponse = await fetch('/api/generateResume');
        // const resumeData = await resumeResponse.json();
        // setResumeLink(resumeData.url);
        setResumeLink('/files/satrajit-resume.pdf');
      } catch (error) {
        console.error('Error fetching S3 URL:', error);
      }
    };

    fetchFileContents();
  }, []);

  const portfolio_components = fileContents.split(/\r?\n\/\/ ---\r?\n/);

  return (
    <>
      <div className={styles.mainpage} style={{ paddingBottom: '50px' }}>
        {/* <div className={styles.title}>
          <pre>{nameContents}</pre>
        </div> */}
        <div className={styles.title}>
          <p>
            {`
            hi i'm sat (the govt. calls me satrajit chatterjee, you might find
            me as \`wise(-)bit\` on the internet) i'm a developer, working on finance 
            simulation, AI and computational genomics projects.
            `}
          </p>
          <p>{'//'}</p>
          <p>
            {`
            this text mostly exists because SEO can't process my fancy
            custom interactive code layout ;)
            `}
          </p>
          <br />
          <hr />
          <br />
        </div>
        <div>
          {portfolio_components.map((component, index) => {
            return (
              <CodeEditor
                key={index}
                displayText={component}
                nest={0}
                resumeLink={resumeLink}
                defaultExpand={index == 0}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

// export component
export default Intro;
