import * as React from "react";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
import Header from "./header";
import random_color from "../assets/random_color.jpg";
import { AlgoEnum } from "../enums/algoEnums";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
} from "../utils/algorithms";
import { generateRandomArray, getRandomColor } from "../utils/utils";
import { BarColorEnum } from "../enums/barColorEnum";
import { SortEvent } from "../models/sortEvent";
import { Subject } from "rxjs";
import { HeaderConfig } from "../models/headerConfig";
import ColorInfo from "./common/colorInfo";
export interface VisualiserProps {}

export interface VisualiserState {
  original: number[];
  sorted: number[];
  selectedAlgo: AlgoEnum;
  onGoingAlgo: AlgoEnum;
  algorithms: AlgoEnum[];
  swapElements: number[];
  pivot: number;
  leftOfPivot: number[];
  rightOfPivot: number[];
  sortBuffer: number[];
  barColors: { value: number; color: string }[];
  barColorsBuffer: { value: number; color: string }[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    original: generateRandomArray({ from: 5, to: 99 }, 25),
    sorted: [],
    selectedAlgo: AlgoEnum.None,
    algorithms: [
      AlgoEnum.QuickSort,
      AlgoEnum.InsertionSort,
      AlgoEnum.MergeSort,
      AlgoEnum.SelectionSort,
      AlgoEnum.BubbleSort,
    ],
    swapElements: [],
    pivot: -1,
    leftOfPivot: [],
    rightOfPivot: [],
    sortBuffer: [],
    barColors: [],
    barColorsBuffer: [],
    onGoingAlgo: AlgoEnum.None,
  };
  render() {
    const { original, algorithms, selectedAlgo } = this.state;
    return (
      <React.Fragment>
        <Header
          config={this.getHeaderConfig()}
          onRefresh={this.handleRefresh}
          onSpeedChange={this.handleSpeedChange}
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onChange={this.handleAlgoChange}
          onActivate={() => this.handleActivate()}
        />
        <div
          className="container d-flex flex-row pt-1"
          style={{ height: "calc(100vh - 147px)" }}
        >
          {original.map((a) => (
            <Bar
              key={a}
              color={this.getBarColor(a)}
              height={this.getBarHeight(a)}
              width={this.getBarWidth(a)}
              types={BarTypesEnum.CrossLine}
              value={a}
              showValue={original.length <= 30}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center m-3">
          {this.getColorInfo()}
        </div>
      </React.Fragment>
    );
  }
  getHeaderConfig(): HeaderConfig {
    return {
      disableActivate: this.state.onGoingAlgo !== AlgoEnum.None,
      disableRefresh: this.state.onGoingAlgo !== AlgoEnum.None,
      disableSelectAlgo: this.state.onGoingAlgo !== AlgoEnum.None,
      disableSlider: this.state.onGoingAlgo !== AlgoEnum.None,
      alreadySortedPromt:
        this.state.onGoingAlgo === AlgoEnum.None &&
        _.isEqual(this.state.original, this.state.sorted),
    };
  }
  getBarHeight(value: number): string {
    const largest = _.max(this.state.original) || value;
    return `${(value / largest) * 100}%`;
  }
  getBarWidth(value: number) {
    return `${100 / this.state.original.length}%`;
  }
  getBarColor(a: number): BarColorEnum | string {
    const barColors: { value: number; color: string }[] = [
      ...this.state.barColors,
    ];
    const index = _.indexOf(
      barColors.map((r) => r.value),
      a
    );
    if (index > -1) {
      return barColors[index].color;
    }
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
  getColorInfo() {
    let algo: any = this.state.selectedAlgo;
    switch (algo) {
      case AlgoEnum.BubbleSort:
        return (
          <React.Fragment>
            <ColorInfo color={BarColorEnum.Swap} text="Swapped Elements" />
            <ColorInfo color={BarColorEnum.Sorted} text="Sorted Elements" />
          </React.Fragment>
        );
      case AlgoEnum.InsertionSort:
        return (
          <React.Fragment>
            <ColorInfo color={BarColorEnum.Swap} text="Sub Sorted Elements" />
            <ColorInfo color={BarColorEnum.Sorted} text="Sorted Elements" />
          </React.Fragment>
        );
      case AlgoEnum.QuickSort:
        return (
          <React.Fragment>
            <ColorInfo
              color={BarColorEnum.PivotLeft}
              text="Elements Smaller Than Pivot"
            />
            <ColorInfo color={BarColorEnum.Pivot} text="Pivot Element" />
            <ColorInfo
              color={BarColorEnum.PivotRight}
              text="Elements Larger Than Pivot"
            />
            <ColorInfo color={BarColorEnum.Sorted} text="Sorted Elements" />
          </React.Fragment>
        );
      case AlgoEnum.SelectionSort:
        return (
          <React.Fragment>
            <ColorInfo color={BarColorEnum.Swap} text="Swapped Elements" />
            <ColorInfo color={BarColorEnum.Sorted} text="Sorted Elements" />
          </React.Fragment>
        );
      case AlgoEnum.MergeSort:
        return (
          <React.Fragment>
            <ColorInfo
              imageUrl={random_color}
              text="Sorted Sub Group Elements"
            />
            <ColorInfo color={BarColorEnum.Sorted} text="Sorted Elements" />
          </React.Fragment>
        );
      default:
        break;
    }
  }
  handleAlgoChange = (algo: AlgoEnum) => {
    this.setState({
      selectedAlgo: algo,
      sortBuffer: [],
      barColors: [],
      barColorsBuffer: [],
    });
  };
  handleSpeedChange = (e: any) => {
    const count = +e.currentTarget.value;
    this.setState({
      original: generateRandomArray({ from: 10, to: 99 }, count),
      sorted: [],
      pivot: -1,
      sortBuffer: [],
      barColors: [],
      barColorsBuffer: [],
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
      sortBuffer: [],
      barColors: [],
      barColorsBuffer: [],
    });
  };

  handleActivate() {
    const selectedAlgo: any = this.state.selectedAlgo;
    switch (selectedAlgo) {
      case AlgoEnum.BubbleSort:
        this.setState({ onGoingAlgo: AlgoEnum.BubbleSort });
        bubbleSort([...this.state.original]).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...res.sorted, ...this.state.sorted];
            this.setState({ sorted });
            if (sorted.length === this.state.original.length) {
              this.setState({ onGoingAlgo: AlgoEnum.None });
            }
          }
        });
        return;
      case AlgoEnum.SelectionSort:
        this.setState({ onGoingAlgo: AlgoEnum.SelectionSort });
        selectionSort([...this.state.original]).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
            if (sorted.length === this.state.original.length) {
              this.setState({ onGoingAlgo: AlgoEnum.None });
            }
          }
        });
        return;
      case AlgoEnum.InsertionSort:
        this.setState({ onGoingAlgo: AlgoEnum.InsertionSort });
        insertionSort([...this.state.original]).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted, onGoingAlgo: AlgoEnum.None });
          }
        });
        return;
      case AlgoEnum.QuickSort:
        this.setState({ onGoingAlgo: AlgoEnum.QuickSort });
        const subject = new Subject<SortEvent>();
        quickSort(
          subject,
          [...this.state.original],
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
            }, (850 - this.state.original.length * 10) * delayCounter++);

            if (_.isEqual(res.items, _.sortBy(res.items))) {
              setTimeout(() => {
                this.setState({
                  sorted: res.items!,
                  leftOfPivot: [],
                  rightOfPivot: [],
                  onGoingAlgo: AlgoEnum.None,
                });
              }, (850 - this.state.original.length * 10) * delayCounter++);
            }
          }
          if (res.sorted) {
            setTimeout(() => {
              this.setState({
                sorted: res.sorted!,
                leftOfPivot: [],
                rightOfPivot: [],
              });
            }, (850 - this.state.original.length * 10) * delayCounter++);
          }
        });
        return;
      case AlgoEnum.MergeSort:
        this.setState({ onGoingAlgo: AlgoEnum.MergeSort });
        const msSubject = new Subject<SortEvent>();
        let msDelayCounter = 0;
        const originalArr = [...this.state.original];
        this.setState({ sortBuffer: originalArr });
        mergeSort(msSubject, this.state.original);
        msSubject.asObservable().subscribe((res) => {
          if (res.items) {
            let sortBuffer: number[] = [...this.state.sortBuffer];
            let indices = res.items.map((r) => _.indexOf(originalArr, r));
            indices = _.sortBy(indices);
            for (let i = 0; i < indices.length; i++) {
              sortBuffer[indices[i]] = res.items[i];
            }
            const randomColor =
              res.items.length === this.state.original.length
                ? BarColorEnum.Sorted
                : getRandomColor();
            const barColors: { value: number; color: string }[] = [
              ...this.state.barColorsBuffer,
            ];
            res.items.forEach((item) => {
              const index = _.indexOf(
                barColors.map((v) => v.value),
                item
              );
              if (index > -1) {
                barColors[index] = { value: item, color: _.clone(randomColor) };
              } else {
                barColors.push({ value: item, color: _.clone(randomColor) });
              }
            });
            this.setState({
              sortBuffer: sortBuffer,
              barColorsBuffer: barColors,
            });
            setTimeout(() => {
              this.setState({ original: sortBuffer, barColors });
              if (res.items!.length === this.state.original.length) {
                this.setState({
                  onGoingAlgo: AlgoEnum.None,
                  sorted: res.items!,
                });
              }
            }, (1000 - this.state.original.length * 10) * msDelayCounter++);
          }
        });
        return;
      default:
        return;
    }
  }
}

export default Visualiser;
