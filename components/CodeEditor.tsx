import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import styles from '../styles/CodeEditor.module.css';

interface Props {
  displayText: string;
  nest: number;
  resumeLink: string;
  preExpand: boolean;
}

const CodeEditor: NextPage<Props> = (props) => {
  const { displayText, resumeLink, preExpand } = props;
  const [expanded, setExpanded] = useState(preExpand);

  const text: string[] = displayText.split('\n');
  const firstLine = text.shift() || 'const undefined;';
  const firstLineSplit = firstLine?.split(' ');
  const finalDisplayText = text.join('\n');

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(preExpand);
  }, [preExpand]);

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
          {firstLineSplit[0] + ' '}
          <span style={{ textDecoration: 'underline' }}>
            {firstLineSplit[1]}
          </span>
          {' ' + firstLineSplit.slice(2, firstLineSplit.length - 1).join(' ')}
          {' { ' + (expanded ? '' : '... }')}
        </div>
        <pre
          className={`${styles['code-block']} ${
            expanded ? styles.expanded : ''
          }`}
        >
          {finalDisplayText.split(/\r?\n/).map((line, index) => {
            if (line.trim().startsWith('//')) {
              return (
                <div key={index} style={{ color: '#999' }}>
                  <code>{line}</code>
                </div>
              );
            }

            let parts = line.split('//%');
            if (parts.length > 1) {
              return (
                <div key={index}>
                  <a
                    href={parts[1] === 'link-resume' ? resumeLink : parts[1]}
                    rel='noopener noreferrer'
                  >
                    <div
                      style={{
                        color: '#5d9dc2',
                        // cursor: 'pointer',
                      }}
                    >
                      <code>{parts[0]}</code>
                    </div>
                  </a>
                </div>
              );
            }

            return (
              <div key={index} style={{ color: '#DDD' }}>
                <code>{line}</code>
              </div>
            );
          })}
          {/* <code>{finalDisplayText}</code> */}
        </pre>
      </div>
      {/* <ExpandButton isExpanded={true} /> */}
    </>
  );
};

export default CodeEditor;
