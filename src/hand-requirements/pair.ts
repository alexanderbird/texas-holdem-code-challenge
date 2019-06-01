import { Hand, HandMatch } from '../model';
import { Card } from '../card';

export function pair(hand: Hand): HandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let keyCard;
  for(let i = 0; i < sortedHand.length - 1; i++) {
    if(sortedHand[i].value === sortedHand[i + 1].value) {
      if(!keyCard) {
        keyCard = sortedHand[i];
      } else {
        keyCard = sortedHand[i].compareTo(keyCard) ? keyCard : sortedHand[i];
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
