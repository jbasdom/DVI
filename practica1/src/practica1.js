 /**
  * MemoryGame is the class that represents our game. It contains an array with the game's cards,
  * the number of cards found (to know when the game is over) and a text with a message
  * indicating the state of the game.
  */
var MemoryGame = MemoryGame || {};

 /**
  * MemoryGame constructor
  * Receives the graphic server as parameter, later used to draw
  */
MemoryGame = function(gs) {
	this.gs = gs;
	this.cards =[];
	this.state = "none";
	this.cardsFound = 0;

	// Initializes the game creating the cards, shuffling them and starting the game loop
	this.initGame = function() {
		int rnd1, rnd2;
		for (int i = 0; i < 8; i++) {
			do { rnd1 = Math.floor(Math.random() * 16); } while (this.cards[rnd1] != undefined)
			do { rnd2 = Math.floor(Math.random() * 16); } while (this.cards[rnd2] != undefined)

			switch(i) {
			case 0:  this.cards[rnd1] = "8-ball";
					 this.cards[rnd2] = "8-ball"; 
					 break;
			case 1:  this.cards[rnd1] = "potato";
				     this.cards[rnd2] = "potato";
				     break;
			case 2:  this.cards[rnd1] = "dinosaur";
				     this.cards[rnd2] = "dinosaur";
				     break;
			case 3:  this.cards[rnd1] = "kronos";
				     this.cards[rnd2] = "kronos";
				     break;
			case 4:  this.cards[rnd1] = "rocket";
				     this.cards[rnd2] = "rocket";
				     break;
			case 5:  this.cards[rnd1] = "unicorn";
				     this.cards[rnd2] = "unicorn";
				     break;
			case 6:  this.cards[rnd1] = "guy";
				     this.cards[rnd2] = "guy";
				     break;
			case 7:  this.cards[rnd1] = "zeppelin";
				     this.cards[rnd2] = "zeppelin";
				     break;
			default: this.cards[rnd1] = "back";
				     this.cards[rnd2] = "back";
			}
		}
		this.loop();
	};

	// Draws the game
	this.draw = function() {
		gs._proto_.drawMessage("Pick first card");
		for (int a = 0; a < 8; a++) {
			gs._proto_.draw(MemoryGame[a]);
		}
	 };

	// Game loop
	this.loop = function() { };

	// Triggered whenever the user clicks on any of the cards
	// Flips the cards. If two cards are flipped, checks if they are the same
	this.onClick = function(cardID) { };
};

/**
 * Game's cards constructor. Receives as a parameter the name of the sprite representing the card.
 * Two cards will be the same if they have the same sprite.
 * A card can save the position within the table so it can be drawn later
 * @param {string} sprite Name of the sprite representing the card
 */

MemoryGameCard = function(sprite) {
	this.MemoryGameCard = function(sprite) { }

	// Flips the card, changing its status
	this.flip = function() { };

	// Marks a card as found, changing its status
	this.found = function() { };

	// Compares two cards, returning true if both represent the same card
	this.compareTo = function(otherCard) { };
};