```
GameRank:
 + person: Person
 + handSummary: HandSummary

Person
 + name: string

Card
 + value: number
 + name: string
 + suit: 'hearts' | 'clubs' | 'diamonds' | 'spades'

Hand: Card[]

HandType
 + name: string
 + requirement: HandRequirement

HandSummary
 + handTypeName: string
 + keyCards: Card[]
 + kicker: Hand
 + greaterThan(HandSummary): boolean

HandRequirementResult: HandSummary | false

HandRequirement: (Hand) => HandRequirementResult
  one of: 
    highCard(Hand)  { highest card in the set }
    pair(Hand)      { two cards same number }
    twoPair(Hand)   { !four(Hand) && UnionHandRequirement(pair, pair, 'Two Pair')(Hand) }
    three(Hand)     { three cards same number }

    // there is a three, and a pair in the kicker of the three
    fullHouse(Hand) { UnionHandRequirement(three, pair, 'Full House')(Hand) }
    four(Hand)      { four cards same number }
    flush(Hand)     { every card the same suit }
    straight(Hand)  {
      when sorted by number, increases in numerical sequence without gaps
    }
    straightFlush   { straight(Hand) && flush(Hand) }
    royalFlush      { straightFlush(Hand) && highCard(Hand).keyCard === Ace }

UnionHandRequirement(first: HandRequirement, second: HandRequirement, name: string): HandRequirement {
  1. get HandRequirementResult from first
  2. if false, return false
  3. get HandRequirementResult from second, passing the kicker in as the Hand
  4. if false, return false
  5. return a new HandSummary {
    handTypeName: name
    keyCards: keyCards from first and second
    kicker: kicker from second
  }
}

```
