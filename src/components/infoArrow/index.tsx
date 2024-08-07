import React from "react";

type infoArrowProps = {
  info: string;
  side?: "left" | "right";
};

/**
 * InfoArrow component renders an arrow like shape with information text.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.info - The text to display inside the arrow.
 * @param {string} [props.side="left"] - The pointing side of the arrow. Can be "left" or "right".
 * @returns {JSX.Element} - The InfoArrow component.
 */
const InfoArrow = ({ side = "left", info }: infoArrowProps): JSX.Element => {

  const spanSideClassName = side === "left" ? "clip-shape-left pl-10 " : " clip-shape-right pr-10";
  const spanClassName = `flex items-center bg-white lg:max-w-32 max-h-32 font-bold text-xl  shadow-lg flex-1 shadow-cyan-500/50 ${spanSideClassName}`;

  const textSideClassName = side === "left" ? "text-right" : "text-left";
  const textClassName = `mx-4 p-2 text-center ${textSideClassName}`;
  return (
    <span className={spanClassName}>
      <p className={textClassName}>{info}</p>
    </span>
  );
};

export default InfoArrow;
