import React, { useState, KeyboardEvent } from 'react';

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${date}`;
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([
    `hi i'm a functional terminal :)`,
    getDate(),
  ]);

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setLogs([...logs, `> ${input}`]);

      // available commands
      switch (input.toLowerCase()) {
        case 'help':
          setLogs((prevLogs) => [
            ...prevLogs,
            'Available commands: help, clear, date, time',
          ]);
          break;

        case 'clear':
          setLogs([]);
          break;
        
        case 'date':
          setLogs((prevLogs) => [...prevLogs, getDate()]);
          break;
        
        case 'time':
          setLogs((prevLogs) => [...prevLogs, new Date().toLocaleTimeString()]);
          break;

        default:
          setLogs((prevLogs) => [...prevLogs, 'ERROR: command not found']);
      }

      setInput(''); // clear input after command execution
    }
  };

  const getCommandColor = (command: string) => {
    if (command.startsWith('ERROR')) {
      return '#c44f4fff';
    } else if (command.startsWith('>')) {
      return '#3f803fff';
    }
    return '#6ad46a';
  };

  return (
    <div style={terminalStyle}>
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
          placeholder='type a command or "help"...'
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

// CSS in JS styling
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
