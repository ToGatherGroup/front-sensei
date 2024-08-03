import Image from "next/image";
import React from "react";

type Props = {
  color: "white" | "black" | "wine";
  size: number;
};

const Logo = ({ color = "white", size }: Props) => {
  const src = {
    white: "/svg/logo-sensei-white.svg",
    black: "/svg/logo-sensei-black.svg",
    wine: "/svg/logo-sensei-wine.svg",
  };

  return <Image src={src[color]} width={size} height={size} alt="logo" />;
};

export default Logo;
