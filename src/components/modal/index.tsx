type ModalProps = {
    title: string;
    text?: string;
    button?: boolean;
    buttonText?: string;
    buttonClick?: () => void
    closeModal: () => void
}

const Modal = ({ title, text, button, buttonText, buttonClick, closeModal }: ModalProps) => {
    return (
        <div className="relative xl:max-w-[800px] lg:max-w-[650px] md:max-w-[500px] sm:max-w-[350px] max-w-[350px] w-full flex items-center justify-center bg-white rounded-md xl:p-10 lg:p-8 md:p-5 p-5">
            <div>
                <h3 className="xl:text-3xl lg:text-xl md:text-lg text-lg text-red-600 font-bold text-center uppercase">{title}</h3>
                {text && (
                    <p className="text-left xl:text-base lg:text-sm md:text-xs text-xs xl:mt-4 lg:mt-3 md:mt-2 mt-2">{text}</p>
                )}
                {button && (
                    <button onClick={buttonClick} className="block uppercase max-w-[fit-content] xl:rounded-lg lg:rounded-md md:rounded-md rounded-md bg-red-600 mx-auto xl:mt-5 lg:mt-4 md:mt-3 mt-3 xl:p-4 lg:p-3 md:p-2 p-2 text-center text-white font-bold xl:text-base lg:text-sm md:text-sm text-sm">{buttonText}</button>
                )}
                <button onClick={closeModal} className="absolute block xl:top-[7px] lg:top-[6px] md:top-[5px] top-[5px] xl:right-[10px] lg:right-[9px] md:right-[8px] right-[8px] text-red-600 font-bold xl:text-sm lg:text-xs md:text-xs text-xs p-1">X</button>
            </div>
        </div>
    )
}

export default Modal;
