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
        src={photoUrl ?? "/avatar_generico.png"}
        alt={`Foto de ${name}`}
        className="absolute z-10 bottom-12 h-auto w-[200px] overflow-scroll"
        width={200}
        height={200}
      />
      <Losango
        className={`relative flex justify-center items-center z-20 bg-winePattern outline outline-4 outline-[#d4d4d4] h-[3.5rem] w-[15.5rem] overflow-hidden ${losangoClassName}`}
      >
        <p
          className={`px-1 inline-block text-center w-full text-lg h-fit overflow-hidden font-bold text-white ${nameClassName}`}
        >
          {name}
        </p>
      </Losango>
    </div>
  );
};
export default AvatarAtleta;
