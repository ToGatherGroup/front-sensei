"use client";
import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import "./imageCropper.css";

interface ImageCropperProps {
  imageSrc: string;
  onCropDone: (croppedArea: Area) => void;
  onCropCancel: () => void;
  aspectRatio: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCropDone,
  onCropCancel,
  aspectRatio,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <>
      <div>
        <div className="relative w-full h-96 bg-gray-800">
          <Cropper
            image={imageSrc}
            classes={{ mediaClassName: "min-w-0 min-h-0" }}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <button
            className="bg-black text-white border border-white py-2 px-4 rounded"
            onClick={onCropCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-black text-white border border-white py-2 px-4 rounded"
            onClick={() => {
              if (croppedArea) {
                onCropDone(croppedArea);
              }
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
