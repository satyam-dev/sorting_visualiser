import * as React from "react";
import { BubbleSort } from "../algorithms/bubbleSort";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
export interface VisualiserProps {}

export interface VisualiserState {
  arr: number[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    arr: [],
  };
  componentDidMount() {
    const randomNum: number[] = [];
    for (let i = 1; i <= 50; i++) {
      randomNum.push(_.random(1, 50));
    }
    this.setState({ arr: randomNum });
  }
  render() {
    let sorted = new BubbleSort(this.state.arr);
    sorted.bubbleSort();
    console.log("Sorted: ", this.state.arr);
    return (
      <div
        className="d-flex flex-row"
        style={{ height: "calc(100vh - 100px)", background: "green" }}
      >
        {this.state.arr.map((a) => (
          <Bar
            color="red"
            weight={this.getWeight(a)}
            types={BarTypesEnum.CrossLine}
          />
        ))}
      </div>
    );
  }
  getWeight(num: number): number {
    const largest = _.max(this.state.arr) || num;
    console.log("largest: ", largest);
    return (num / largest) * 100;
  }
}

export default Visualiser;
