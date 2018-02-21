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
	this.message = "Pick first card.";
	this.cardsFound = 0;

	// Initializes the game creating the cards, shuffling them and starting the game loop
	this.initGame = function() {
		let types = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin", "back"];

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 2; j++) {
				this.cards.push(new MemoryGameCard(types[i]));
			}
		}

		shuffle(this.cards);
		this.loop();
	};

	// Draws the game
	this.draw = function() {
		gs._proto_.drawMessage(this.message);
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
 * @param {id} id Name of the sprite representing the card
 */

MemoryGameCard = function(id) {
	this.id = id;

	// Flips the card, changing its status
	this.flip = function() { };

	// Marks a card as found, changing its status
	this.found = function() { };

	// Compares two cards, returning true if both represent the same card
	this.compareTo = function(otherCard) { };
};

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i+1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}