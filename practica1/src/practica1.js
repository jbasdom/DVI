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
	this.cards = [];
	this.backs = [];
	this.state = "noneFlipped";
	this.cardsFound = 0;
	this.otherCard;

	// Initializes the game creating the cards, shuffling them and starting the game loop
	this.initGame = function() {
		let types = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin", "back"];

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 2; j++) {
				this.cards.push(new MemoryGameCard(types[i]));
				this.backs.push(new MemoryGameCard(types[8]));
			}
		}

		shuffle(this.cards);
		this.loop();
	};

	// Draws the game
	this.draw = function() {
		if (this.state === "noneFlipped") this.gs.drawMessage("Pick first card.");

		else if (this.state === "oneFlipped") this.gs.drawMessage("Pick second card.");

		else this.gs.drawMessage("You won!");

		for (i in this.cards) {
			if (this.cards[i].state === "flipped" || this.cards[i].state === "found") {
				this.cards[i].draw(gs, i);
			}

			else this.backs[i].draw(gs, i);
		}
	 };

	// Game loop
	this.loop = function() {
		setInterval(this.draw.bind(this), 16);
	};

	// Triggered whenever the user clicks on any of the cards
	// Flips the cards. If two cards are flipped, checks if they are the same
	this.onClick = function(cardID) {
		if (cardID >= 0 && cardID <= 15) {

			// If no cards are flipped, flips one and switches the state of the game
			if (this.state === "noneFlipped") {
				this.cards[cardID].flip();
				this.otherCard = this.cards[cardID];
				this.state = "oneFlipped";
			}

			// If one card is flipped, flips the second one and...
			else if (this.state === "oneFlipped" && this.cards[cardID] !== this.otherCard) {
				this.cards[cardID].flip();

				// ...if they are the same, marks both of them as found and resets the state of the game
				if (this.cards[cardID].compareTo(this.otherCard)) {
					this.cards[cardID].found();
					this.otherCard.found();
					this.cardsFound = this.cardsFound + 2;
					if (this.cardsFound === 16) this.state = "finished";
					else this.state = "noneFlipped";
				}

				//...if they are not the same, they are flipped back
				else {
					setTimeout(function() {
						this.cards[cardID].state = "notFlipped";
						this.otherCard.state = "notFlipped";
						this.state = "noneFlipped";
					}, 1000);
				}
			}
		}
	};
};

/**
 * Game's cards constructor. Receives as a parameter the name of the sprite representing the card.
 * Two cards will be the same if they have the same sprite.
 * A card can save the position within the table so it can be drawn later
 * @param {id} id Name of the sprite representing the card
 */

MemoryGameCard = function(id) {
	this.id = id;
	this.state = "notFlipped";

	// Flips the card, changing its status
	this.flip = function() {
		if (this.state === "notFlipped") {
			this.state = "flipped";
		}
	};

	this.unflip = function() {
		if (this.state === "flipped") {
			this.state = "notFlipped";
		}
	};

	// Marks a card as found, changing its status
	this.found = function() {
		this.state = "found";
	};

	// Compares two cards, returning true if both represent the same card
	this.compareTo = function(otherCard) { 
		if (this.id === otherCard.id) {
			this.found();
			otherCard.found();
			return true;
		};
		return false;
	};

	this.draw = function(gs, pos) {
		gs.draw(this.id, pos);
	};
};

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i+1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}