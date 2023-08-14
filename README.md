Blackjack

```
yarn install
yarn start
```

Implement a simple game of blackjack. It may use a simple, command-line interface. The program should start by asking how many players are at the table, 
start each player with $1000, and allow the players to make any integer bet for each deal.
The program must implement the core blackjack rules, i.e. players can choose to hit until they go over 21, the dealer must hit on 16 and stay on 17, etc.
 It must also support more complex rules such as doubling-down and splitting.
You are more than welcome to add any sort of functionality you like on top of these basics.

* FR.1: The game starts asking now many players are at the table
* FR.2: Each player starts with $1000
* FR.3: Allow players to make any integer bet for each deal
* FR.4: The six deck game with 52 cards each is used (312 cards)
FR.5: Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.
* FR.6: It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value.
* FR.7: Before the deal begins, each player places a bet, in chips, in front of them in the designated area. Minimum and maximum limits are from $2 to $500.
* FR.8: The dealer shuffles all the cards. The last 60 to 75 cards or so will not be used
* FR.9: When all the players have placed their bets, the dealer gives one card face up to each player. Another round of cards is then dealt face up to each player,
      but the dealer takes the second card face down. Thus, each player except the dealer receives two cards face up, and the dealer receives one card face up and one card face down
* FR.10: If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards, this is a natural or "blackjack."
       If any player has a natural and the dealer does not, the dealer immediately pays that player one and a half times the amount of their bet.
       If the dealer has a natural, they immediately collect the bets of all players who do not have naturals, (but no additional amount).
       If the dealer and another player both have naturals, the bet of that player is a stand-off (a tie), and the player takes back his chips.
FR.11: If the dealer's face-up card is a ten-card or an ace, they look at their face-down card to see if the two cards make a natural. 
       If the face-up card is not a ten-card or an ace, they do not look at the face-down card until it is the dealer's turn to play.



the house is the dealer



NFR.1: Command line interface