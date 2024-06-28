"use client";
import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import "./imageCropper.css";

interface ImageCropperProps {
  imageSrc: string;
  onCropDone: (croppedArea: Area) => void;
  onCropCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCropDone,
  onCropCancel,
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
        <div className="relative w-full h-72 bg-gray-800">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={2 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-between">
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
