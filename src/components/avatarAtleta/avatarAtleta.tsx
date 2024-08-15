"use client";

import Image from "next/image";
import Losango from "../losango/losango";

type Props = {
  name: string;
  photoUrl?: string;
  className?: string | undefined;
  losangoClassName?: string | undefined;
  nameClassName?: string | undefined;
  onClick?: () => void;
};
const AvatarAtleta = ({
  name,
  photoUrl,
  className,
  losangoClassName,
  nameClassName,
  onClick,
}: Props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center relative pt-3 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="outline outline-2 outline-[#d4d4d4] w-48 h-48 bg-winePattern border-2 border-solid border-[#350202] rounded-full translate-y-5"></div>
      <Image
        src={photoUrl ?? "default_image_url"}
        alt={`Foto de ${name}`}
        className="absolute z-10 bottom-12 h-auto w-56 overflow-scroll"
        width={224}
        height={224}
      />
      <Losango
        className={`relative z-20 bg-winePattern outline outline-4 outline-[#d4d4d4] h-[3rem] w-[15.5rem] overflow-hidden ${losangoClassName}`}
      >
        <p
          className={`px-0.5 bottom-0 left-0 right-0 inline-block m-auto text-center w-full text-lg min-h-[3rem] -translate-y-1 overflow-hidden font-bold text-white ${nameClassName}`}
        >
          {name}
        </p>
      </Losango>
    </div>
  );
};
export default AvatarAtleta;
