import React, { useState, KeyboardEvent } from 'react';

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const date = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${date}`;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([
    `hi i'm a functional terminal :)`,
    getDate(),
  ]);

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setLogs([...logs, `> ${input}`]);

      // Example custom commands
      switch (input.toLowerCase()) {
        case 'help':
          setLogs((prevLogs) => [
            ...prevLogs,
            'Available commands: help, clear',
          ]);
          break;
        case 'clear':
          setLogs([]);
          break;
        default:
          setLogs((prevLogs) => [...prevLogs, 'Command not found']);
      }

      setInput(''); // Clear input after command is executed
    }
  };

  return (
    <div style={terminalStyle}>
      <div style={logStyle}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
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
  fontFamily: 'monospace',
  padding: '20px',
  borderRadius: '5px',
  height: '300px',
  overflowY: 'auto',
  maxWidth: '500px',
  marginBottom: '30px',
  fontSize: '16px',
  fontWeight: 'bold',
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
  fontFamily: 'monospace',
  color: '#6ad46a',
  fontWeight: 'bold',
  border: 'none',
  outline: 'none',
  width: '100%',
  paddingLeft: '0px',
  fontSize: '16px',
};

export default Terminal;
