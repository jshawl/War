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
    winnings.p2winnings.push(combatants.p2cmbtnts[0],combatants.p1cmbtnts[0]);
  } else {
    console.log('tie');
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
  return card.value + '_of_' + card.suit + '.png';
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

var assignImage = function(id,img){
  $(id).attr( 'src', 'cards/' + img);
};

var resetImage = function(id){
  $(id).attr( 'src', '');
};

divideDeck(shuffle(createDeck()));
assignImage('#leftDeckImage', 'card_back.png');
assignImage('#rightDeckImage', 'card_back.png');

console.log(decks);
console.log(combatants);
console.log(winnings);

$('#turn').on('click',function(){
  if (combatants.p1cmbtnts.length) {
    duel();
    if (winnings.p1winnings.length) {
      assignImage('#leftWinningsImage', getCardName(winnings.p1winnings[winnings.p1winnings.length-1]));
    }
    if (winnings.p2winnings.length) {
      assignImage('#rightWinningsImage', getCardName(winnings.p2winnings[winnings.p2winnings.length-1]));
    }
    resetImage('#leftCombatantImage');
    resetImage('#rightCombatantImage');
  } else if (!combatants.p1cmbtnts.length) {
    layCards();
    assignImage('#leftCombatantImage', getCardName(combatants.p1cmbtnts[0]));
    assignImage('#rightCombatantImage', getCardName(combatants.p2cmbtnts[0]));
  }
  if (decks.p1deck.length) {
    assignImage('#leftDeckImage', 'card_back.png');
    assignImage('#rightDeckImage', 'card_back.png');
  } else if (!decks.p1deck.length) {
    resetImage('#leftDeckImage');
    resetImage('#rightDeckImage');

  }
  console.log(decks);
  console.log(combatants);
  console.log(winnings);
});
