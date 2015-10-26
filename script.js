
var createCard = function(value){
  var newCard = {
    value : null,
    suit : null,
  };
  newCard.value=value;
  return newCard;
};

var createDeck = function(){
  var newDeck=[];
  console.log(newDeck);
  for (var i = 2; i <= 14; i++) {
    var newCard = createCard(i);
    console.log(newCard);
    newDeck.push(newCard);
    console.log(newDeck);
  }
  return newDeck;
};

createDeck();
