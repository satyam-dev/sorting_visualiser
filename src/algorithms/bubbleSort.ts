import { swap } from "../utils/utils";
export class BubbleSort {
  constructor(private items: number[]) {}

  public bubbleSort() {
    let isSorted: boolean;
    for (let i = 0; i < this.items.length; i++) {
      isSorted = true;
      for (let j = 0; j < this.items.length - i; j++) {
        if (this.items[j] > this.items[j + 1]) {
          swap(this.items, j, j + 1);
          isSorted = false;
        }
      }
      if (isSorted) break;
    }
  }
}
