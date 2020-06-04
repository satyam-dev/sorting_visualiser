import * as React from "react";
export interface ColorInfoProps {
  color?: string;
  text: string;
  imageUrl?: string;
}

const ColorInfo: React.SFC<ColorInfoProps> = (props) => {
  return (
    <div className="d-flex">
      {props.color && (
        <div className="color-box" style={{ background: props.color }}></div>
      )}
      {props.imageUrl && (
        <img
          alt="random colors"
          src={props.imageUrl}
          className="color-box"
          style={{ background: props.color }}
        ></img>
      )}
      <div className="color-info">{props.text}</div>
    </div>
  );
};

export default ColorInfo;
