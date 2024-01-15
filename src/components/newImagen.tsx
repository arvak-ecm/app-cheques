import { FC } from "react";
import "./newImagen.css";
interface newImagenProps {}

const NewImagen: FC<newImagenProps> = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <button
        className="btn flex flex-row gap-2 items-center"
        onClick={reloadPage}
      >
        <img
          src="./assets/photo-plus.png"
          alt="Nueva Imagen"
          className="w-[24px]"
        />
        Nueva Imagen
      </button>
    </>
  );
};
export default NewImagen;
