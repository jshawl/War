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

// can you think of a way to combine the above three objects?
// maybe:
// var war = {
//   deck: [],
//   players: [
//     {name: "Jesse", hand: [] }
//   ],
//   winners: []
// }

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
}; //excellent!

var divideDeck = function(deck){
  for (var i = 0; i < deck.length ; i++) {
    if (i%2===0) {
      decks.p1deck.push(deck[i]);
    } else {
      decks.p2deck.push(deck[i]);
    }
  }
}; // I recommend putting the entire build deck functionality into a single function.
// Once this is working, you can encapsulate its behavior from the rest of your code.

var layCards = function(){
  combatants.p1cmbtnts.push(decks.p1deck[0]);
  decks.p1deck=decks.p1deck.slice(1);
  combatants.p2cmbtnts.push(decks.p2deck[0]);
  decks.p2deck=decks.p2deck.slice(1);
  console.log(combatants);
};

var duel = function(){
  // code comments would be useful to hear to explain how this code works.
  if (combatants.p1cmbtnts[combatants.p1cmbtnts.length-1].value>combatants.p2cmbtnts[combatants.p2cmbtnts.length-1].value){
    winnings.p1winnings.push(combatants.p1cmbtnts[0],combatants.p2cmbtnts[0]);
  } else if (combatants.p2cmbtnts[combatants.p2cmbtnts.length-1].value>combatants.p1cmbtnts[combatants.p1cmbtnts.length-1].value) {
    winnings.p2winnings.push(combatants.p2cmbtnts[0],combatants.p1cmbtnts[0]);
  } else {
    console.log('tie');
    tie();
  }
  resetCombatants();
};

var tie = function(){
  // i.e. how is tie different from duel? maybe a better name would be checkIfTie()
  var cardsLeft = decks.p1deck.length;
  if (cardsLeft<4) {
    for (var a = 0; a < cardsLeft; a++) {
      layCards();
    }
  } else {
    for (var u = 0; u < 4; u++) {
      layCards();
    }
  }
  if (combatants.p1cmbtnts[combatants.p1cmbtnts.length-1].value>
    combatants.p2cmbtnts[combatants.p2cmbtnts.length-1].value){
      //TODO write function to push cards // nice!
    for (var i = 0; i < combatants.p1cmbtnts.length; i++) {
      winnings.p1winnings.push(combatants.p1cmbtnts[i],combatants.p2cmbtnts[i]);
    }
  } else if (combatants.p2cmbtnts[combatants.p2cmbtnts.length-1].value>
    combatants.p1cmbtnts[combatants.p1cmbtnts.length-1].value) {
    for (var j = 0; j < combatants.p1cmbtnts.length; j++) {
      winnings.p1winnings.push(combatants.p1cmbtnts[j],
        combatants.p2cmbtnts[j]);
    }
  }
};

var resetCombatants = function(){
  combatants.p1cmbtnts=[];
  combatants.p2cmbtnts=[];
};

var resetWinners = function(){
  winnings.p1winnings=[];
  winnings.p2winnings=[];
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
  // very clever! This is the right way to do it in my opinion.
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
  $('#leftCounter').text('x '+winnings.p1winnings.length);
  $('#rightCounter').text('x '+winnings.p2winnings.length);
  if (!decks.p1deck.length && !combatants.p1cmbtnts.length) {
    if (winnings.p1winnings.length>winnings.p2winnings.length) {
      alert('player one wins!');
    } else if (winnings.p2winnings.length>winnings.p1winnings.length) {
      alert('player two wins!');
    } else {
      alert('tie!');
    }
  }
  // I'm having a bit of trouble understanding how the above code works. Again, code comments would be useful here
  console.log(decks);
  console.log(combatants);
  console.log(winnings);
});

// please remove unused code before submitting in the future.
// $('#reset').on('click',function(){
//   resetCombatants();
//
//   divideDeck(shuffle(createDeck()));
//   assignImage('#leftDeckImage', 'card_back.png');
//   assignImage('#rightDeckImage', 'card_back.png');
// });
