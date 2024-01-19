import { FC } from "react";
import "./button.css";
interface props {}

const BtnReload: FC<props> = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <button className="inline-flex h-12 animate-background-shine2 items-center justify-center rounded-md border border-green-800 bg-[linear-gradient(110deg,#040b03,45%,#234926,55%,#040b03)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={reloadPage}>
        <div className="flex flex-row items-center gap-2">
          <span>Reintentar</span>
          <img
            src="./assets/refresh-ccw.png"
            alt="Nueva Imagen"
            className="w-[24px]"
          />
        </div>
      </button>
    </>
  );
};
export default BtnReload;
