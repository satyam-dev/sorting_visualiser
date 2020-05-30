import * as React from "react";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
import Header from "./header";
import { AlgoEnum } from "../enums/algoEnums";
import { bubbleSort } from "../utils/algorithms";
import { generateRandomArray } from "../utils/utils";
import { BarColorEnum } from "../enums/barColorEnum";
export interface VisualiserProps {}

export interface VisualiserState {
  arr: number[];
  selectedAlgo: AlgoEnum;
  algorithms: AlgoEnum[];
  swapElements: number[];
  sorted: number[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    arr: generateRandomArray({ from: 5, to: 99 }, 25),
    selectedAlgo: AlgoEnum.BubbleSort,
    algorithms: [
      AlgoEnum.BubbleSort,
      AlgoEnum.InsertionSort,
      AlgoEnum.MergeSort,
      AlgoEnum.QuickSort,
      AlgoEnum.SelectionSort,
    ],
    swapElements: [],
    sorted: [],
  };
  render() {
    const { arr, algorithms, selectedAlgo } = this.state;
    return (
      <React.Fragment>
        <Header
          onRefresh={this.handleRefresh}
          onSpeedChange={this.handleSpeedChange}
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onChange={this.handleOnChange}
          onActivate={() => this.sort()}
        />
        <div
          className="container d-flex flex-row pt-1"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {arr.map((a) => (
            <Bar
              color={this.getBarColor(a)}
              height={this.getBarHeight(a)}
              width={this.getBarWidth(a)}
              types={BarTypesEnum.CrossLine}
              value={a}
              showValue={arr.length <= 30}
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
  getBarColor(a: number): BarColorEnum {
    if (_.indexOf(this.state.swapElements, a) > -1) {
      return BarColorEnum.Swap;
    }
    if (_.indexOf(this.state.sorted, a) > -1) {
      return BarColorEnum.Sorted;
    }
    return BarColorEnum.Default;
  }
  handleOnChange = (algo: AlgoEnum) => {
    this.setState({ selectedAlgo: algo });
  };
  handleSpeedChange = (e: any) => {
    const count = +e.currentTarget.value;
    this.setState({ arr: generateRandomArray({ from: 10, to: 99 }, count) });
  };
  handleRefresh = () => {
    this.setState({
      arr: generateRandomArray({ from: 10, to: 99 }, this.state.arr.length),
    });
  };

  sort() {
    switch (this.state.selectedAlgo) {
      case AlgoEnum.BubbleSort:
        bubbleSort(this.state.arr).subscribe((res) => {
          if (res.items) {
            this.setState({ arr: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            console.log("Sorted!!", res.sorted);
            let sorted: number[] = [...this.state.sorted];
            sorted.push(res.sorted);
            this.setState({ sorted });
          }
        });
        return;
      default:
        return;
    }
  }
}

export default Visualiser;
