import styles from './index.module.css';

interface Props {
  level: number[];
  seconds: number;
  clickHandler: (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number,
    isRightClick: string,
  ) => void;
  resetGame: () => void;

  switchRightClickOn: () => string;
  rightClickOn: string;
  clickedBomb: string;
  userMap: number[][];
}

const Board: React.FC<Props> = ({
  level,
  seconds,
  clickHandler,
  resetGame,
  switchRightClickOn,
  rightClickOn,
  clickedBomb,
  userMap,
}) => {
  return (
    <>
      <div
        className={styles.backboard}
        style={{
          width: level[1] >= 9 ? level[1] * 41.1 : level[2] * 15 + 370,
          height: level[2] >= 9 ? level[2] * 47.8 : level[1] * 15 + 430,
        }}
      >
        <div className={styles.box} style={{ width: level[1] >= 9 ? level[1] * 35 : 315 }}>
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
        <div
          className={styles.board}
          style={{
            width: level[1] * 35,
            height: level[2] * 35,
          }}
        >
          {userMap.map((row, y) =>
            row.map((display, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={(e) => clickHandler(e, x, y, 'off')}
                onContextMenu={(e) => clickHandler(e, x, y, 'on')}
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
                    style={{
                      backgroundPosition: `-300px 0px`,
                      backgroundColor:
                        clickedBomb.includes(`${x}-${y}`) === true ? '#ff1111' : '#d3d3d3',
                    }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      <button onClick={switchRightClickOn} style={{ height: 30, width: 50 }}>
        旗{rightClickOn}
      </button>
    </>
  );
};

export default Board;
