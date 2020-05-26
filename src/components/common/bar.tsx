import * as React from "react";
import { BarTypesEnum } from "../../enums/barTypeEnum";

export interface BarProps {
  color: string; //hex color
  types: BarTypesEnum; //design type
}

const Bar: React.SFC<BarProps> = () => {
  return <div>Bar works!</div>;
};

export default Bar;
