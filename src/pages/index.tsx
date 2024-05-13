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

const normalBoard = (normal = 0, row = 9, column = 9): number[][] =>
  Array.from({ length: row }, () => Array.from({ length: column }, () => normal));

const searchBomb = (bombMap: number[][], userInputs: number[][]) => {
  const board = normalBoard(-1);
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (userInputs !== undefined && userInputs[y][x] === 1) {
        board[y][x] = 0;
        openStone(x, y, board, bombMap);
        for (const [dx, dy] of directions) {
          if (board[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) {
            board[y][x] += 1;
          }
        }
        if (bombMap[y] !== undefined && bombMap[y][x] === 1) {
          board[y][x] = 11;
        }
      }
    }
  }

  return board;
};

const openStone = (x: number, y: number, board: number[][], bombMap: number[][]) => {
  for (const [dx, dy] of directions) {
    if (
      board[y + dy] !== undefined &&
      bombMap[y + dy][x + dx] === 0 &&
      board[y + dy][x + dx] === 0
    ) {
      console.log(212);
      openStone(x + dx, y + dy, board, bombMap);
      board[y + dy][x + dx] = 0;
      //  ひらく
    }
    if (board[y + dy] !== undefined && board[y + dy][x + dx] !== 0) {
      console.log(1111);
      break;
    }
  }
  return board;
};

const Home = () => {
  const [bombMap, setbombMap] = useState(normalBoard());

  const [userInputs, setUserInputs] = useState(normalBoard());

  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか

  const clickHandler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);

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
    newUserInputs[y][x] = 1;

    setUserInputs(newUserInputs);
  };
  const numBomb = searchBomb(bombMap, userInputs);
  console.log(userInputs);
  console.log(numBomb);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {numBomb.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {numBomb[y][x] === -1 ? (
                <div className={styles.stone} />
              ) : (
                <div
                  className={styles.icon}
                  style={{ backgroundPosition: `${-30 * (color - 1)}px 0px` }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
