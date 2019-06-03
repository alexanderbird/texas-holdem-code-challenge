import { scorePokerHands } from './score-poker-hands';
import { greeting, exampleInput, inputOutputDivider } from './cli-help-text';

if(process.argv[2] === '--example') {
  console.log(exampleInput);
  process.exit(0);
}

const showHelp = !!process.stdin.isTTY && !!process.stdout.isTTY;

const inputChunks: string[] = [];

if(showHelp) console.log(greeting);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => inputChunks.push(chunk));
process.stdin.on('end', function () {
  const input = inputChunks.join('').trim();
  const output = scorePokerHands(input);
  if(showHelp) console.log(inputOutputDivider);
  process.stdout.write(output);
  process.stdout.write('\n');
});
