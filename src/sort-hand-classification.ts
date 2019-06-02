import { HandClassification } from './model';

export function sortHandClassification(left: HandClassification, right: HandClassification): number {
  const leftComparable = left.serializeToSort();
  const rightComparable = right.serializeToSort();
  if(leftComparable < rightComparable) return 1;
  if(leftComparable > rightComparable) return -1;
  return 0;
}

export function sortNestedHandClassification<T>(getter: (parent: T) => HandClassification):
  (left: T, right: T) => number {
  return function(left: T, right: T): number {
    return sortHandClassification(getter(left), getter(right));
  }
}
