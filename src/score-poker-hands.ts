import { permutation } from 'js-combinatorics';

import {
  PlayerHandClassification,
  HandClassification,
  GameResults,
} from './model';
import { parseGameBoard } from './parse-game-board';
import { sortHandClassification, sortNestedHandClassification } from './sort-hand-classification';
import { allHandTypes } from './all-hand-types';
import { serializeGameResults } from './serialize-game-results';

export function scorePokerHands(input: string): string {
  const board = parseGameBoard(input);
  const playerHandClassifications: PlayerHandClassification[] = [];
  board.playerHands.forEach(playerHand => {
    const availableCards = [ ...board.communityCards, ...playerHand.hand ];
    const possibleHands = permutation(availableCards, 5);
    const handClassifications: HandClassification[] = [];
    possibleHands.forEach(hand => {
      allHandTypes.forEach(handType => {
        const classification = handType.matches(hand);        
        if(classification) handClassifications.push(classification);
      });
    });
    const [ bestHand ] = handClassifications.sort(sortHandClassification);
    playerHandClassifications.push({
      player: playerHand.player,
      handClassification: bestHand,
    });
  });
  const gameResults: GameResults = playerHandClassifications.sort(
    sortNestedHandClassification((p: PlayerHandClassification) => p.handClassification)
  );
  return serializeGameResults(gameResults);
}
