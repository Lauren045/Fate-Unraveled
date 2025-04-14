document.addEventListener("DOMContentLoaded", () => {
  const symbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍍', '🥝'];
  let cards = [...symbols, ...symbols]; // Duplicate for pairs
  cards = shuffle(cards);
  const gameBoard = document.getElementById('gameBoard');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '';

    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('matched') || card === firstCard) return;

      card.textContent = symbol;
      card.classList.add('flipped');
      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.textContent = '';
          secondCard.textContent = '';
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetTurn();
        }, 1000);
      }
    });

    return card;
  }
  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  function startGame() {
    gameBoard.innerHTML = '';
    shuffle(cards).forEach(symbol => {
      const card = createCard(symbol);
      gameBoard.appendChild(card);
    });
  }
  startGame();
});
