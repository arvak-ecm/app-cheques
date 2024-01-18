import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Threshold from "../components/threshold";
import Toast from "../components/toast";
import UploadFile from "../components/uploadFile";

interface homeProps {}

const Home: FC<homeProps> = () => {
  const navigate = useNavigate();
  const handleFile = (uploadedFile: File | null) => {
    navigate("/predict", { state: { uploadedFile } });
  };
  return (
    <>
      <div id="uploadFile" className="flex flex-col gap-4">
        <UploadFile onFileUpload={handleFile} />
        <Threshold />
        <Toast
          msg="Upps!!! ha ocurrido un errror en el servicio"
          trigger={false}
        />
      </div>
    </>
  );
};

export default Home;
