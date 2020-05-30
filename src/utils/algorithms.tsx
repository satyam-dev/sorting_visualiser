import { Subject } from "rxjs";
import { swap, updateWithDelay } from "./utils";
import * as _ from "lodash";
import { SortEvent } from "../models/sortEvent";
export function bubbleSort(items: number[]): Subject<SortEvent> {
  const subject = new Subject<SortEvent>();
  let swapCount = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i; j++) {
      if (items[j] > items[j + 1]) {
        swapCount += 1;
        updateWithDelay({
          subject,
          items: _.cloneDeep(items),
          swapCount,
          swapElements: [items[j], items[j + 1]],
        });
        swap(items, j, j + 1);
      }
    }
    updateWithDelay({
      subject,
      items: _.cloneDeep(items),
      swapCount,
      sorted: [items[items.length - (i + 1)]],
    });
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    swapCount,
    swapElements: [],
  });
  return subject;
}
