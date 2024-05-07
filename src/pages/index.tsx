import { useState } from 'react';
import styles from './index.module.css';

// const random = (min: number, max: number) => {
//   min = Math.cell(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

const Home = () => {
  const [bombMap, setbombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか
  const bombCount = bombMap.flat().filter((cell) => cell !== 0).length; //爆弾何個あるか

  console.log(Math.random(1, 9));

  const clickHandler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {bombMap.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              <div className={styles.icon} />
            </div>
          )),
        )}
      </div>
      <div className={styles.frontboard}>
        {bombMap.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.frontcell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              <div className={styles.flontCell} />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
