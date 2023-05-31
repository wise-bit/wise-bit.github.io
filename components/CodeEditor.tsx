import React, { useState } from 'react';
import { NextPage } from 'next';
import styles from '../styles/CodeEditor.module.css';
// import ExpandButton from './ExpandButton';

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  displayText: string;
  nest: number;
}

const CodeEditor: NextPage<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);

  const { displayText } = props;

  const text: string[] = displayText.split('\n');
  const firstLine = text.shift();
  const finalDisplayText = text.join('\n');

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={`${styles['code-editor']}`}>
        <div
          className={`${styles['toggle-button']} ${
            expanded ? styles.expanded : ''
          }`}
          onClick={handleToggle}
        >
          <button className={`${styles['sign-button']}`}>
            {expanded ? '-' : '+'}
          </button>
          {firstLine}
        </div>
        <pre
          className={`${styles['code-block']} ${
            expanded ? styles.expanded : ''
          }`}
        >
          <code>{finalDisplayText}</code>
          {/* <SyntaxHighlighter language='javascript' style={duotoneDark}>
            {finalDisplayText}
          </SyntaxHighlighter> */}
        </pre>
      </div>

      {/* <ExpandButton isExpanded={true} /> */}
    </>
  );
};

export default CodeEditor;
