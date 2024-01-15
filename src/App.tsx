import { useEffect, useState } from "react";
import "./App.css";
import NewImagen from "./components/newImagen";
import Spinner from "./components/spinner";
import Threshold from "./components/threshold";
import UploadFile from "./components/uploadFile";
import ViewImage from "./components/viewImage";
import { predictImage } from "./services/predictImage";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [errorService, setErrorService] = useState(false);
  const [service, setService] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [threshold, setThreshold] = useState(7);
  const [boxes, setBoxes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (file !== null) {
      setSpinner(true);
      predictImage({ file, threshold })
        .then((data) => {
          setBoxes(data.boxes);
          setLabels(data.labels);
          setScores(data.scores);
          console.log("Archivo subido con éxito:", data);
          setService(true);
          setTimeout(() => {
            setSpinner(false);
          }, 500);
        })
        .catch((error) => {
          setService(false);
          setErrorService(true);
          setTimeout(() => {
            setErrorService(false);
          }, 3000);
          setTimeout(() => {
            setSpinner(false);
          }, 500);
          console.error("Error al subir el archivo:", error);
        });
    }
  }, [file, threshold]);

  const handleThreshold = (threshold: number) => {
    setThreshold(threshold);
  };

  const handleFile = (uploadedFile: File | null) => {
    setFile(uploadedFile);
  };
  return (
    <>
      {spinner && <Spinner />}
      {!service ? (
        <div id="uploadFile" className="flex flex-col gap-4">
          <UploadFile onFileUpload={handleFile} />
          <Threshold onThreshold={handleThreshold} />
          {errorService && (
            <div className="text-white font-bold text-[15px] bg-red-600 border p-4 rounded-md transition  ease-in-out duration-300">
              <p>Upps!!! ha ocurrido un errror en el servicio</p>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="flex justify-start pb-3 ">
            <NewImagen />
          </div>
          <ViewImage
            boxes={boxes}
            labels={labels}
            scores={scores}
            image={file}
            threshold={threshold / 10}
          />
        </div>
      )}
    </>
  );
}

export default App;
