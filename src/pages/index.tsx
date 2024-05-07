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

  const clickHandler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    console.log(x, y);
    console.log(pushCount);
    if (pushCount === 81) {
      let putBomb = 0;
      while (putBomb < 10) {
        console.log(89);
        const s = Math.floor(Math.random() * 9);
        const t = Math.floor(Math.random() * 9);
        if (newBombMap[s][t] !== 1) {
          newBombMap[s][t] = 1;
          putBomb += 1;
        }
        console.log(Math.floor(Math.random() * 9));
      }
      setbombMap(newBombMap);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {bombMap.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              <div className={styles.icon} style={{ background: color === 0 ? '#000' : '#fff' }} />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
