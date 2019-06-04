import { Hand, PossibleHandMatch } from '../../model';
import { straight } from './straight';
import { flush } from './flush';

export function straightFlush(hand: Hand): PossibleHandMatch {
  const isStraight = straight([...hand]);
  const isFlush = flush([...hand]);
  return isFlush && isStraight;
}
