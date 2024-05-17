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

const normalBoard = (normal = 0, row = 9, column = 9) =>
  Array.from({ length: row }, () => Array.from({ length: column }, () => normal));

const makeBoard = (bombMap: number[][], userInputs: number[][]) => {
  const board = normalBoard(-1);
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (userInputs !== undefined && userInputs[y][x] === 1 && bombMap[y][x] !== 1) {
        board[y][x] = 0;
        openStone(x, y, board, bombMap, []);
      }
      if (bombMap[y] !== undefined && bombMap[y][x] === 1 && userInputs[y][x] === 1) {
        board[y][x] = 11;
        // alert('Game over');
      }
      if (userInputs[y][x] === -100 && board[y][x] === -1) {
        board[y][x] = -100;
      }
    }
  }
  console.log('board', board);
  return board;
};

const findNearBomb = (x: number, y: number, bombMap: number[][]) => {
  let nearBomb = 0;
  for (const [dx, dy] of directions) {
    if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) nearBomb += 1;
  }
  return nearBomb;
};

const openStone = (x: number, y: number, board: number[][], bombMap: number[][], visited) => {
  if (board[y] === undefined || x < 0 || x > 8 || y < 0 || y > 8) {
    return;
  }

  if (visited.includes(`${x}-${y}`)) {
    return;
  }

  visited.push(`${x}-${y}`);
  const nearBomb = findNearBomb(x, y, bombMap);
  board[y][x] = nearBomb;

  if (nearBomb === 0) {
    for (const [dx, dy] of directions) {
      if (y + dy >= 0 && x + dx >= 0 && y + dy < 9 && x + dx < 9) {
        openStone(x + dx, y + dy, board, bombMap, visited);
      }
    }
  }
};

const Home = () => {
  const setLevel = (inputClick: number) => {
    const newLevel = structuredClone(level);

    if (inputClick === 1) {
      newLevel[0][0] = 10;
      newLevel[0][1] = 9;
      newLevel[0][2] = 9;
      resetGame();
      console.log(1);
    }
    if (inputClick === 2) {
      newLevel[0][0] = 40;
      newLevel[0][1] = 16;
      newLevel[0][2] = 16;
      resetGame();
      console.log(2);
    }
    if (inputClick === 3) {
      newLevel[0][0] = 99;
      newLevel[0][1] = 30;
      newLevel[0][2] = 16;
      console.log(3);
      resetGame();
    }
    setNewLevel(newLevel);
  };

  const [level, setNewLevel] = useState([
    [10, 9, 9], //爆弾の数 横 縦
  ]);
  const [bombMap, setBombMap] = useState(normalBoard(0, level[0][1], level[0][2]));
  const [userInputs, setUserInputs] = useState(normalBoard());
  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか

  const resetGame = () => {
    setBombMap(normalBoard());
    setUserInputs(normalBoard());
  };

  const clickHandler = (x: number, y: number, isRightClick = false) => {
    event.preventDefault();
    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);

    if (isRightClick) {
      if ((userInputs[y][x] === 1 && bombMap[y][x] === 1) === false)
        newUserInputs[y][x] = -100 - userInputs[y][x];
    } else {
      if (pushCount === 81) {
        let putBomb = 0;
        while (putBomb < level[0][0]) {
          const t = Math.floor(Math.random() * 9);
          const s = Math.floor(Math.random() * 9);
          if ((x !== t || y !== s) && newBombMap[s][t] !== 1) {
            newBombMap[s][t] = 1;
            putBomb += 1;
          }
        }
        setBombMap(newBombMap);
      }
      newUserInputs[y][x] = 1;
    }
    setUserInputs(newUserInputs);
  };
  const userMap = makeBoard(bombMap, userInputs);
  console.log('userinputs', userInputs);
  console.log('usermap', userMap);
  console.log('board', userMap);

  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => setLevel(1)}>初級</button>
        <button onClick={() => setLevel(2)}>中級</button>
        <button onClick={() => setLevel(3)}>上級</button>
      </div>
      <div
        className={styles.backboard}
        style={{ width: level[0][1] * 41.1, height: level[0][2] * 47.8 }}
      >
        <button
          className={styles.icon}
          style={{ backgroundPosition: `-331px -2px` }}
          onClick={resetGame}
        />
        <div id="time">{}</div>
        <div className={styles.board} style={{ width: level[0][1] * 35, height: level[0][2] * 35 }}>
          {userMap.map((row, y) =>
            row.map((display, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y, false)}
                onContextMenu={() => clickHandler(x, y, true)}
              >
                {display < 0 && (
                  <div className={styles.stone}>
                    {
                      <div
                        className={styles.icon}
                        style={{
                          backgroundPosition: display === -100 ? `-270px 0px` : `450px 0px`,
                        }}
                      />
                    }
                  </div>
                )}
                {display >= 0 && (
                  <div
                    className={styles.icon}
                    style={{ backgroundPosition: `${-30 * (display - 1)}px 0px` }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
