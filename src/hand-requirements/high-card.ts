import { Hand, HandMatch } from '../model';
import { Card } from '../card';

export function highCard(hand: Hand): HandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  const [ high, ...kicker ] = sortedHand;
  return {
    scoringCards: [ high ],
    kicker,
  };
}
