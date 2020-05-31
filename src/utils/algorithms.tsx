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

export function selectionSort(items: number[]): Subject<SortEvent> {
  const subject = new Subject<SortEvent>();
  for (let i = 0; i < items.length; i++) {
    let minIndex = i;
    for (let j = _.clone(i); j < items.length; j++) {
      if (items[minIndex] > items[j]) {
        minIndex = _.clone(j);
      }
    }
    updateWithDelay({
      subject,
      items: _.cloneDeep(items),
      swapCount: i + 1,
      swapElements: [items[i], items[minIndex]],
      sorted: [items[minIndex]],
    });
    swap(items, i, minIndex);
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    swapCount: items.length,
    swapElements: [],
  });
  return subject;
}

export function insertionSort(items: number[]): Subject<SortEvent> {
  const subject = new Subject<SortEvent>();
  for (let i = 1; i < items.length; i++) {
    let current = items[i];
    let j = i - 1;
    while (j >= 0 && items[j] > current) {
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = current;
    updateWithDelay({
      subject,
      items: _.cloneDeep(items),
      swapCount: i,
      swapElements: items.slice(0, i + 1),
    });
    // swap(items, i, minIndex);
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    swapCount: items.length,
    sorted: items,
    swapElements: [],
  });
  console.log("Sorted!!", items);
  return subject;
}
