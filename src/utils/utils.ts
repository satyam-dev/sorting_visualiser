import { Subject } from "rxjs";
import * as _ from "lodash";
import { SortEvent } from "../models/sortEvent";
export function swap(items: number[], index1: number, index2: number) {
  let temp = items[index1];
  items[index1] = items[index2];
  items[index2] = temp;
}
export function emitArrayItems(options: {
  subject: Subject<SortEvent>;
  items: number[];
  swapCount: number;
  swapElements?: number[];
  sorted?: number;
}) {
  if (options.swapElements) {
    setTimeout(() => {
      options.subject.next({
        items: options.items,
        swapElements: options.swapElements,
      });
    }, (650 - options.items.length * 10) * options.swapCount); // 40 - 700ms
  }
  if (options.sorted) {
    setTimeout(() => {
      options.subject.next({ sorted: options.sorted });
    }, (650 - options.items.length * 10) * options.swapCount);
  }
}
export function generateRandomArray(
  range: { from: number; to: number },
  count: number
) {
  const randomArr: number[] = [];
  for (let i = 1; i <= count; i++) {
    randomArr.push(_.random(range.from, range.to));
  }
  return randomArr;
}
