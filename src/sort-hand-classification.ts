import { HandClassification } from './model';

// Note:
// the -1/+1 return values are the opposite of the psuedo-code on the MDN sort docs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
// That's because we want to sort in descending order: the highest hand rank / card value comes first.
export function sortHandClassification(left: HandClassification, right: HandClassification): number {
  const leftComparable = left.serializeToSort();
  const rightComparable = right.serializeToSort();
  if(leftComparable < rightComparable) return 1;
  if(leftComparable > rightComparable) return -1;
  return 0;
}

type Getter<T> = (parent: T) => HandClassification;
type MappedSort<T> = (left: T, right: T) => number;
export function sortNestedHandClassification<T>(getter: Getter<T>): MappedSort<T> {
  return function(left: T, right: T): number {
    return sortHandClassification(getter(left), getter(right));
  }
}
