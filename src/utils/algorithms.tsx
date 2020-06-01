import { Subject } from "rxjs";
import { swap, updateWithDelay, partition } from "./utils";
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
          delay: swapCount,
          swapElements: [items[j], items[j + 1]],
        });
        swap(items, j, j + 1);
      }
    }
    updateWithDelay({
      subject,
      items: _.cloneDeep(items),
      delay: swapCount,
      sorted: [items[items.length - (i + 1)]],
    });
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    delay: swapCount,
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
      delay: i + 1,
      swapElements: [items[i], items[minIndex]],
      sorted: [items[minIndex]],
    });
    swap(items, i, minIndex);
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    delay: items.length,
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
      delay: i,
      swapElements: items.slice(0, i + 1),
    });
  }
  updateWithDelay({
    subject,
    items: _.cloneDeep(items),
    delay: items.length,
    sorted: items,
    swapElements: [],
  });
  console.log("Sorted!!", items);
  return subject;
}
export function quickSort(
  subject: Subject<SortEvent>, // todo: refactor if possible
  items: Array<number>,
  left: number = 0,
  right: number = items.length - 1
) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right);
    setTimeout(() => {
      subject.next({ delay: `[]: ${items} , left: ${left} right: ${right}` }); // todo: remove or change type. Had used it for logging purposes
    }, 0);

    updateWithDelay({
      subject,
      items: _.cloneDeep(items),
      pivot: items[index],
      delay: 0, // refactor if possible
    });

    if (left < index - 1) {
      quickSort(subject, items, left, index - 1);
    }

    if (index < right) {
      quickSort(subject, items, index, right);
    }
  }
}
