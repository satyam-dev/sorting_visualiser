export interface SortEvent {
  items?: number[];
  currentElements?: number[];
  swapElements?: number[];
  sorted?: number[];
  pivot?: number;
  delay?: number | string; // refactor - remove or change type. Had used it for logging purposes
}
