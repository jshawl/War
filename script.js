var decks = {
  p1deck:[],
  p2deck:[]
};

var combatants = {
  p1cmbtnts:[],
  p2cmbtnts:[]
};

var winnings = {
  p1winnings:[],
  p2winnings:[]
};

var createCard = function(value, suit){
  var newCard = {
    value : value,
    suit : suit,
  };
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
      decks.p1deck.push(deck[i]);
    } else {
      decks.p2deck.push(deck[i]);
    }
  }
};

var layCards = function(){
  combatants.p1cmbtnts.push(decks.p1deck[0]);
  decks.p1deck=decks.p1deck.slice(1);
  combatants.p2cmbtnts.push(decks.p2deck[0]);
  decks.p2deck=decks.p2deck.slice(1);
  console.log(combatants);
};

var duel = function(){
  if (combatants.p1cmbtnts[0].value>combatants.p2cmbtnts[0].value){
    winnings.p1winnings.push(combatants.p1cmbtnts[0],combatants.p2cmbtnts[0]);
  } else if (combatants.p2cmbtnts[0].value>combatants.p1cmbtnts[0].value) {
    winnings.p2winnings.push(combatants.p1cmbtnts[0],combatants.p2cmbtnts[0]);
  } else {
    resetCombatants();
  }
  resetCombatants();
};

var resetCombatants = function(){
  combatants.p1cmbtnts=[];
  combatants.p2cmbtnts=[];
};

var turn=function(){
  if (combatants.p2cmbtnts.length) {
    duel();
  }
  layCards();
  duel();
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
  $('#leftDeckImage').attr( 'src' , 'playing_cards/cards/' + getCardName(decks.p1deck[0]) + '.png');
};

var assignRightDeckImage = function(){
  $('#rightDeckImage').attr( 'src' , 'playing_cards/cards/' + getCardName(decks.p2deck[0]) + '.png');
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

console.log(decks);
console.log(combatants);
console.log(winnings);

$('#turn').on('click',function(){
  turn();
  console.log(decks);
  console.log(combatants);
  console.log(winnings);
});
