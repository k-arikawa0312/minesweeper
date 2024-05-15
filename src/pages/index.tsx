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

const makeBoard = (bombMap: number[][], userInputs: number[][]) => {
  const board = normalBoard(-1);
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (userInputs !== undefined && userInputs[y][x] === 1 && bombMap[y][x] !== 1) {
        board[y][x] = 0;
        openStone(x, y, board, bombMap, directions[0]);
        for (const [dx, dy] of directions) {
          if (board[y + dy] !== undefined) {
            board[y][x] = findNearBomb(x, y, bombMap);
          }
        }
        for (const [dx, dy] of canOpen) {
          board[dy][dx] = 0;
        }
      }
      if (bombMap[y] !== undefined && bombMap[y][x] === 1 && userInputs[y][x] === 1) {
        board[y][x] = 11;
        // alert('Game over');
      }
    }
  }

  return board;
};

const findNearBomb = (x: number, y: number, bombMap: number[][]) => {
  let nearBomb = 0;
  for (const [dx, dy] of directions) {
    if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) nearBomb += 1;
  }
  console.log(x, y, nearBomb);
  return nearBomb;
};
const canOpen = [];
const bombPos = [];

const openStone = (
  x: number,
  y: number,
  board: number[][],
  bombMap: number[][],
  direction: number[],
) => {
  if (board[y] === undefined || x < 0 || x > 8) {
    return;
  }
  for (const [nx, ny] of canOpen) {
    if (nx === x && ny === y) {
      return;
    }
  }
  for (const [nx, ny] of bombPos) {
    if (nx === x && ny === y) {
      return;
    }
  }
  for (const [dx, dy] of directions) {
    if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] !== 1) {
      console.log(78);
      board[y + dy][x + dx] = findNearBomb(x + dx, y + dy, bombMap);
      board[y][x] = findNearBomb(x, y, bombMap);
    }
  }

  canOpen.push([x, y]);

  if (findNearBomb(x, y, bombMap) !== 0) return;
  openStone(x + directions[0][0], y + directions[0][1], board, bombMap, directions[0]);
  openStone(x + directions[4][0], y + directions[4][1], board, bombMap, directions[4]);
  openStone(x + directions[2][0], y + directions[2][1], board, bombMap, directions[2]);
  openStone(x + directions[3][0], y + directions[3][1], board, bombMap, directions[3]);
  openStone(x + directions[5][0], y + directions[5][1], board, bombMap, directions[5]);
  openStone(x + directions[6][0], y + directions[6][1], board, bombMap, directions[6]);
  openStone(x + directions[7][0], y + directions[7][1], board, bombMap, directions[7]);
  openStone(x + directions[1][0], y + directions[1][1], board, bombMap, directions[1]);
  for (const [dx, dy] of directions) {
    if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] !== 1)
      board[y + dy][x + dx] = findNearBomb(x, y, bombMap);
  }
};
const prePosition = [0, 0];
const Home = () => {
  const [bombMap, setbombMap] = useState(normalBoard());

  const [userInputs, setUserInputs] = useState(normalBoard());

  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか

  const clickHandler = (x: number, y: number) => {
    prePosition[0] = x;
    prePosition[1] = y;
    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);

    if (pushCount === 81) {
      let putBomb = 0;
      while (putBomb < 10) {
        const t = Math.floor(Math.random() * 9);
        const s = Math.floor(Math.random() * 9);
        if ((x !== t || y !== s) && newBombMap[s][t] !== 1) {
          newBombMap[s][t] = 1;
          putBomb += 1;
          for (const [dx, dy] of directions) {
            bombPos.push([t + dx, s + dy]);
          }
        }
      }
      setbombMap(newBombMap);
    }
    console.log;
    for (const [dx, dy] of canOpen) {
      for (const [tx, ty] of directions) {
        if (newUserInputs[dy + ty] !== undefined) {
          newUserInputs[dy + ty][dx + tx] = 1;
        }
      }
    }
    newUserInputs[y][x] = 1;

    setUserInputs(newUserInputs);
  };
  const userMap = makeBoard(bombMap, userInputs);
  console.log('userInputs', userInputs);
  console.log('userMap', userMap);
  console.log('bombMap', bombMap);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userMap.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {userMap[y][x] === -1 ? (
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
