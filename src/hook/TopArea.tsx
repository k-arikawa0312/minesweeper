import React from 'react';
import styles from '../pages/index.module.css';

interface Props {
  isCustom: boolean;
  tentativeLevel: { numBomb: number; selectWidth: number; selectHeight: number };
  setTentativeLevel: (
    value: React.SetStateAction<{
      numBomb: number;
      selectWidth: number;
      selectHeight: number;
    }>,
  ) => void;
  reflectCustom: () => void;
  clickedClass: (inputClick: number) => void;
  setIsCustom: (isCustom: boolean) => void;
}

const TopArea: React.FC<Props> = ({
  isCustom,
  tentativeLevel,
  setTentativeLevel,
  reflectCustom,
  clickedClass,
  setIsCustom,
}) => {
  return (
    <>
      <div className={styles.container} />
      <div style={{ visibility: isCustom ? 'visible' : 'hidden' }}>
        <label>幅</label>
        <input
          type="number"
          value={tentativeLevel.selectWidth}
          min={1}
          max={100}
          onChange={(e) =>
            setTentativeLevel({ ...tentativeLevel, selectWidth: Number(e.target.value) })
          }
          style={{ width: 50, height: 20 }}
        />
        <label>高さ</label>
        <input
          type="number"
          value={tentativeLevel.selectHeight}
          min={1}
          max={100}
          onChange={(e) =>
            setTentativeLevel({ ...tentativeLevel, selectHeight: Number(e.target.value) })
          }
          style={{ width: 50, height: 20 }}
        />
        <label>爆弾の数</label>
        <input
          type="number"
          min={1}
          max={10000}
          value={tentativeLevel.numBomb}
          onChange={(e) =>
            setTentativeLevel({ ...tentativeLevel, numBomb: Number(e.target.value) })
          }
          style={{ width: 50, height: 20 }}
        />
        <button onClick={reflectCustom} style={{ width: 50, height: 30 }}>
          反映
        </button>
      </div>
      <div>
        <button onClick={() => clickedClass(1)} style={{ width: 50, height: 30 }}>
          初級
        </button>
        <button onClick={() => clickedClass(2)} style={{ width: 50, height: 30 }}>
          中級
        </button>
        <button onClick={() => clickedClass(3)} style={{ width: 50, height: 30 }}>
          上級
        </button>
        <button onClick={() => setIsCustom(true)} style={{ width: 70, height: 30 }}>
          カスタム
        </button>
      </div>
    </>
  );
};
export default TopArea;
