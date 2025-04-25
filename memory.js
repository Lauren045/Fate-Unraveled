  const symbols = ['✾', '➶', '❖', '❦', '⌬', '🍉', '🍍', '🥝'];
  let cards = [...symbols, ...symbols]; // Duplicate for pairs
  cards = shuffle(cards);

  const gameBoard = document.createElement("div");
  gameBoard.className = "game-board";
  gameBoard.id = "gameBoard";
  gameBoard.style.display = "none";

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let onCompleteCallback = null;

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

        if (document.querySelectorAll('.matched').length === cards.length) {
          setTimeout(() => {
           gameBoard.style.display = "none";
           if (onCompleteCallback) onCompleteCallback();
          }, 1000);
        }

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

  function startMemoryGame(onComplete) {
    onCompleteCallback = onComplete;
    gameBoard.innerHTML = '';
    document.body.appendChild(gameBoard);
    gameBoard.style.display = "grid";
    shuffle(cards).forEach(symbol => {
      const card = createCard(symbol);
      gameBoard.appendChild(card);
    });
  }
