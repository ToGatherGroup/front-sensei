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

  const sideClassName = side === "left" ? "clip-shape-left pl-10" : "clip-shape-right pr-10";
  const className = `flex items-center shrink-1 bg-white lg:w-32 max-h-32 ${sideClassName}`;

  return (
    <span className={className}>
      <p className="m-8 text-center">{info}</p>
    </span>
  );
};

export default InfoArrow;
