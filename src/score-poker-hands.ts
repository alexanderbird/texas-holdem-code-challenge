import { permutation } from 'js-combinatorics';

import {
  PlayerHandClassification,
  HandClassification,
} from './model';
import { parseGameBoard } from './parse-game-board';
import { sortHandClassification, sortNestedHandClassification } from './sort-hand-classification';
import { handTypes } from './hand-types';
import { serializeGameResults } from './serialize-game-results';

export function scorePokerHands(input: string): string {
  const board = parseGameBoard(input);
  const playerHandClassifications: PlayerHandClassification[] = [];
  board.playerHands.forEach(playerHand => {
    const allCards = [ ...board.communityCards, ...playerHand.hand ];
    const possibleHands = permutation(allCards, 5);
    const handClassifications: HandClassification[] = [];
    possibleHands.forEach(hand => {
      handTypes.forEach(handType => {
        const classification = handType.matches(hand);        
        if(classification) handClassifications.push(classification);
      });
    });
    const sortedHandClassifications = handClassifications.sort(sortHandClassification);
    playerHandClassifications.push({
      player: playerHand.player,
      handClassification: sortedHandClassifications[0],
    });
  });
  const sortedPlayerHandClassifications = playerHandClassifications.sort(
    sortNestedHandClassification((p: PlayerHandClassification) => p.handClassification)
  );
  return serializeGameResults(sortedPlayerHandClassifications);
}
