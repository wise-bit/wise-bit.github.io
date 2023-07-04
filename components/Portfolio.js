import React, { useState } from 'react';

const Portfolio = () => {
  const [collapsedSections, setCollapsedSections] = useState([]);

  const handleCollapse = (index) => {
    setCollapsedSections((prevSections) => {
      const updatedSections = [...prevSections];
      if (updatedSections.includes(index)) {
        updatedSections.splice(updatedSections.indexOf(index), 1);
      } else {
        updatedSections.push(index);
      }
      return updatedSections;
    });
  };

  const isCollapsed = (index) => {
    return collapsedSections.includes(index);
  };

  return (
    <div className="code-container">
      {/* Code sections */}
      <div className={`code-section ${isCollapsed(0) ? 'collapsed' : ''}`}>
        <div className="collapse-button" onClick={() => handleCollapse(0)}>+</div>
        <pre>
          <code>
            {'const myname = () => &#123;'}
            {'\n'}
            &nbsp;&nbsp;age = 22;
            {'\n'}
            &nbsp;&nbsp;university = 'toronto';
            {'\n'}
            {'\n'}
            &nbsp;&nbsp;return me;
            {'\n'}
            &#125;
          </code>
        </pre>
      </div>

      {/* Add more code sections as needed */}
    </div>
  );
};

export default Portfolio;