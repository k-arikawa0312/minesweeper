import styles from './index.module.css';
import useGame from '../hook/useGame';
import TopArea from '../hook/TopArea';
import Board from '../hook/Board';

const Home = () => {
  const {
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
  } = useGame();

  return (
    <div className={styles.container}>
      <TopArea
        isCustom={isCustom}
        tentativeLevel={tentativeLevel}
        setTentativeLevel={setTentativeLevel}
        reflectCustom={reflectCustom}
        clickedClass={clickedClass}
        setIsCustom={setIsCustom}
      />
      <Board
        level={level}
        clickHandler={clickHandler}
        seconds={seconds}
        resetGame={resetGame}
        switchRightClickOn={switchRightClickOn}
        rightClickOn="rightClickOn"
        clickedBomb=""
        userMap={userMap}
      />
    </div>
  );
};

export default Home;
