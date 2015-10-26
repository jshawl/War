
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

var getCardName = function(card){
  return card.value + ' of ' + card.suit;
};

var shuffle = function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

var deck = createDeck();
console.log(deck);
console.log(getCardName(deck[45]));

console.log(shuffle(deck));
