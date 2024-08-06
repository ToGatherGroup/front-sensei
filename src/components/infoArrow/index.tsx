import React from "react";

type infoArrowProps = {
  info: string;
  side?: "left" | "right";
};

const InfoArrow = ({ side, info }: infoArrowProps) => {

  const sideClassName = side === "left" ? "clip-shape-left pl-10" : "clip-shape-right pr-10";
  const className = `flex items-center shrink-1 bg-white lg:w-32 max-h-32 ${sideClassName}`

    return (
      <span className={className}>
      <p className="m-8 text-center">{info}</p>
    </span>
    );
};

export default InfoArrow;
