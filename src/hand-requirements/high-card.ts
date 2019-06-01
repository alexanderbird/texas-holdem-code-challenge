import { Hand, HandMatch } from '../model';

export function highCard(hand: Hand): HandMatch {
  const sortedHand = hand.sort((left, right) => left.compareTo(right));
  const [ high, ...kicker ] = sortedHand;
  return {
    keyCards: [ high ],
    kicker,
  };
}
