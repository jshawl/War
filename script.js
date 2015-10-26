
var card = {
  value : null,
  suit : null,
};

var createCard = function(value){
  var newCard=card;
  console.log(newCard);
  newCard.value=value;
  return newCard;
};

console.log(createCard(3));

var createDeck = function(){

};
