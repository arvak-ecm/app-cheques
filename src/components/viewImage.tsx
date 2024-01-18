import { FC, useEffect, useRef } from "react";
import getRandomRgbColor from "../utils/utils";
interface viewImageProps {
  boxes: number[][];
  labels: string[];
  scores: number[];
  threshold: number;
  image: File | null;
}
const ViewImage: FC<viewImageProps> = ({
  boxes,
  labels,
  scores,
  image,
  threshold,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawBox = (ctx: CanvasRenderingContext2D, box: number[]) => {
    const color = getRandomRgbColor();
    const [xmin, ymin, xmax, ymax] = box;
    ctx.lineWidth = 4;
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
    ctx.fillStyle = color.replace("1)", "0.3)");
    ctx.fillRect(xmin, ymin, xmax - xmin, ymax - ymin);
  };
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = 1236;
      canvasRef.current.height = 540;

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          ctx!.drawImage(
            img,
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          for (let i = 0; i < scores.length; i++) {
            if (scores[i] >= threshold / 10) {
              const label = labels[i];
              const score = scores[i].toFixed(2);
              const [xmin, ymin] = boxes[i];
              if (ctx) {
                drawBox(ctx, boxes[i]);

                ctx.fillStyle = "black"; // Color del texto
                ctx.font = "16px Arial"; // Tamaño y fuente del texto
                ctx.fillText(`${label}: ${score}`, xmin, ymin - 5);
              }
            }
          }
        };
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(image!);
    }
  }, [boxes, labels, scores, image, threshold]);

  return (
    <>
      <div className="container max-w-4xl flex flex-col gap-5">
        <canvas
          className="w-full border rounded-md border-gray-800"
          ref={canvasRef}
        ></canvas>
        <div className="flex flex-col-2 gap-4">
          <div className="w-full border border-cyan-600 p-5 rounded-lg bg-gray-100">
            <h2 className="font-bold">Scores</h2>
            <ul className="text-left">
              {labels.map((label, index) => {
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
