import { Subject } from "rxjs";
import { swap, emitState } from "./utils";
import * as _ from "lodash";
export function bubbleSort(items: number[]): Subject<number[]> {
  const subject = new Subject<number[]>();
  let isSorted: boolean;
  let swapcount = 0;
  for (let i = 0; i < items.length; i++) {
    isSorted = true;
    for (let j = 0; j < items.length - i; j++) {
      if (items[j] > items[j + 1]) {
        swapcount += 1;
        emitState(subject, _.cloneDeep(items), swapcount);
        swap(items, j, j + 1);
        isSorted = false;
      }
    }
    if (isSorted) break;
  }
  emitState(subject, _.cloneDeep(items), swapcount);
  return subject;
}
