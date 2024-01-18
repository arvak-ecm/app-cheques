import { FC } from "react";
import "./button.css";
interface props {}

const BtnReload: FC<props> = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <button className="btn w-[226px] mb-4" onClick={reloadPage}>
        <div className="flex flex-row gap-2 items-center">
          <span>Reintentar</span>
          <img
            src="./assets/refresh.png"
            alt="Nueva Imagen"
            className="w-[24px]"
          />
        </div>
      </button>
    </>
  );
};
export default BtnReload;
