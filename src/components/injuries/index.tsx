import React from "react";
import Back from "../../../public/svg/injuries/Back";
import Front from "../../../public/svg/injuries/Front";

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
        <Back
          injuries={injuries}
          width={width}
          height={height}
          viewBoxValue={viewBoxValue}
          onClick={onClick}
        />
      ) : (
        <Front
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
