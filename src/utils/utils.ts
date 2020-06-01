import { Subject } from "rxjs";
import * as _ from "lodash";
import { SortEvent } from "../models/sortEvent";
export function swap(items: number[], index1: number, index2: number) {
  let temp = items[index1];
  items[index1] = items[index2];
  items[index2] = temp;
}
export function updateWithDelay(options: {
  subject: Subject<SortEvent>;
  items: number[];
  delay: number;
  swapElements?: number[];
  sorted?: number[];
  pivot?: number;
}) {
  if (options.swapElements) {
    setTimeout(() => {
      options.subject.next({
        items: options.items,
        swapElements: options.swapElements,
      });
    }, (650 - options.items.length * 10) * options.delay);
  }
  if (options.sorted) {
    setTimeout(() => {
      options.subject.next({ sorted: options.sorted });
    }, (650 - options.items.length * 10) * options.delay);
  }
  if (options.pivot) {
    setTimeout(() => {
      options.subject.next({
        items: options.items,
        pivot: options.pivot,
      });
    }, 0);
  }
}
export function generateRandomArray(
  range: { from: number; to: number },
  count: number
) {
  let randomArr: number[] = [];
  while (randomArr.length < count) {
    randomArr.push(_.random(range.from, range.to));
    randomArr = _.uniq(randomArr);
  }
  return randomArr;
}

export function partition(
  items: Array<number>,
  left: number = 0,
  right: number = items.length - 1
) {
  const pivot = items[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      [items[i], items[j]] = [items[j], items[i]];
      i++;
      j--;
    }
  }

  return i;
}
