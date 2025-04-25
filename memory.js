const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap';
document.head.appendChild(fontLink);

const symbols = ['✾', '➶', '❖', '❦', '⌬', '✮', '♪', '☁'];
let cards = [...symbols, ...symbols];

const gameBoard = document.createElement("div");
gameBoard.className = "game-board";
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
                    showVictoryScreen(onCompleteCallback);
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

    const memoryOverlay = document.createElement("div");
    memoryOverlay.className = "memory-overlay";
    memoryOverlay.id = "memoryOverlay";
    document.body.appendChild(memoryOverlay);

    document.body.classList.add("memoryGame");
    gameBoard.innerHTML = '';
    document.body.appendChild(gameBoard);
    gameBoard.style.display = "grid";

    shuffle(cards).forEach(symbol => {
        gameBoard.appendChild(createCard(symbol));
    });

    const skipButton = document.createElement("button");
    skipButton.textContent = "Skip";
    skipButton.style.position = 'absolute';
    skipButton.style.top = '10px'
    skipButton.style.right = '10px'
    skipButton.style.fontSize = '15px';
    skipButton.style.zIndex = '10';

    skipButton.addEventListener("click", () => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('matched');
            card.classList.add('flipped');
            card.textContent = card.dataset.symbol;
        });

        gameBoard.style.display = "none";
        showVictoryScreen(onCompleteCallback);
        skipButton.style.display = "none";

    });

    document.body.appendChild(skipButton);
}

function showVictoryScreen(callback) {
    const victoryOverlay = document.createElement("div");
    victoryOverlay.className = "victory-overlay";

    const victoryText = document.createElement("div");
    victoryText.className = "victory-text";
    victoryText.textContent = "Memory Unlocked";

    victoryOverlay.appendChild(victoryText);
    document.body.appendChild(victoryOverlay);

    requestAnimationFrame(() => {
        victoryOverlay.classList.add("fade-in");
    });

    setTimeout(() => {
        document.getElementById("memoryOverlay")?.remove();
    }, 1000);

    function cleanup() {
        victoryOverlay.classList.remove("fade-in");
        victoryOverlay.classList.add("fade-out");

        setTimeout(() => {
            victoryOverlay.remove();
            document.body.classList.remove("memoryGame");
            if (callback) callback();
        }, 1000);
    }

    function handleInput() {
        document.removeEventListener("click", handleInput);
        document.removeEventListener("keydown", handleInput);
        cleanup();
    }

    document.addEventListener("click", handleInput);
    document.addEventListener("keydown", handleInput);
}
