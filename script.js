const board = document.getElementById('game-board');
const letters = 'A B C D E F G H'.split('');
const cards = [...letters, ...letters]; // Make pairs
cards.sort(() => 0.5 - Math.random()); // Shuffle

let flippedCards = [];
let lockBoard = false;

cards.forEach(letter => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.innerText = ''; // Hidden initially

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.letter;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true;

      const [card1, card2] = flippedCards;

      if (card1.dataset.letter === card2.dataset.letter) {
        flippedCards = [];
        lockBoard = false;
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.innerText = '';
          card2.innerText = '';
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});