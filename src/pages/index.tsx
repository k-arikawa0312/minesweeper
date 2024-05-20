import React, { useEffect, useState } from 'react';
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
const normalBoard = (normal = 0, row: number, column: number) =>
  Array.from({ length: row }, () => Array.from({ length: column }, () => normal));
const findNearBomb = (x: number, y: number, bombMap: number[][]) => {
  let nearBomb = 0;
  for (const [dx, dy] of directions) {
    if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) nearBomb += 1;
  }
  return nearBomb;
};
const Home = () => {
  const [level, setNewLevel] = useState([10, 9, 9]); //爆弾の数 横 縦
  const [bombMap, setBombMap] = useState(normalBoard(0, level[1], level[2]));
  const [userInputs, setUserInputs] = useState(normalBoard(0, level[1], level[2]));
  const [isActive, setIsActive] = useState(false);
  const [tentativeLevel, setTentativeLevel] = useState([1, 1, 1]);

  useEffect(() => {
    resetGame();
  }, [level]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = 0;
    // タイマーを開始する
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // クリーンアップ関数を返す - コンポーネントがアンマウントされたときにタイマーをクリア
    return () => clearInterval(interval);
  }, [isActive]);

  const setLevel = () => {
    if (level[0] === 10 && level[1] === 9 && level[2] === 9) {
      return 1;
    } else if (level[0] === 30 && level[1] === 16 && level[2] === 16) {
      return 2;
    } else if (level[0] === 99 && level[1] === 30 && level[2] === 16) {
      return 3;
    } else {
      return 4;
    }
  };

  const makeBoard = (bombMap: number[][], userInputs: number[][]) => {
    const board = normalBoard(-1, level[2], level[1]);
    for (let y = 0; y < level[2]; y++) {
      for (let x = 0; x < level[1]; x++) {
        if (userInputs[y] !== undefined && userInputs[y][x] === 1 && bombMap[y][x] !== 1) {
          board[y][x] = 0;
          openStone(x, y, board, bombMap, []);
        }
        if (bombMap[y] !== undefined && bombMap[y][x] === 1 && userInputs[y][x] === 1) {
          for (let y = 0; y < level[2]; y++) {
            for (let x = 0; x < level[1]; x++) {
              if (bombMap[y][x] === 1) {
                board[y][x] = 11;
              }
            }
          }
        }
        if (userInputs[y] !== undefined && userInputs[y][x] === -100 && board[y][x] === -1) {
          board[y][x] = -100;
        }
      }
    }
    return board;
  };
  const openStone = (
    x: number,
    y: number,
    board: number[][],
    bombMap: number[][],
    visited: string[],
  ) => {
    // if (y < 0 || y >= level[2] || x < 0 || x >= level[1]) {
    //   // 範囲外の座標は無視します
    //   return;
    // }

    if (board[y] === undefined || x < 0 || x >= level[1]) return;

    if (visited.includes(`${x}-${y}`)) {
      return;
    }

    visited.push(`${x}-${y}`);
    if (userInputs[y] !== undefined) {
      userInputs[y][x] = 1;
    }
    const nearBomb = findNearBomb(x, y, bombMap);
    if (board[y] !== undefined) board[y][x] = nearBomb;

    if (nearBomb === 0) {
      for (const [dx, dy] of directions) {
        openStone(x + dx, y + dy, board, bombMap, visited);
      }
    }
  };

  const resetGame = () => {
    setBombMap(normalBoard(0, level[2], level[1]));
    setUserInputs(normalBoard(0, level[2], level[1]));
    setSeconds(0);
    setIsActive(false);
  };
  const clickHandler = (e: any, x: number, y: number, isRightClick = false) => {
    e.preventDefault();

    if (y < 0 || y >= level[2] || x < 0 || x >= level[1]) {
      return; // 範囲外は無視
    }

    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);

    if (isRightClick) {
      if (userInputs[y] !== undefined && (userInputs[y][x] === 1 && bombMap[y][x] === 1) === false)
        if (
          userMap.flat().filter((cell) => cell === -1).length +
            userMap.flat().filter((cell) => cell === -100).length !==
            level[0] &&
          userMap.flat().filter((cell) => cell === 11).length === 0
        ) {
          newUserInputs[y][x] = -100 - userInputs[y][x];
        }
    } else {
      if (newUserInputs[y] !== undefined && userInputs[y][x] !== -100) {
        const pushCount = newUserInputs.flat().filter((cell) => cell === 1).length;
        if (pushCount === 0) {
          setIsActive(true);
          let putBomb = 0;
          while (putBomb < level[0]) {
            const t = Math.floor(Math.random() * level[1]);
            const s = Math.floor(Math.random() * level[2]);
            if (x !== t && y !== s && newBombMap[s][t] !== 1) {
              newBombMap[s][t] = 1;
              putBomb += 1;
            }
          }
          setBombMap(newBombMap);
        }
        if (
          userMap.flat().filter((cell) => cell === -1).length +
            userMap.flat().filter((cell) => cell === -100).length !==
            level[0] &&
          userMap.flat().filter((cell) => cell === 11).length === 0
        ) {
          newUserInputs[y][x] = 1;
        }
      }
    }
    setUserInputs(newUserInputs);

    console.log(bombMap.flat().filter((cell) => cell === 1).length);
    console.log('userInputs', userInputs);
  };
  const userMap = makeBoard(bombMap, userInputs);

  if (isActive) {
    userMap.flat().filter((cell) => cell === 11).length !== 0 ||
    userMap.flat().filter((cell) => cell === -1).length +
      userMap.flat().filter((cell) => cell === -100).length ===
      level[0]
      ? setIsActive(false)
      : console.log(1);
  }
  return (
    <div className={styles.container}>
      <div>
        <label>幅</label>
        <input
          type="number"
          id="selectWidth"
          value={setTentativeLevel[0]}
          min={1}
          max={100}
          onChange={(e) => setTentativeLevel(e.target.value)}
          style={{ width: 50, height: 20 }}
        />
        <label>高さ</label>
        <input
          type="number"
          id="selectHeight"
          value={setTentativeLevel[1]}
          min={1}
          max={100}
          onChange={(e) => setTentativeLevel(e.target.value)}
          style={{ width: 50, height: 20 }}
        />
        <label>爆弾の数</label>
        <input
          type="number"
          id="selectNumBomb"
          min={1}
          max={10000}
          value={setTentativeLevel[2]}
          onChange={(e) => (setTentativeLevel[2] = e.target.value)}
          style={{ width: 50, height: 20 }}
        />
      </div>
      <div>
        <button onClick={() => setNewLevel([10, 9, 9])} style={{ width: 50, height: 30 }}>
          初級
        </button>
        <button onClick={() => setNewLevel([30, 16, 16])} style={{ width: 50, height: 30 }}>
          中級
        </button>
        <button onClick={() => setNewLevel([99, 30, 16])} style={{ width: 50, height: 30 }}>
          上級
        </button>
        <button onClick={() => setNewLevel([])} style={{ width: 70, height: 30 }}>
          カスタム
        </button>
      </div>
      <div className={styles.backboard} style={{ width: level[1] * 41.1, height: level[2] * 47.8 }}>
        <div className={styles.box} style={{ width: level[1] * 35 }}>
          <div className={styles.gameInfo}>
            {level[0] - userMap.flat().filter((cell) => cell === -100).length}
          </div>
          <button
            className={styles.icon}
            style={{
              backgroundPosition:
                userMap.flat().filter((cell) => cell === 11).length === 0
                  ? userMap.flat().filter((cell) => cell === -1).length +
                      userMap.flat().filter((cell) => cell === -100).length ===
                    level[0]
                    ? `-359px 1px`
                    : `-329px 1px`
                  : `-389px 1px`,
              height: 35,
              width: 35,
            }}
            onClick={resetGame}
          />
          <div className={styles.gameInfo}>{seconds}</div>
        </div>
        <div className={styles.board} style={{ width: level[1] * 35, height: level[2] * 35 }}>
          {userMap.map((row, y) =>
            row.map((display, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={(e) => clickHandler(e, x, y, false)}
                onContextMenu={(e) => clickHandler(e, x, y, true)}
              >
                {display < 0 && (
                  <div className={styles.stone}>
                    <div
                      className={styles.icon}
                      style={{
                        backgroundPosition: display === -100 ? `-270px 0px` : `450px 0px`,
                      }}
                    />
                  </div>
                )}
                {display >= 0 && display !== 11 && (
                  <div
                    className={styles.icon}
                    style={{ backgroundPosition: `${-30 * (display - 1)}px 0px ` }}
                  />
                )}
                {display === 11 && (
                  <div
                    className={styles.icon}
                    style={{ backgroundPosition: `-300px 0px`, backgroundColor: '#ff1111' }}
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
