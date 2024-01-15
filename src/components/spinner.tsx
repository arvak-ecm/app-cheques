import { FC } from "react";
import "./spinner.css";

interface spinnerProps {}

const Spinner: FC<spinnerProps> = () => {
  return (
    <>
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Procesando datos...</div>
      </div>
    </>
  );
};

export default Spinner;
