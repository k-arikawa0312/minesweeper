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

const searchBomb = (bombMap: number[][]) => {
  // console.log('passed');
  // console.log(bombMap);
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const numberBomb = [0];
      for (const direction of directions) {
        if (bombMap[y][x] === 1) break;
        if (
          bombMap[y + direction[1]] !== undefined &&
          bombMap[y + direction[1]][x + direction[0]] === 1
        ) {
          numberBomb[0] -= 1;
          bombMap[y][x] = numberBomb[0];
        }
      }
    }
  }
  // console.log(bombMap);
  return bombMap;
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
  console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjS');
  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか
  // const bombCount = bombMap.flat().filter((cell) => cell !== 0).length; //爆弾何個あるか
  // console.log(bombMap);

  // console.log('pushCount', pushCount);
  // console.log(bombMap);
  const clickHandler = (x: number, y: number) => {
    // console.log(bombMap);
    // console.log('pushCount2', pushCount);
    const newBombMap = structuredClone(bombMap);
    // console.log(newBombMap);
    // console.log('pushCount3', pushCount);
    // console.log(newBombMap);

    if (pushCount === 81) {
      console.log('if passed');
      let putBomb = 0;
      while (putBomb < 10) {
        const s = Math.floor(Math.random() * 9);
        const t = Math.floor(Math.random() * 9);
        if ((x !== t || y !== s) && newBombMap[s][t] !== 1) {
          newBombMap[s][t] = 1;
          putBomb += 1;
        }
      }
      // console.log(newBombMap);

      // setbombMap(newBombMap);
    }
    console.log(newBombMap);
    const newlll = searchBomb(newBombMap);
    setbombMap(newlll);
    // console.log(searchBomb(bombMap));
  };
  console.log('ysacvabis');

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {bombMap.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color === 1 && (
                <div className={styles.icon} style={{ backgroundPosition: `-300px 0px` }} />
              )}
              {color === -1 && (
                <div className={styles.icon} style={{ backgroundPosition: `0px 0px` }} />
              )}
              {color === -2 && (
                <div className={styles.icon} style={{ backgroundPosition: `-30px 0px` }} />
              )}
              {color === -3 && (
                <div className={styles.icon} style={{ backgroundPosition: `-60px 0px` }} />
              )}
              {color === -4 && (
                <div className={styles.icon} style={{ backgroundPosition: `-90px 0px` }} />
              )}
              {color === -5 && (
                <div className={styles.icon} style={{ backgroundPosition: `-120px 0px` }} />
              )}
              {color === -6 && (
                <div className={styles.icon} style={{ backgroundPosition: `-150px 0px` }} />
              )}
              {color === -7 && (
                <div className={styles.icon} style={{ backgroundPosition: `-180px 0px` }} />
              )}
              {color === -8 && (
                <div className={styles.icon} style={{ backgroundPosition: `-210px 0px` }} />
              )}
              {color === -9 && (
                <div className={styles.icon} style={{ backgroundPosition: `-240px 0px` }} />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
