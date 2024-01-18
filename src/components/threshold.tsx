import { FC, useContext, useRef } from "react";
import { AppContext } from "../context/appContext";

const Threshold: FC = () => {
  const { appData, updateAppData } = useContext(AppContext);
  const fileinputRef = useRef<HTMLInputElement>(null);

  const changeThreshold = (threshold: number) => {
    updateAppData({ threshold });
    console.log("threshold", appData);
  };

  return (
    <>
      <div className="range-slider-div flex flex-col ">
        <p className="text-[14px] text-left">Índice de confianza (threshold)</p>
        <div className="flex flex-row items-center gap-3">
          <input
            ref={fileinputRef}
            type="range"
            min="1"
            max="9"
            value={appData.threshold}
            className="range-slider"
            id="myRange"
            onChange={(e) => changeThreshold(Number(e.target.value))}
          />
          <p className="range-slidervalue">{appData.threshold / 10}</p>
        </div>
      </div>
    </>
  );
};

export default Threshold;
