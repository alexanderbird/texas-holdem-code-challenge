import { GameResults, PlayerHandClassification } from './model';

function serializeOneLine(
  { player, handClassification }: PlayerHandClassification,
  i: number,
  numberOfKickers: number
): string {
  return `${i + 1} ${player.name} ${handClassification.serializeForHumans(numberOfKickers)}\n`;
}

export function serializeGameResults(gameResults: GameResults): string {
  let result = '';
  for(let i = 0; i < gameResults.length; i++) {
    const thisOne = gameResults[i];
    const before = gameResults[i - 1];
    const after = gameResults[i + 1];
    let numberOfKickersVSBefore = 0;
    let numberOfKickersVSAfter = 0;
    if(before) {
      numberOfKickersVSBefore = thisOne.handClassification.howManyKickerCardsAreRelevant(
        before.handClassification
      );
    }
    if(after) {
      numberOfKickersVSAfter = thisOne.handClassification.howManyKickerCardsAreRelevant(
        after.handClassification
      );
    }
    const numberOfKickers = Math.max(numberOfKickersVSBefore, numberOfKickersVSAfter);
    result += serializeOneLine(gameResults[i], i, numberOfKickers);
  }
  return result;
}
