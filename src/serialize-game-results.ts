import { GameResults, PlayerHandClassification } from './model';

function serializeOneLine({ player, handClassification }: PlayerHandClassification, i: number): string {
  return `${i + 1} ${player.name} ${handClassification.serializeForHumans(0)}\n`;
}

export function serializeGameResults(gameResults: GameResults): string {
  return gameResults.map(serializeOneLine).join('');
}
