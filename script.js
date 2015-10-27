var playerDecks = {
  playerOneDeck:[],
  playerTwoDeck:[]
};

var playerWinnings = {
  playerOneWinnings:[],
  playerTwoWinnings:[]
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

var turn = function(deckOne, deckTwo){
  if (deckOne[0].value>deckTwo[0].value) {
    playerWinnings.playerOneWinnings.push(deckTwo[0],deckOne[0]);
    playerDecks.playerOneDeck=playerDecks.playerOneDeck.slice(1);
    playerDecks.playerTwoDeck=playerDecks.playerTwoDeck.slice(1);
  } else if (deckTwo[0].value>deckOne[0].value) {
    playerWinnings.playerTwoWinnings.push(deckOne[0],deckTwo[0]);
    playerDecks.playerOneDeck=playerDecks.playerOneDeck.slice(1);
    playerDecks.playerTwoDeck=playerDecks.playerTwoDeck.slice(1);
  } else {
    if (deckOne[4]) {
      if (deckOne[4].value>deckTwo[4].value) {
        playerWinnings.playerOneWinnings.push(deckTwo[0],deckTwo[1],
          deckTwo[2],deckTwo[3],deckTwo[4],
          deckOne[0],deckOne[1],deckOne[2],deckOne[3],deckOne[4]);
      }
      if (deckTwo[4].value>deckOne[4].value) {
        playerWinnings.playerTwoWinnings.push(deckOne[0],deckOne[1],
          deckOne[2],deckOne[3],deckOne[4],
          deckTwo[0],deckTwo[1],deckTwo[2],deckTwo[3],deckTwo[4]);
      }
      playerDecks.playerOneDeck=playerDecks.playerOneDeck.slice(5);
      playerDecks.playerTwoDeck=playerDecks.playerTwoDeck.slice(5);
    }else {
      //flail
      playerDecks.playerOneDeck=playerDecks.playerOneDeck.slice(1);
      playerDecks.playerTwoDeck=playerDecks.playerTwoDeck.slice(1);
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

turn(playerDecks.playerOneDeck, playerDecks.playerTwoDeck);

console.log(playerWinnings);

$('#turn').on('click',function(){
  turn(deckOne,deckTwo);
  $('#rightDeckImage').attr('src','');
});
