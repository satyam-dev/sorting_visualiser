import * as React from "react";
import { BarTypesEnum } from "../../enums/barTypeEnum";
import { BarColorEnum } from "../../enums/barColorEnum";

export interface BarProps {
  color: BarColorEnum | string; //hex color
  types: BarTypesEnum; //design type
  height: string;
  width: string;
  value: number;
  showValue: boolean;
}

const Bar: React.SFC<BarProps> = ({
  width,
  color,
  height,
  value,
  showValue,
}) => {
  return (
    <div
      className="ml-1 ml-2 d-flex justify-content-center"
      style={{
        width: width,
        background: color,
        height: height,
        color: "white ",
      }}
    >
      {showValue && value}
    </div>
  );
};

export default Bar;
