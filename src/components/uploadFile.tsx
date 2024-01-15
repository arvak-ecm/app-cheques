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
            src="assets/photo-up.png"
          />
        </div>
        <div className="text">
          <span>Arrastre la imagen o Click para cargar</span>
        </div>
        <input
          accept="image/jpeg"
          type="file"
          id="file"
          ref={fileinputRef}
          onChange={onFileSelect}
        />
      </label>
    </>
  );
};

export default UploadFile;
