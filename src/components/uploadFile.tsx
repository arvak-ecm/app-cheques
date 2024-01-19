import { FC, useEffect, useRef, useState } from "react";

interface uploadFileProps {
  onFileUpload: (value: File | null) => void;
}

const UploadFile: FC<uploadFileProps> = ({ onFileUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const fileinputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (image !== null) {
      onFileUpload(image);
    }
  });

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    labelRef.current?.classList.add("drag_bg");
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    labelRef.current?.classList.remove("drag_bg");
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    labelRef.current?.classList.remove("drag_bg");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div className='relative w-[400px] h-[300px]'>
      <div className='absolute top-0 flex justify-center w-full'>
        <div className='left-0 h-[1px] animate-border-width rounded-full  bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
      </div>
        <div className='flex items-center justify-center h-full px-3 py-2 bg-[#040b03] border border-dashed rounded-md'>
      <label
        ref={labelRef}
        className="custum-file-upload"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="icon">
          <img
            alt="icon-upload"
            className="icon-upload"
            src="assets/image-plus.png"
          />
        </div>
        <div >
        <span className='inline-flex animate-background-shine bg-[#f3fff1] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
            Arrastre la imagen o click para cargar
        </span>
        </div>
        <input
          accept="image/jpeg"
          type="file"
          id="file"
          ref={fileinputRef}
          onChange={onFileSelect}
        />
      </label> 
      </div>
    </div>
      
    </>
  );
};

export default UploadFile;
