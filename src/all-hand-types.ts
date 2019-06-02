import { HandType } from './hand-type';
import { highCard } from './hand-requirements/high-card';
import { pair } from './hand-requirements/pair';
import { twoPair } from './hand-requirements/two-pair';
import { straight } from './hand-requirements/straight';

let rank = 1;
export const allHandTypes: HandType[] = [
  new HandType('High Card' , rank++ , highCard) ,
  new HandType('Pair'      , rank++ , pair)     ,
  new HandType('Two Pair'  , rank++ , twoPair)  ,
  new HandType('Straight'  , rank++ , straight) ,
]
