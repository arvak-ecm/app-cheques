import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./button.css";
interface props {}

const BtnNew: FC<props> = () => {
  const navigate = useNavigate();
  const reloadPage = () => {
    navigate("/");
  };
  return (
    <>
      <button className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-green-800 bg-[linear-gradient(110deg,#040b03,45%,#234926,55%,#040b03)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={reloadPage}>
        <div className="flex flex-row items-center gap-2">
          <img
            src="./assets/image-plus.png"
            alt="Nueva Imagen"
            className="w-[24px]"
          />
          <span>Nueva Imagen</span>
        </div>
      </button>
    </>
  );
};
export default BtnNew;
