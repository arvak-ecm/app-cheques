import { FC, useRef, useState } from "react";

interface thresholdProps {
  onThreshold: (value: number) => void;
}

const Threshold: FC<thresholdProps> = ({ onThreshold }) => {
  const [threshold, setThreshold] = useState(7);
  const fileinputRef = useRef<HTMLInputElement>(null);

  const changeThreshold = (threshold: number) => {
    setThreshold(threshold);
    onThreshold(threshold);
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
            value={threshold}
            className="range-slider"
            id="myRange"
            onChange={(e) => changeThreshold(Number(e.target.value))}
          />
          <p className="range-slidervalue">{threshold / 10}</p>
        </div>
      </div>
    </>
  );
};

export default Threshold;
