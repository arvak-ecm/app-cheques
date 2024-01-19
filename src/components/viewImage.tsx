import { FC, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import responsePredictProps from "../types/responsePredictProps";
import getRandomRgbColor from "../utils/utils";

interface modalProps {
  image: string;
  label: string;
  score: string;
  width: number;
  height: number;
}

interface viewImageProps {
  service: responsePredictProps;
  threshold: number;
  image: File | null;
}
const ViewImage: FC<viewImageProps> = ({
  service: { boxes, labels, scores, image_width, image_height },
  image,
  threshold,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image(1236, 540));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState({} as modalProps);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const drawBox = (
    ctx: CanvasRenderingContext2D,
    box: number[],
    label: string,
    score: string
  ) => {
    const color = getRandomRgbColor(0.6);
    const [xmin, ymin, xmax, ymax] = box;
    ctx.lineWidth = 3;
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
    ctx.strokeStyle = color;
    ctx.fillStyle = color.replace("0.6", "0.3");
    ctx.fillRect(xmin, ymin, xmax - xmin, ymax - ymin);

    ctx.fillStyle = "black"; // Color del texto
    ctx.font = "16px Arial"; // Tamaño y fuente del texto
    ctx.fillText(`${label}: ${score}`, xmin, ymin - 5);
  };

  const getImageBox = (box: number[]) => {
    const [xmin, ymin, xmax, ymax] = box;
    const canvasImage = imageRef.current!;
    canvasImage.width = image_width;
    canvasImage.height = image_height;
    const canvas = document.createElement("canvas");
    const width = xmax - xmin;
    const height = ymax - ymin;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(canvasImage, xmin, ymin, width, height, 0, 0, width, height);
    return canvas.toDataURL();
  };

  const handleCanvasClick = (event: { clientX: number; clientY: number }) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const boxId = getBoxIndex(x, y);
    if (boxId !== -1) {
      const image = getImageBox(boxes[boxId]);
      setDataModal({
        image,
        label: labels[boxId],
        score: scores[boxId].toFixed(2),
        width: boxes[boxId][2] - boxes[boxId][0],
        height: boxes[boxId][3] - boxes[boxId][1],
      });
      setModalIsOpen(true);
    }
  };

  const getBoxIndex = (x: number, y: number) => {
    return boxes?.findIndex(
      (box) => x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3]
    );
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = image_width;
      canvasRef.current.height = image_height;
      canvasRef.current!.addEventListener("click", handleCanvasClick);
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          imageRef.current = img;
          ctx!.drawImage(
            img,
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          for (let i = 0; i < scores?.length; i++) {
            if (scores[i] >= threshold / 10) {
              const label = labels[i];
              const score = scores[i].toFixed(2);
              if (ctx) {
                drawBox(ctx, boxes[i], label, score);
              }
            }
          }
        };
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(image!);
    }
  }, [boxes, image, labels, scores, threshold]);

  return (
    <>
      <Modal isOpen={modalIsOpen}>
        <div className="flex flex-row justify-between px-4 ">
          <h2 className="text-center w-full">Detalle</h2>
          <button onClick={closeModal}>Cerrar</button>
        </div>

        <div className="w-full px-4 flex flex-col gap-5">
          <div>
            <h2>etiqueta: {dataModal.label}</h2>
            <h2>score: {dataModal.score}</h2>
            <h2>valor: Coming Soon!!!!!</h2>
          </div>

          <img
            src={dataModal.image}
            width={dataModal.width - (dataModal.width * 20) / 100}
            alt="image"
          />
        </div>
      </Modal>
      <div className="container max-w-4xl flex flex-col gap-5">
        <canvas
          className="w-full border rounded-md border-gray-800"
          ref={canvasRef}
        ></canvas>
        <div className="flex flex-col-2 gap-4">
          <div className="w-full border border-cyan-600 p-5 rounded-lg bg-gray-100">
            <h2 className="font-bold">Scores</h2>
            <ul className="text-left">
              {labels?.map((label, index) => {
                const score = scores[index];
                return (
                  <li key={index}>
                    {label}: {score.toFixed(2)}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full border border-cyan-600 p-5 rounded-lg bg-gray-100">
            <h2 className="font-bold">Textos</h2>
            <ul className="text-center mt-10 text-4xl font-bold">
              <li>Coming Soon!!!!!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewImage;
