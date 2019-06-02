import { Hand, PossibleHandMatch } from '../model';
import { straightFlush } from './straight-flush';

export function royalFlush(hand: Hand): PossibleHandMatch {
  const match = straightFlush(hand);
  if(!match) return false;
  if(match.scoringCards[0].value !== 1) return false;
  return match;
}
