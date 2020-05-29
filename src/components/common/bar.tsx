import * as React from "react";
import { BarTypesEnum } from "../../enums/barTypeEnum";

export interface BarProps {
  color: string; //hex color
  types: BarTypesEnum; //design type
  height: string;
  width: string;
  value: number;
}

const Bar: React.SFC<BarProps> = ({ width, color, height, value }) => {
  return (
    <div
      className="ml-1 ml-2"
      style={{
        width: width,
        background: color,
        height: height,
      }}
    ></div>
  );
};

export default Bar;
