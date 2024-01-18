import { Outlet } from "react-router-dom";
import "./App.css";
import Spinner from "./components/spinner";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <>
      <AppProvider>
        <Spinner />
        <Outlet />
      </AppProvider>
    </>
  );
}
/*
function App2() {
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
          setService(true);
          setTimeout(() => {
            setSpinner(false);
          }, 500);
        })
        .catch((error) => {
          setService(false);
          setSpinner(false);
          setErrorService(true);
          setTimeout(() => {
            setErrorService(false);
          }, 3000);

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
      <Spinner trigger={spinner} />
      {!service ? (
        <div id="uploadFile" className="flex flex-col gap-4">
          <UploadFile onFileUpload={handleFile} />
          <Threshold onThreshold={handleThreshold} />
          <Toast
            msg="Upps!!! ha ocurrido un errror en el servicio"
            trigger={errorService}
          />
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
}*/

export default App;
