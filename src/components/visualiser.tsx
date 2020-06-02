import * as React from "react";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
import Header from "./header";
import { AlgoEnum } from "../enums/algoEnums";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
} from "../utils/algorithms";
import { generateRandomArray } from "../utils/utils";
import { BarColorEnum } from "../enums/barColorEnum";
import { SortEvent } from "../models/sortEvent";
import { Subject } from "rxjs";
export interface VisualiserProps {}

export interface VisualiserState {
  original: number[];
  sorted: number[];
  selectedAlgo: AlgoEnum;
  algorithms: AlgoEnum[];
  swapElements: number[];
  pivot: number;
  leftOfPivot: number[];
  rightOfPivot: number[];
  temp: number[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    original: generateRandomArray({ from: 5, to: 99 }, 25),
    sorted: [],
    selectedAlgo: AlgoEnum.BubbleSort,
    algorithms: [
      AlgoEnum.BubbleSort,
      AlgoEnum.InsertionSort,
      AlgoEnum.MergeSort,
      AlgoEnum.QuickSort,
      AlgoEnum.SelectionSort,
    ],
    swapElements: [],
    pivot: -1,
    leftOfPivot: [],
    rightOfPivot: [],
    temp: [],
  };
  render() {
    const { original, algorithms, selectedAlgo } = this.state;
    return (
      <React.Fragment>
        <Header
          onRefresh={this.handleRefresh}
          onSpeedChange={this.handleSpeedChange}
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onChange={this.handleAlgoChange}
          onActivate={() => this.handleActivate()}
        />
        <div
          className="container d-flex flex-row pt-1"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {original.map((a) => (
            <Bar
              color={this.getBarColor(a)}
              height={this.getBarHeight(a)}
              width={this.getBarWidth(a)}
              types={BarTypesEnum.CrossLine}
              value={a}
              showValue={original.length <= 30}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
  getBarHeight(value: number): string {
    const largest = _.max(this.state.original) || value;
    return `${(value / largest) * 100}%`;
  }
  getBarWidth(value: number) {
    return `${100 / this.state.original.length}%`;
  }
  getBarColor(a: number): BarColorEnum {
    if (_.indexOf(this.state.swapElements, a) > -1) {
      return BarColorEnum.Swap;
    }
    if (_.indexOf(this.state.sorted, a) > -1) {
      return BarColorEnum.Sorted;
    }
    if (a === this.state.pivot && this.state.sorted.length === 0) {
      return BarColorEnum.Pivot;
    }
    if (_.indexOf(this.state.leftOfPivot, a) > -1)
      return BarColorEnum.PivotLeft;
    if (_.indexOf(this.state.rightOfPivot, a) > -1)
      return BarColorEnum.PivotRight;
    return BarColorEnum.Default;
  }
  handleAlgoChange = (algo: AlgoEnum) => {
    this.setState({ selectedAlgo: algo });
  };
  handleSpeedChange = (e: any) => {
    const count = +e.currentTarget.value;
    this.setState({
      original: generateRandomArray({ from: 10, to: 99 }, count),
      sorted: [],
      pivot: -1,
    });
  };
  handleRefresh = () => {
    this.setState({
      original: generateRandomArray(
        { from: 10, to: 99 },
        this.state.original.length
      ),
      sorted: [],
      pivot: -1,
    });
  };

  handleActivate() {
    switch (this.state.selectedAlgo) {
      case AlgoEnum.BubbleSort:
        bubbleSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      case AlgoEnum.SelectionSort:
        selectionSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      case AlgoEnum.InsertionSort:
        insertionSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      case AlgoEnum.QuickSort:
        const subject = new Subject<SortEvent>();
        quickSort(
          subject,
          this.state.original,
          0,
          this.state.original.length - 1
        );
        let delayCounter = 0;
        subject.subscribe((res) => {
          if (res.pivot) {
            console.log(res.pivot);
            const pivotIndex = _.indexOf(res.items!, res.pivot);
            const leftOfPivot = _.slice(res.items!, 0, pivotIndex) || [];
            const rightOfPivot =
              _.slice(res.items, pivotIndex + 1, res.items!.length) || [];
            setTimeout(() => {
              this.setState({
                pivot: res.pivot!,
                original: res.items!,
                leftOfPivot,
                rightOfPivot,
              });
            }, (650 - this.state.original.length * 10) * delayCounter++);

            if (
              JSON.stringify(res.items) === JSON.stringify(_.sortBy(res.items))
            ) {
              setTimeout(() => {
                this.setState({
                  sorted: res.items!,
                  leftOfPivot: [],
                  rightOfPivot: [],
                });
              }, (650 - this.state.original.length * 10) * delayCounter++);
            }
          }
          if (res.sorted) {
            setTimeout(() => {
              this.setState({
                sorted: res.sorted!,
                leftOfPivot: [],
                rightOfPivot: [],
              });
            }, (650 - this.state.original.length * 10) * delayCounter++);
          }
        });
        return;
      case AlgoEnum.MergeSort:
        const msSubject = new Subject<SortEvent>();
        let msDelayCounter = 0;
        const temp = [...this.state.original];
        this.setState({ temp });
        mergeSort(msSubject, this.state.original);
        msSubject.asObservable().subscribe((res) => {
          if (res.items) {
            console.log("------------[START] Incoming event------------");
            console.log("Received-->", res.items);
            let arr: number[] = [...this.state.temp];
            console.log("Array at this stage-->", arr);
            let indices = res.items.map((r) => _.indexOf(temp, r));
            indices = _.sortBy(indices);
            console.log("Calculated Indices-->", indices);
            for (let i = 0; i < indices.length; i++) {
              arr[indices[i]] = res.items[i];
            }
            this.setState({ temp: arr });
            console.log("Array after change-->", arr);
            console.log("------------[END] Incoming event------------");
            setTimeout(() => {
              this.setState({ original: arr });
            }, (650 - this.state.original.length * 10) * msDelayCounter++);
          }
        });
        return;
      default:
        return;
    }
  }
}

export default Visualiser;
