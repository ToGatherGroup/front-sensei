import React from "react";
import Back from "../../../public/svg/injuries/Back";
import Front from "../../../public/svg/injuries/Front";

type InjuriesProps = {
  injuries: string[];
  type: "back" | "front";
  width?: string;
  height?: string;
  viewBoxSecondValue?: string;
  viewBoxValue?: string;
};

const Injuries = ({
  injuries,
  type,
  width,
  height,
  viewBoxValue,
}: InjuriesProps) => {
  return (
    <div>
      {type === "back" ? (
        <Back
          injuries={injuries}
          width={width}
          height={height}
          viewBoxValue={viewBoxValue}
        />
      ) : (
        <Front
          injuries={injuries}
          width={width}
          height={height}
          viewBoxValue={viewBoxValue}
        />
      )}
    </div>
  );
};

export default Injuries;
