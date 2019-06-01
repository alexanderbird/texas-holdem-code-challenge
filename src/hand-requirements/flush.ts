import { Hand, PossibleHandMatch } from '../model';
import { Card } from '../card';

export function flush(hand: Hand): PossibleHandMatch {
  const firstSuit = hand[0].suit;
  const oneSuit = hand.reduce((allMatch: boolean, current: Card) => allMatch && current.suit === firstSuit, true);
  if(!oneSuit) return false;
  return {
    scoringCards: [ hand.sort(Card.sortByValue)[0] ],
    kicker: [],
  };
}
