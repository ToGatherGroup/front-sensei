import React from "react";

type infoArrowProps = {
  info?: string;
  side?: "left" | "right";
  className?: string;
};

/**
 * InfoArrow component renders an arrow like shape with information text.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.info - The text to display inside the arrow.
 * @param {string} [props.side="left"] - The pointing side of the arrow. Can be "left" or "right".
 * @param {string} [props.className] - The class name to apply to the span element.
 * @returns {JSX.Element} - The InfoArrow component.
 */
const InfoArrow = ({ side = "left", info, className }: infoArrowProps): JSX.Element => {
  const spanSideClassName = side === "left" ? "clip-shape-left pl-10 " : " clip-shape-right pr-10";
  const cssTreatment = side === "left" ? "left-0" : "right-0";
  const validateInfo =  (Number.isNaN(Number(info))) ? "" : "text-xl";
  const spanClassName = `flex items-center bg-white min-w-24 lg:max-w-32 max-w-28 max-h-32 font-bold shadow-lg flex-1 ${spanSideClassName} ${cssTreatment} ${validateInfo} ${className ?? ""}`;

  


  const textSideClassName = side === "left" ? "text-right  text-center" : "text-left";
  const textClassName = ` p-2 m-0 text-center ${textSideClassName}`;
  
  return (
    <span className={spanClassName}>
      <p className={textClassName}>{info}</p>
    </span>
  );
};

export default InfoArrow;

