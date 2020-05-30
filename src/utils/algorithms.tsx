import { Subject } from "rxjs";
import { swap, emitArrayItems } from "./utils";
import * as _ from "lodash";
import { SortEvent } from "../models/sortEvent";
export function bubbleSort(items: number[]): Subject<SortEvent> {
  const subject = new Subject<SortEvent>();
  let isSorted: boolean;
  let swapCount = 0;
  for (let i = 0; i < items.length; i++) {
    isSorted = true;
    for (let j = 0; j < items.length - i; j++) {
      if (items[j] > items[j + 1]) {
        swapCount += 1;
        emitArrayItems({
          subject,
          items: _.cloneDeep(items),
          swapCount,
          swapElements: [items[j], items[j + 1]],
        });
        swap(items, j, j + 1);
        isSorted = false;
      }
    }
    console.log(items.length - i - 1);
    emitArrayItems({
      subject,
      items: _.cloneDeep(items),
      swapCount,
      sorted: items[items.length - i],
    });
    if (isSorted) break;
  }
  emitArrayItems({
    subject,
    items: _.cloneDeep(items),
    swapCount,
    swapElements: [],
  });
  return subject;
}
