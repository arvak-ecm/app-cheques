import { FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BtnNew from "../components/buttons/btnNew";
import BtnReload from "../components/buttons/btnReload";
import Toast from "../components/toast";
import ViewImage from "../components/viewImage";
import { AppContext } from "../context/appContext";
import { predictImage } from "../services/predictImage";
interface predictProps {}
const Predict: FC<predictProps> = () => {
  const [errorService, setErrorService] = useState(false);
  const [boxes, setBoxes] = useState<[][]>([]);
  const [labels, setLabels] = useState<[]>([]);
  const [scores, setScores] = useState<[]>([]);
  const { appData, updateAppData } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    const file = location.state.uploadedFile;
    const threshold = appData.threshold;
    const fetchPredict = async ({
      file,
      threshold,
    }: {
      file: File;
      threshold: number;
    }) => {
      try {
        updateAppData({ showSpinner: true });
        const response = await predictImage({ file, threshold });
        const { boxes, labels, scores } = response.data;
        setBoxes(boxes);
        setLabels(labels);
        setScores(scores);
        updateAppData({ showSpinner: false });
      } catch (error) {
        setErrorService(true);
        updateAppData({ showSpinner: false });
      }
    };
    fetchPredict({ file, threshold });
  }, [location, appData.threshold]);
  return (
    <>
      <div className="container flex flex-col justify-start">
        <div className="flex flex-row justify-between pb-2">
          <BtnNew />
          <BtnReload />
        </div>

        <ViewImage
          boxes={boxes}
          labels={labels}
          scores={scores}
          image={location.state.uploadedFile}
          threshold={appData.threshold}
        />
      </div>
      {errorService && (
        <Toast
          msg="Upps!!! ha ocurrido un errror en el servicio"
          trigger={errorService}
        />
      )}
    </>
  );
};
export default Predict;
