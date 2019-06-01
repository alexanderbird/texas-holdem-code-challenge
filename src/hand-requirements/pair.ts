import { Hand, HandMatch } from '../model';
import { Card } from '../card';

export function pair(hand: Hand): HandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let keyCard;
  for(let i = 0; i < sortedHand.length - 1; i++) {
    const current = sortedHand[i];
    const next = sortedHand[i + 1];
    if(current.value === next.value) {
      if(!keyCard) {
        keyCard = current;
      } else {
        keyCard = current.compareTo(keyCard) ? keyCard : current;
      }
      // No need to check the next one, we already know it has the same value as
      // this one
      i++;
    }
  }
  if(!keyCard) return false;
  return {
    keyCards: [keyCard],
    kicker: sortedHand.filter(card => card.value !== keyCard.value),
  };
}
