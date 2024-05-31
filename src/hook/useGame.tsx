import { useEffect, useState } from 'react';

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

const randomBomb: string[] = [];
const clickedBomb: number[] = [];
let rightClickOn: boolean = false;
const useGame = () => {
  const normalBoard = (normal = 0, row: number, column: number) =>
    Array.from({ length: row }, () => Array.from({ length: column }, () => normal));
  const findNearBomb = (x: number, y: number, bombMap: number[][]) => {
    let nearBomb = 0;
    for (const [dx, dy] of directions) {
      if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) nearBomb += 1;
    }
    return nearBomb;
  };
  const [level, setNewLevel] = useState([10, 9, 9]); //爆弾の数 横 縦
  const [bombMap, setBombMap] = useState(normalBoard(0, level[1], level[2]));
  const [userInputs, setUserInputs] = useState(normalBoard(0, level[1], level[2]));
  const [isActive, setIsActive] = useState(false);
  const [tentativeLevel, setTentativeLevel] = useState({
    numBomb: 1,
    selectWidth: 1,
    selectHeight: 1,
  });
  const [isCustom, setIsCustom] = useState(false);

  const switchRightClickOn = () => {
    if (rightClickOn === false) {
      console.log(200);
      rightClickOn = true;
    } else {
      console.log(40);
      rightClickOn = false;
    }
    return rightClickOn;
  };
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = 0;

    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

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
              if (bombMap[y] !== undefined && bombMap[y][x] === 1) {
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
    clickedBomb.length = 0;
    randomBomb.length = 0;
    rightClickOn = false;
  };
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  const clickHandler = (e: any, x: number, y: number, isRightClick: boolean) => {
    e.preventDefault();

    if (y < 0 || y >= level[2] || x < 0 || x >= level[1]) {
      return; // 範囲外は無視
    }

    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);
    if (isRightClick === false) {
      if (rightClickOn === true) {
        // eslint-disable-next-line no-param-reassign
        isRightClick = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        isRightClick = false;
      }
    }

    if (isRightClick === true) {
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
          randomBomb.push(`${x}-${y}`);
          while (putBomb < level[0]) {
            const t = Math.floor(Math.random() * level[1]);
            const s = Math.floor(Math.random() * level[2]);
            if (randomBomb.includes(`${t}-${s}`)) continue;
            if (newBombMap[s] !== undefined && newBombMap[s][t] !== 1) {
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
        if (newUserInputs[y][x] === 1 && bombMap[y][x] === 1) {
          clickedBomb.push(x, y);
        }
      }
    }
    setUserInputs(newUserInputs);
  };
  const userMap = makeBoard(bombMap, userInputs);
  console.log(rightClickOn);

  const clickedClass = (inputClick: number) => {
    setIsCustom(false);
    if (inputClick === 1) {
      setNewLevel([10, 9, 9]);
    }
    if (inputClick === 2) {
      setNewLevel([40, 16, 16]);
    }
    if (inputClick === 3) {
      setNewLevel([99, 30, 16]);
    }
    resetGame();
  };

  const reflectCustom = () => {
    setNewLevel([tentativeLevel.numBomb, tentativeLevel.selectWidth, tentativeLevel.selectHeight]);
    resetGame();
  };

  if (isActive) {
    userMap.flat().filter((cell) => cell === 11).length !== 0 ||
    userMap.flat().filter((cell) => cell === -1).length +
      userMap.flat().filter((cell) => cell === -100).length ===
      level[0]
      ? setIsActive(false)
      : console.log();
  }
  return {
    switchRightClickOn,
    clickHandler,
    userMap,
    setTentativeLevel,
    isCustom,
    seconds,
    clickedClass,
    reflectCustom,
    tentativeLevel,
    setIsCustom,
    level,
    resetGame,
    clickedBomb,
    rightClickOn,
  };
};
export default useGame;
