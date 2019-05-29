## Arterys Texas Hold'em Programming Exercise
### Problem

Write a program that can identify and rank [Texas
Hold'em](https://en.wikipedia.org/wiki/Texas_hold_'em) poker hands.  Your code
should be **production** level.  C++ or node.js are preferred, however you can
use any language you desire.  Your program should run on a *nix system.  If you
have questions please contact darryl@arterys.com.

### Specifications
- Your program should read the community cards and each player's hand from stdin.
- The first line will contain the five community cards.
- Each line after that will have a player's name followed by their two cards.
- Cards will be identified using two characters.
- First will be the face, followed by the suit.
- The characters used to represent the cards include the digits 2 through 9
  representing their respective values.
- For other characters, see below:

| Character | Represents |
|-----------|------------|
| T         | 10         |
| J         | Jack       |
| Q         | Queen      |
| K         | King       |
| A         | Ace        |
| H         | Hearts     |
| S         | Spades     |
| D         | Diamonds   |
| C         | Clubs      |


Names and cards will be separated by whitespace.
Example input:

    KS AD 3H 7C TD
    John 9H 7S
    Sam AC KH
    Becky JD QC

Once you have read the input, you should identify each hand and rank them
according to the Texas Hold'em rules.  The results should be output to stdout.
Each line should contain the rank, the player's name, and their hand name.  The
hand name should have a full description including kickers if necessary.  
For the example above, output might look like:

    1 Becky Straight Ace
    2 Sam Two Pair Ace King
    3 John Pair 7
