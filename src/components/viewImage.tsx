import { FC, useEffect, useRef } from "react";

interface viewImageProps {
  boxes: number[][];
  labels: string[];
  scores: number[];
  threshold: number;
  image: File;
}
const ViewImage: FC<viewImageProps> = ({
  boxes,
  labels,
  scores,
  image,
  threshold,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getRandomRgbColor = (a = 1) => {
    const red = Math.floor(Math.random() * 256); // Número aleatorio entre 0 y 255 para rojo
    const green = Math.floor(Math.random() * 256); // Número aleatorio entre 0 y 255 para verde
    const blue = Math.floor(Math.random() * 256); // Número aleatorio entre 0 y 255 para azul
    return `rgba(${red}, ${green}, ${blue}, ${a})`;
  };
  useEffect(() => {
    // Asegúrate de que el canvas esté montado
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
            if (scores[i] >= threshold) {
              const label = labels[i];
              const score = scores[i].toFixed(2);
              const [xmin, ymin, xmax, ymax] = boxes[i];
              if (ctx) {
                const color = getRandomRgbColor();
                ctx.strokeStyle = color;
                ctx.lineWidth = 4;
                ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
                ctx.fillStyle = color.replace("1)", "0.3)");
                ctx.fillRect(xmin, ymin, xmax - xmin, ymax - ymin);

                ctx.fillStyle = "black"; // Color del texto
                ctx.font = "16px Arial"; // Tamaño y fuente del texto
                ctx.fillText(`${label}: ${score}`, xmin, ymin - 5);
              }
            }
          }
        };
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(image);
    }
  }, [boxes, labels, scores, image, threshold]);

  return (
    <>
      <div className="container max-w-4xl flex flex-col gap-5">
        <h1 className="p-2 text-[30px] border rounded-xl bg-gray-100 shadow-xl  ">
          Resultado
        </h1>
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
