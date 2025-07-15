import React, { KeyboardEvent, useEffect, useState } from 'react';

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
  const [inputCommands, setInputCommands] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([
    `hi i'm a functional terminal :)`,
    `: ${getDate()}`,
  ]);

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
    'vim',
  ];

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // c:
      // enter user command
      const raw_input: string = input.trim();

      setLogs([...logs, `> ${input}`]);
      setInputCommands([...inputCommands, raw_input]);
      setHistoryPtr(0);

      // available commands
      if (raw_input.startsWith('cat')) {
        // i:
        // read files
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
        // i:
        // all vim operations
        setLogs((prevLogs) => [...prevLogs, 'coming soon...']);
      } else {
        // i:
        // all other available commands
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

          default:
            setLogs((prevLogs) => [...prevLogs, 'ERROR: command not found']);
        }
      }

      setInput(''); // clear input after command execution

      const logDiv = document.querySelector<HTMLDivElement>('#terminal-input');
      if (logDiv) {
        logDiv.scrollTop = logDiv.scrollHeight;
      }
    } else if (event.key === 'Escape') {
      // c:
      // clearn input
      setInput('');
    } else if (event.key === 'ArrowUp') {
      // c:
      // go up in history
      if (historyPtr < inputCommands.length) {
        setInput(inputCommands[inputCommands.length - historyPtr - 1]);
        setHistoryPtr(historyPtr + 1);
      }
    } else if (event.key === 'ArrowDown') {
      // c:
      // go down in history
      if (historyPtr > 0) {
        setInput(inputCommands[inputCommands.length - historyPtr]);
        setHistoryPtr(historyPtr - 1);
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
    <div style={terminalStyle} id='terminal'>
      <div style={logStyle}>
        {logs.map((log, index) => (
          <div
            key={index}
            style={{
              color: getCommandColor(log),
              marginTop: log.startsWith('>') ? '10px' : '0',
            }}
          >
            {log}
          </div>
        ))}
      </div>
      <div style={inputWrapperStyle}>
        <span style={promptStyle}>user@terminal:~$</span>
        <input
          type='text'
          placeholder='"help" or command...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          style={inputStyle}
          autoFocus
        />
      </div>
    </div>
  );
};

const terminalStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: '#6ad46a',
  fontSize: '16px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  padding: '20px',
  marginBottom: '30px',
  borderRadius: '5px',
  height: '300px',
  overflowY: 'auto',
  overflowX: 'scroll',
  width: '100%',
  maxWidth: '460px',
};

const logStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const promptStyle: React.CSSProperties = {
  marginRight: '10px',
  color: '#bed4be',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: '#FFF',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  border: 'none',
  outline: 'none',
  width: '100%',
  paddingLeft: '0px',
  fontSize: '16px',
};

export default Terminal;
