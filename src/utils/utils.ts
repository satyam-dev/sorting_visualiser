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
    }, (550 - options.items.length * 10) * options.delay);
  }
  if (options.sorted) {
    setTimeout(() => {
      options.subject.next({ sorted: options.sorted });
    }, (550 - options.items.length * 10) * options.delay);
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

export function merge(
  subject: Subject<SortEvent>,
  left: number[],
  right: number[]
): number[] {
  const array: number[] = [];
  let lIndex = 0;
  let rIndex = 0;
  while (lIndex + rIndex < left.length + right.length) {
    const lItem = left[lIndex];
    const rItem = right[rIndex];
    if (lItem == null) {
      array.push(rItem);
      rIndex++;
    } else if (rItem == null) {
      array.push(lItem);
      lIndex++;
    } else if (lItem < rItem) {
      array.push(lItem);
      lIndex++;
    } else {
      array.push(rItem);
      rIndex++;
    }
  }
  setTimeout(() => {
    subject.next({ items: _.cloneDeep(array) });
  }, 0);
  return array;
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
