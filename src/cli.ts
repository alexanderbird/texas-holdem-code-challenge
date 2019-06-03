import { scorePokerHands } from './score-poker-hands';

const inputChunks: string[] = [];

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => inputChunks.push(chunk));
process.stdin.on('end', function () {
  const input = inputChunks.join('').trim();
  const output = scorePokerHands(input);
  process.stdout.write(output);
  process.stdout.write('\n');
});
