var playerDecks = {
  playerOneDeck:[],
  playerTwoDeck:[]
};

var combatants = {
  playerOneCombatants:[],
  playerTwoCombatants:[]
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
      suit='hearts';
    } else if ( i===1 ) {
      suit='diamonds';
    } else if ( i===2 ) {
      suit='spades';
    } else if ( i===3 ) {
      suit='clubs';
    }
    for (var j = 2; j <= 10; j++) {
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

var layCards = function(){
  combatants.playerOneCombatants.push(playerDecks.playerOneDeck[0]);
  playerDecks.playerOneDeck=playerDecks.playerOneDeck.slice(1);
  combatants.playerTwoCombatants.push(playerDecks.playerTwoDeck[0]);
  playerDecks.playerTwoDeck=playerDecks.playerTwoDeck.slice(1);
};

var determineWinner = function(){
  if (combatants.playerOneCombatants[0].value>
    combatants.playerTwoCombatants[0].value) {
    playerWinnings.playerOneWinnings.push(combatants.playerTwoCombatants[0],combatants.playerOneCombatants[0]);
    resetCombatants();
  } else if (combatants.playerTwoCombatants[0].value>
    combatants.playerOneCombatants[0].value) {
    playerWinnings.playerTwoWinnings.push(combatants.playerOneCombatants[0],combatants.playerTwoCombatants[0]);
    resetCombatants();
  } else {
    console.log('tie');
      resetCombatants();
  }
};

var resetCombatants = function(){
  combatants.playerOneCombatants=[];
  combatants.playerTwoCombatants=[];
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
  return card.value + '_of_' + card.suit;
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

var assignLeftDeckImage = function(){
  $('#leftDeckImage').attr( 'src' , 'playing_cards/cards/' + getCardName(playerDecks.playerOneDeck[0]) + '.png');
};

var assignRightDeckImage = function(){
  $('#rightDeckImage').attr( 'src' , 'playing_cards/cards/' + getCardName(playerDecks.playerTwoDeck[0]) + '.png');
};

var assignLeftWinningsImage = function(imgSource){
  $('#leftWinningsImage').attr( 'src' , imgSource);
};

var assignRightWinningsImage = function(imgSource){
  $('#rightWinningsImage').attr( 'src' , imgSource);
};

var assignImage = function(id,img){
  $(id).attr( 'src' , img);
};

divideDeck(shuffle(createDeck()));

console.log(playerDecks);
console.log(combatants);
console.log(playerWinnings);

$('#turn').on('click',function(){
  layCards();
  determineWinner();
  console.log(playerDecks);
  console.log(combatants);
  console.log(playerWinnings);
});
