import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [1, 0],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const searchBomb = (x: number, y: number, bombMap: number[][]) => {
  let numberBomb = 0;
  for (const direction of directions) {
    const currentPos = [0, 0];
    const [dy, dx] = direction;
    currentPos[1] = x + dx;
    currentPos[0] = y + dy;
    console.log(currentPos[0], currentPos[1]);
    if (bombMap[currentPos[0]][currentPos[1]] === 1) {
      numberBomb += 1;
      console.log(numberBomb);
    }
  }
  return numberBomb;
};

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

    if (pushCount === 81) {
      let putBomb = 0;
      while (putBomb < 10) {
        const s = Math.floor(Math.random() * 9);
        const t = Math.floor(Math.random() * 9);
        if ((x !== t || y !== s) && newBombMap[s][t] !== 1) {
          newBombMap[s][t] = 1;
          putBomb += 1;
        }
      }
      setbombMap(newBombMap);
    }
    console.log(searchBomb(x, y, newBombMap));
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
