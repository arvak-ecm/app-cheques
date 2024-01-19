import { FC, useEffect, useRef, useState } from "react";
import getRandomRgbColor from "../utils/utils";
import Modal from 'react-modal';

interface ViewImageProps {
  boxes: number[][];
  labels: string[];
  scores: number[];
  threshold: number;
  image: File | null;
}

interface BoxContent {
  label: string;
  score: number;
  image: string;
}

const ViewImage: FC<ViewImageProps> = ({ boxes, labels, scores, image, threshold }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBoxContent, setSelectedBoxContent] = useState<BoxContent | null>(null);

  // Función para dibujar cada caja
  const drawBox = (ctx: CanvasRenderingContext2D, box: number[], color: string): void => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(box[0], box[1], box[2] - box[0], box[3] - box[1]);
  };
  useEffect(() => {
    if (canvasRef.current && image) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        return;
      }
  
      canvasRef.current.width = 1236;
      canvasRef.current.height = 540;
  
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        
        imageRef.current = img;
        
         // Asignar la imagen cargada a imageRef
        
        for (let i = 0; i < scores.length; i++) {
          if (scores[i] >= threshold / 10) {
            const label = labels[i];
            const score = scores[i].toFixed(2);
            const box = boxes[i];

            
            const color = getRandomRgbColor();
            
            drawBox(ctx, box, color);
            
            ctx.fillStyle = color.replace("1)", "0.3)");
            ctx.fillRect(box[0], box[1], box[2] - box[0], box[3] - box[1]);
  
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(`${label}: ${score}`, box[0], box[1] - 5);
          }
        }
      };
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(image);
    }
  }, [boxes, labels, scores, image, threshold]);
  

        // Aserción de tipo para asegurar que e.target y e.target.result no son null

  const handleClick = (event: MouseEvent): void => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      const clickedBoxIndex = boxes.findIndex(box => 
        x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3]
      );

      if (clickedBoxIndex !== -1) {
        const boxImage = extractBoxImage(boxes[clickedBoxIndex]);
        setSelectedBoxContent({ 
          label: labels[clickedBoxIndex], 
          score: scores[clickedBoxIndex],
          image: boxImage 
        });
        setIsModalOpen(true);
      }
    }
  };

  const extractBoxImage = (box: number[]): string => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    const width = box[2] - box[0];
    const height = box[3] - box[1];
    tempCanvas.width = width;
    tempCanvas.height = height;
  
    if (imageRef.current.complete && imageRef.current.naturalWidth !== 0) {
      ctx?.drawImage(imageRef.current, box[0], box[1], width, height, 0, 0, width, height);
      return tempCanvas.toDataURL();
    }
  
    return ''; // Retornar cadena vacía si la imagen no está cargada
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick as EventListener);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('click', handleClick as EventListener);
      }
    };
  }, [boxes]);







  return (
    <>
      <div className="container flex flex-col max-w-4xl gap-5">
        <canvas
          className="w-full border border-gray-800 rounded-md"
          ref={canvasRef}
        ></canvas>
         <Modal closeTimeoutMS={100} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
   
 
        >
        {selectedBoxContent && (
        <div className="flex flex-col items-center justify-center gap-5">
          <img className="max-h-[300px]" src={selectedBoxContent.image} alt={selectedBoxContent.label} />
          <div className="flex flex-row items-center justify-center gap-5">
          
          <h2 className='p-2 m-4 inline-flex h-full  animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl'>{selectedBoxContent.label}</h2>
          <p className='p-2 m-4 inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl'>{selectedBoxContent.score.toFixed(2)}</p>
        
          </div>
        <div className="absolute bottom-2 right-2">
        <button className="inline-flex h-12 animate-background-shine2 items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#640000,45%,#ff8282,55%,#640000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={() => setIsModalOpen(false)}>Cerrar</button>
        </div>
          
          </div>
        )}
      </Modal>
        <div className="flex gap-4 flex-col-2">
      <div className=' w-full p-5 bg-[#040b03] border rounded-lg border-green-900'>
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
          <div className="w-full p-5 bg-[#040b03] border rounded-lg border-green-900">
            <h2 className="font-bold">Textos</h2>
            <ul className="mt-10 text-4xl font-bold text-center">
              <li>Coming Soon!!!!!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};  



export default ViewImage;
