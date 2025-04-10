let allies = [];
let enemies = [];
let kiernan = { "name": "Kiernan", "hp": 100, "mp": "50"};
let guinevere = { "name": "Guinevere", "hp": 100, "mp": "50"};
let zarek = { "name": "Zarek", "hp": 100, "mp": "50"};
let thug1 = { "name": "Thug1", "hp": 100};
let thug2 = { "name": "Thug2", "hp": 100};

function initializeBattle(battleIndex) {
    switch (battleIndex) {
        case 1:
            allies.push(kiernan);

            enemies.push(thug1);
            enemies.push(thug2);
            //temporary img file
            changeBattleBg("cat.jpg");
            break;

        default:
            break;
    }
    triggerBattle();
}

function changeBattleBg(imageFile) {
    let battleScreen = document.createElement("div");
    battleScreen.id = "battleScreen";
    document.body.appendChild(battleScreen);

    let battleBg = document.createElement("img");
    battleBg.id = "battleBg";
    battleBg.src = `assets/IMG/${imageFile}`;
    battleScreen.appendChild(battleBg);

    let allyContainer = document.createElement("div");
    allyContainer.id = "allyContainer";
    battleScreen.appendChild(allyContainer);

    let enemyContainer = document.createElement("div");
    enemyContainer.id = "enemyContainer";
    battleScreen.appendChild(enemyContainer);
}

function triggerBattle() {
    allies.forEach(ally => {
        let allyBox = document.createElement("div");
        allyBox.className = "allyBox";
        allyBox.innerHTML = ally.name;
        allyContainer.appendChild(allyBox);
    });

    enemies.forEach(enemy => {
        let enemyBox = document.createElement("div");
        enemyBox.className = "enemyBox";
        enemyBox.innerHTML = enemy.name;
        enemyContainer.appendChild(enemyBox);
    });

    const pressButton = document.createElement("button");
    pressButton.id = "pressButton";
    pressButton.innerText = "Battle";
    battleScreen.appendChild(pressButton);

    pressButton.addEventListener("click", function() {
	battleScreen.remove();
        document.getElementById("characterImages").style.display = "block";
        document.getElementById("dialogueBox").style.display = "block";
	document.getElementById("buttonContainer").style.display = "block";
    });
}
