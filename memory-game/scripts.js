const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; //first card is the card that the player must match with the second card

function flipCard() {
    if (lockBoard) return; //if lockBoard is true, stop the logic
    
    if (this === firstCard) return;

    this.classList.add('flip'); //give the card the 'flip' class

    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this; //set firstCard to the card that fired the event
    
        return;
    } 
        //second click
        secondCard = this;

        checkForMatch();
    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
     //when cards match
     firstCard.removeEventListener('click', flipCard);
     secondCard.removeEventListener('click', flipCard);

     resetBoard();
}

function unFlipCards() {

    lockBoard = true;

    //not a match
    //timeout when its not a match, flipping the cards back to their backface
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
            }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//this will be executed right as soon as it is defined
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))
;