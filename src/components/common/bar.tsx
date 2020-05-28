import * as React from "react";
import { BarTypesEnum } from "../../enums/barTypeEnum";

export interface BarProps {
  color: string; //hex color
  types: BarTypesEnum; //design type
  weight: number;
}

const Bar: React.SFC<BarProps> = (props) => {
  return (
    <div
      className="ml-1 ml-2"
      style={{
        width: "20px",
        backgroundColor: props.color,
        height: `${props.weight}%`,
      }}
    ></div>
  );
};

export default Bar;
