import { Subject } from "rxjs";
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
  }, 50 * swapCount);
}
