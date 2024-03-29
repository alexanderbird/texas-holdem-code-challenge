import { HandType } from './hand-type';
import * as requirements from './hand-requirements';

let rank = 1;
export const allHandTypes: HandType[] = [
  new HandType('Highcard', rank++, requirements.highCard),
  new HandType('Pair', rank++, requirements.pair),
  new HandType('Two Pair', rank++, requirements.twoPair),
  new HandType('Three of a Kind', rank++, requirements.three),
  new HandType('Straight', rank++, requirements.straight),
  new HandType('Flush', rank++, requirements.flush),
  new HandType('Full House', rank++, requirements.fullHouse),
  new HandType('Four of a Kind', rank++, requirements.four),
  new HandType('Straight Flush', rank++, requirements.straightFlush),
  new HandType('Royal Flush', rank++, requirements.royalFlush),
];
