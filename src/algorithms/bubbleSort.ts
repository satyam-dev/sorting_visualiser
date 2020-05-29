import { swap } from "../utils/utils";
import { Subject } from "rxjs";
import * as _ from "lodash";

export class BubbleSort {
  public bubbleSort(items: number[]): Subject<number[]> {
    const subject = new Subject<number[]>();
    let isSorted: boolean;
    let swapcount = 0;
    for (let i = 0; i < items.length; i++) {
      isSorted = true;
      for (let j = 0; j < items.length - i; j++) {
        if (items[j] > items[j + 1]) {
          swapcount += 1;
          setTimeout(() => {
            subject.next(_.cloneDeep(items));
          }, 1000 * swapcount);
          swap(items, j, j + 1);
          // console.log(this.items);
          isSorted = false;
        }
      }
      if (isSorted) break;
    }
    return subject;
  }
}
