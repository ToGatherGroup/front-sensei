import React, { useEffect } from "react";
import Button from "../ui/button";

interface ModalProps {
  title: string;
  text?: string;
  closeModalFunction: () => void;
  confirmButtonFunction?: () => void;
  cancelButtonFunction?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCloseIcon?: boolean;
  imageSrc?: string;
  children?: React.ReactNode;
}

const Modal = ({
  title,
  text,
  closeModalFunction,
  confirmButtonFunction,
  cancelButtonFunction,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  showCloseIcon = true,
  children,
  imageSrc,
}: ModalProps) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModalFunction();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModalFunction]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeModalFunction}>
      <div className="relative bg-white rounded-md xl:p-10 lg:p-8 md:p-5 p-5 shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        
        {imageSrc && (
          <img src={imageSrc} alt="Ícone" className="absolute top-3 left-3 w-8 h-8" />
        )}

        {showCloseIcon && (
          <button
            onClick={closeModalFunction}
            className="absolute top-3 right-3 text-winePattern font-bold text-xl"
          >
            X
          </button>
        )}

        <h3 className="text-2xl text-winePattern font-bold text-center uppercase">{title}</h3>

        {text && <p className="text-left text-base mt-4">{text}</p>}

        <div className="mt-4">{children}</div>

        <div className="flex flex-col-reverse mt-6 gap-y-4 md:flex-row justify-center items-center">
          {cancelButtonFunction && (
            <Button text={cancelButtonText} onClick={cancelButtonFunction} type="button" />
          )}
          {confirmButtonFunction && (
            <Button text={confirmButtonText} onClick={confirmButtonFunction} type="button" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
