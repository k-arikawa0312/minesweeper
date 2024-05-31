import ...
import { useGame } from '...'
import { TopArea } from '...'
import { Board } from '...'

const Home = () => {
  const { board, clickHandler, bombCount, gameStatus, resetGame } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        <TopArea bombCount={bombCount} gameStatus={gameStatus} onReset={resetGame} />
        <Board board={board} onClick={clickHandler} />
      </div>
    </div>
  );
};

export default Home;
