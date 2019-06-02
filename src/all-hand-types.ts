import { HandType } from './hand-type';
import { highCard } from './hand-requirements/high-card';

export const allHandTypes: HandType[] = [
  new HandType('High Card', 1, highCard),
]
