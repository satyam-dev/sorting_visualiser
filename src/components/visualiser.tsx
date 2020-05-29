import * as React from "react";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
import Header from "./header";
import { AlgoEnum } from "../enums/algoEnums";
import { bubbleSort } from "../utils/algorithms";
export interface VisualiserProps {}

export interface VisualiserState {
  arr: number[];
  selectedAlgo: AlgoEnum;
  algorithms: AlgoEnum[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    arr: [],
    selectedAlgo: AlgoEnum.BubbleSort,
    algorithms: [
      AlgoEnum.BubbleSort,
      AlgoEnum.InsertionSort,
      AlgoEnum.MergeSort,
      AlgoEnum.QuickSort,
      AlgoEnum.SelectionSort,
    ],
  };
  componentDidMount() {
    const randomNum: number[] = [];
    for (let i = 1; i <= 50; i++) {
      randomNum.push(_.random(1, 50));
    }
    this.setState({ arr: randomNum });
  }
  render() {
    const { algorithms, selectedAlgo } = this.state;
    return (
      <React.Fragment>
        <Header
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onChange={this.handleOnChange}
          onActivate={() => this.sort()}
        />
        <div
          className="container d-flex flex-row pt-1"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {this.state.arr.map((a) => (
            <Bar
              color="linear-gradient(to bottom, #2193b0, #6dd5ed)"
              height={this.getBarHeight(a)}
              width={this.getBarWidth(a)}
              types={BarTypesEnum.CrossLine}
              value={a}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
  getBarHeight(value: number): string {
    const largest = _.max(this.state.arr) || value;
    return `${(value / largest) * 100}%`;
  }
  getBarWidth(value: number) {
    return `${100 / this.state.arr.length}%`;
  }
  handleOnChange = (algo: AlgoEnum) => {
    this.setState({ selectedAlgo: algo });
  };

  sort() {
    switch (this.state.selectedAlgo) {
      case AlgoEnum.BubbleSort:
        bubbleSort(this.state.arr).subscribe((res) => {
          this.setState({ arr: res });
        });
        return;
      default:
        return;
    }
  }
}

export default Visualiser;
