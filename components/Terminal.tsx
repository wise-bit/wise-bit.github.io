import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Terminal.module.css';

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${date}`;
};

interface TerminalProps {
  publicKey: string;
}

const Terminal: React.FC<TerminalProps> = (props) => {
  const { publicKey } = props;
  const [input, setInput] = useState<string>('');
  const [historyPtr, setHistoryPtr] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputCommands, setInputCommands] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([
    `hi i'm a functional terminal :)`,
    `: ${getDate()}`,
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const directory: { [key: string]: string } = {
    'secret.txt': '[redacted]',
    'experience.txt': 'AI developer at Intact working with insurance data.',
    'publickey.asc': publicKey,
  };

  const commandList: string[] = [
    'help',
    'clear',
    'copylast',
    'date',
    'time',
    '???',
    'ls',
    'dir',
    'cat',
    'history',
    'vim',
  ];

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // c: enter user command
      const raw_input: string = input.trim();
      setLogs([...logs, `> ${input}`]);
      setInputCommands([...inputCommands, raw_input]);
      setHistoryPtr(0);

      // available commands
      if (raw_input.startsWith('cat')) {
        // i: read files
        const inputParts = raw_input.split(' ');
        if (inputParts.length != 2) {
          setLogs((prevLogs) => [...prevLogs, 'ERROR syntax: cat <filename>']);
        } else {
          const fileName = inputParts[1];
          const fileContent = directory[fileName];
          if (!fileContent) {
            setLogs((prevLogs) => [...prevLogs, 'ERROR: file not found']);
          } else {
            setLogs((prevLogs) => [...prevLogs, fileContent]);
          }
        }
      } else if (raw_input.startsWith('vim')) {
        // i: all vim operations
        setLogs((prevLogs) => [...prevLogs, 'coming soon...']);
      } else {
        // i: all other available commands
        switch (raw_input.toLowerCase()) {
          case 'help':
            setLogs((prevLogs) => [
              ...prevLogs,
              'Available commands: ' + commandList.join(', '),
            ]);
            break;

          case 'clear':
            setLogs([]);
            break;

          case 'cls':
            setLogs([]);
            break;

          case 'copylast':
            navigator.clipboard.writeText(logs[logs.length - 1]);
            setLogs((prevLogs) => [
              ...prevLogs,
              ': copied last log to clipboard!',
            ]);
            break;

          case 'date':
            setLogs((prevLogs) => [...prevLogs, getDate()]);
            break;

          case 'time':
            setLogs((prevLogs) => [
              ...prevLogs,
              new Date().toLocaleTimeString(),
            ]);
            break;

          case 'ls':
            setLogs((prevLogs) => [
              ...prevLogs,
              Object.keys(directory).join(', '),
            ]);
            break;

          case 'dir':
            setLogs((prevLogs) => [
              ...prevLogs,
              Object.keys(directory).join(', '),
            ]);
            break;

          case 'history':
            setLogs((prevLogs) => [
              ...prevLogs,
              `(${inputCommands.join('; ')})`,
            ]);
            break;

          default:
            setLogs((prevLogs) => [...prevLogs, 'ERROR: command not found']);
        }
      }
      setInput(''); // clear input after command execution
      const logDiv = document.querySelector<HTMLDivElement>('#terminal-input');
      if (logDiv) logDiv.scrollTop = logDiv.scrollHeight;
    } else if (event.key === 'Escape') {
      // c: clearn input
      setInput('');
    } else if (event.key === 'ArrowUp') {
      // c: go up in history
      if (historyPtr < inputCommands.length) {
        setInput(inputCommands[inputCommands.length - historyPtr - 1]);
        setHistoryPtr(historyPtr + 1);
      }
    } else if (event.key === 'ArrowDown') {
      // c: go down in history
      if (historyPtr > 0) {
        setInput(inputCommands[inputCommands.length - historyPtr]);
        setHistoryPtr(historyPtr - 1);
      } else {
        setInput('');
        setHistoryPtr(0);
      }
    }
  };

  const getCommandColor = (command: string) => {
    if (command.startsWith('ERROR')) {
      return '#c44f4fff';
    } else if (command.startsWith('>') || command.startsWith(':')) {
      return '#3f803fff';
    }
    return '#6ad46a';
  };

  useEffect(() => {
    const terminalContainer = document.getElementById('terminal');
    terminalContainer?.scrollTo({
      top: terminalContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [logs]);

  return (
    <>
      {/* {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Hello World</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )} */}

      <div
        className={styles.terminalContainer}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={styles.windowFakeButtonSet}>
          <span
            className={styles.windowFakeButton}
            style={{ backgroundColor: '#ec6969ff' }}
          ></span>
          <span
            className={styles.windowFakeButton}
            style={{ backgroundColor: '#ddc164ff' }}
          ></span>
          <span
            className={styles.windowFakeButton}
            style={{ backgroundColor: '#62be5aff' }}
          ></span>
          <div
            className={styles.windowExpandButton}
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
          </div>
        </div>
        <div className={styles.terminal} id='terminal'>
          <div className={styles.log}>
            {logs.map((log, index) => (
              <div
                key={index}
                style={{
                  color: getCommandColor(log),
                  textShadow: `0 0 5px ${getCommandColor(log)}`,
                  marginTop: log.startsWith('>') ? '10px' : '0',
                }}
              >
                {log}
              </div>
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.prompt}>user@terminal:~$</span>
            <input
              type='text'
              ref={inputRef}
              placeholder='"help" or command...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className={styles.terminalInput}
              autoFocus
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Terminal;
