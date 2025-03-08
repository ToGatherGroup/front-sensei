import React from "react";
import SvgBack from "../../../public/svg/injuries/SvgBack";
import SvgFront from "../../../public/svg/injuries/SvgFront";

type InjuriesProps = {
  injuries: string[];
  clickable?: boolean;
  type: "back" | "front";
  width?: string;
  height?: string;
  viewBoxSecondValue?: string;
  viewBoxValue?: string;
  onClick?: (clickedBodyPart: string) => any;
};

const Injuries = ({
  injuries,
  type,
  width,
  height,
  viewBoxValue,
  onClick,
}: InjuriesProps) => {
  return (
    <div>
      {type === "back" ? (
        <SvgBack
          injuries={injuries}
          width={width}
          height={height}
          viewBoxValue={viewBoxValue}
          onClick={onClick}
        />
      ) : (
        <SvgFront
          injuries={injuries}
          width={width}
          height={height}
          viewBoxValue={viewBoxValue}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Injuries;
