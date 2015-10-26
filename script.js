var playerDecks = {
  playerOneDeck:[],
  playerTwoDeck:[]
};

var createCard = function(value, suit){
  var newCard = {
    value : null,
    suit : null,
  };
  newCard.value=value;
  newCard.suit=suit;
  return newCard;
};

var createDeck = function(){
  var newDeck=[];
  for (var i = 0; i < 4; i++) {
    var suit = null;
    if ( i===0 ) {
      suit='Hearts';
    } else if ( i===1 ) {
      suit='Diamonds';
    } else if ( i===2 ) {
      suit='Spades';
    } else if ( i===3 ) {
      suit='Clubs';
    }
    for (var j = 2; j <= 14; j++) {
      var newCard = createCard(j, suit);
      newDeck.push(newCard);
    }
  }
  return newDeck;
};

var divideDeck = function(deck){
  for (var i = 0; i < deck.length ; i++) {
    if (i%2===0) {
      playerDecks.playerOneDeck.push(deck[i]);
    } else {
      playerDecks.playerTwoDeck.push(deck[i]);
    }
  }
};

var getCardName = function(card){
  return card.value + ' of ' + card.suit;
};

var shuffle = function (array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};


divideDeck(shuffle(createDeck()));
console.log(playerDecks.playerOneDeck);
console.log(playerDecks.playerTwoDeck);
