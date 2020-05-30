import { Subject } from "rxjs";
import * as _ from "lodash";
export function swap(items: number[], index1: number, index2: number) {
  let temp = items[index1];
  items[index1] = items[index2];
  items[index2] = temp;
}
export function emitState(
  subject: Subject<number[]>,
  items: number[],
  swapCount: number
) {
  setTimeout(() => {
    console.log("Nexting... ", items);
    subject.next(items);
  }, (650 - items.length * 10) * swapCount); // 40 - 700ms
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
