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
      <button className="btn w-[226px] mb-4" onClick={reloadPage}>
        <div className="flex flex-row gap-2 items-center">
          <img
            src="./assets/photo-plus.png"
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
