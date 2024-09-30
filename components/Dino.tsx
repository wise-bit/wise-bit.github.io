import React, { useEffect, useState } from 'react';
import styles from '../styles/Dino.module.css';

type Tree = {
  id: number;
  x: number;
};

const Dino: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const spawnTree = () => {
      setTrees((prevTrees) => [...prevTrees, { id: Date.now(), x: 100 }]);
      const randomInterval = (Math.floor(Math.random() * 4) + 1) * 1000;
      timeoutId = setTimeout(spawnTree, randomInterval);
    };
    spawnTree();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // cleanup
      setTrees((prevTrees) => {
        return prevTrees
          .map((tree) => ({ ...tree, x: tree.x - 2 }))
          .filter((tree) => tree.x > -100);
      });

      if (trees.some((tree) => tree.x < 30 && tree.x > 0)) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500); // Stop jump after a short time
      }
    }, 30);
    return () => clearInterval(interval);
  }, [trees]);

  return (
    <div className={styles.gameContainer}>
      <div className={`${styles.dinosaur} ${isJumping ? styles.jump : ''}`}>
        {'dino'}
      </div>
      {trees.map((tree) => (
        <div
          key={tree.id}
          className={styles.tree}
          style={{ left: `${tree.x}%` }}
        ></div>
      ))}
    </div>
  );
};

export default Dino;
