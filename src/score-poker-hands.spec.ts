import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { scorePokerHands } from './score-poker-hands';

describe('scorePokerHands', () => {
  const fixturePath = join(__dirname, './score-poker-hands.spec.fixtures');
  const fixtures = readdirSync(fixturePath);
  fixtures.forEach(fixtureFileName => {
    const fixtureNameMatch = fixtureFileName.match(/(.*)\.txt$/);
    if(!fixtureNameMatch) return;
    const fixtureName = fixtureNameMatch[1];
    const fixture = readFileSync(join(fixturePath, fixtureFileName)).toString();
    it(`correctly scores games with a ${fixtureName.replace('-', ' ')}`, () => {
      const [ input, output ] = fixture.split('\n\n---\n\n');
      expect(scorePokerHands(input)).toEqual(output.trim());
    });
  });
});
