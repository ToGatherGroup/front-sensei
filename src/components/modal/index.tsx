import Button from "../ui/button";

type ModalProps = {
  title: string;
  text?: string;
  closeModalFunction: () => void;
  confirmButtonFunction?: () => void;
  cancelButtonFunction?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCloseIcon?: boolean;
};

const Modal = ({
  title,
  text,
  closeModalFunction,
  confirmButtonFunction,
  cancelButtonFunction,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  showCloseIcon = true,
}: ModalProps) => {
  return (
    <div className="absolute min-h-screen w-full flex items-center justify-center bg-black/40 px-3.5">
      <div
        onClick={closeModalFunction}
        className="z-0 absolute min-h-screen w-full flex items-center justify-center bg-black/40 px-3.5"
      ></div>

      <div className="m-2 absolute z-1 lg:max-w-[650px] md:max-w-[500px] sm:max-w-[350px] max-w-[350px] flex items-center justify-center bg-white rounded-md xl:p-10 lg:p-8 md:p-5 p-5">
        <div>
          {showCloseIcon && (
            <button
              onClick={closeModalFunction}
              className="absolute block xl:top-[7px] lg:top-[6px] md:top-[5px] top-[5px] xl:right-[10px] lg:right-[9px] md:right-[8px] right-[8px] text-winePattern font-bold xl:text-sm lg:text-xs md:text-xs text-xs p-1"
            >
              X
            </button>
          )}

          <h3 className="xl:text-2xl lg:text-xl md:text-lg text-lg text-winePattern font-bold text-center uppercase">
            {title}
          </h3>

          {text && (
            <p className="text-left xl:text-base lg:text-sm md:text-xs text-xs xl:mt-4 lg:mt-3 md:mt-2 mt-2">
              {text}
            </p>
          )}

          <div className="flex flex-1 flex-col-reverse mt-12 gap-y-6 gap-x-10 md:flex-row justify-center items-center">
            {cancelButtonFunction && (
              <Button
                text={cancelButtonText}
                onClick={cancelButtonFunction}
                type={"button"}
              />
            )}

            {confirmButtonFunction && (
              <Button
                text={confirmButtonText}
                onClick={confirmButtonFunction}
                type={"button"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
