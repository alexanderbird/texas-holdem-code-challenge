import { Hand, HandMatch } from '../model';
import { Card } from '../card';

export function four(hand: Hand): HandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let keyCard;
  for(let i = 0; i < sortedHand.length - 3; i++) {
    const current = sortedHand[i];
    const next = sortedHand[i + 1];
    const afterNext = sortedHand[i + 2];
    const afterAfterNext = sortedHand[i + 3];
    if(
      current.value === next.value
      && current.value === afterNext.value
      && current.value === afterAfterNext.value
    ) {
      if(!keyCard) {
        keyCard = current;
      } else {
        keyCard = current.compareTo(keyCard) ? keyCard : current;
      }
      // No need to check the next three, we already know it has the same value as
      // this one
      i += 3;
    }
  }
  if(!keyCard) return false;
  return {
    keyCards: [keyCard],
    kicker: sortedHand.filter(card => card.value !== keyCard.value),
  };
}
