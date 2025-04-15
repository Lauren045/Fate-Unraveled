let allies = [];
let enemies = [];
let allyIndex = 0;
let battleMessage = document.createElement("div");
let kiernan = { "name": "Kiernan", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let guinevere = { "name": "Guinevere", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let zarek = { "name": "Zarek", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let thug1 = { "name": "Thug 1", "maxHp": "100", "hp": 100};
let thug2 = { "name": "Thug 2", "maxHp": "100", "hp": 100};

function initializeBattle(battleIndex) {
    switch (battleIndex) {
        case 1:
            allies.push(kiernan);

            enemies.push(thug1);
            enemies.push(thug2);
            //temporary img file
            createBattle("pom.jpg", "usagi.png");
            battleMessage.innerText = "Thug 1 and Thug 2 appeared!";
            break;

        default:
            break;
    }
    firstTurn();
}

function createBattle(backgroundFile, enemyFile) {
    const battleScreen = document.createElement("div");
    battleScreen.id = "battleScreen";
    battleMessage.id = "battleMessage";
    document.body.appendChild(battleScreen);
    battleScreen.appendChild(battleMessage);

    const battleBg = document.createElement("img");
    battleBg.id = "battleBg";
    battleBg.src = `assets/IMG/${backgroundFile}`;
    battleScreen.appendChild(battleBg);

    const enemyInformation = document.createElement("div");
    enemyInformation.id = "enemyInformation";
    battleScreen.appendChild(enemyInformation);

    const enemyContainer = document.createElement("div");
    enemyContainer.id = "enemyContainer";
    battleScreen.appendChild(enemyContainer);

    enemies.forEach(enemy => {
        let enemyBox = document.createElement("div");
        let enemyHealth = document.createElement("div");
        let enemySprite = document.createElement("img");

        enemyBox.className = "enemyBox";
        enemySprite.className = "enemySprite";
        enemyBox.innerText = enemy.name;
        enemyHealth.innerText = enemy.maxHp + "/" + enemy.hp;
        enemySprite.src = `assets/IMG/${enemyFile}`;

        enemyInformation.appendChild(enemyBox);
        enemyBox.appendChild(enemyHealth);
        enemyContainer.appendChild(enemySprite);
    });
}

function firstTurn() {
    // temporary way to get out of battle
    const pressButton = document.createElement("button");
    pressButton.id = "pressButton";
    pressButton.innerText = "Battle";
    battleScreen.appendChild(pressButton);

    pressButton.addEventListener("click", function() {
	    battleScreen.remove();
        document.getElementById("characterImagesContainer").style.display = "flex";
        document.getElementById("dialogueBox").style.display = "block";
	    document.getElementById("buttonContainer").style.display = "block";
    });

    const allyContainer = document.createElement("div");
    allyContainer.id = "allyContainer";
    battleScreen.appendChild(allyContainer);

    const allyInformation = document.createElement("div");
    allyInformation.id = "allyInformation";
    allyContainer.appendChild(allyInformation);

    allies.forEach(ally => {
        let allyBox = document.createElement("div");
        let allyHealth = document.createElement("div");
        let allyMana = document.createElement("div");
    
        allyBox.className = "allyBox";
        allyBox.innerHTML = ally.name;
        allyHealth.innerText = "HP: " + ally.maxHp + "/" + ally.hp;
        allyHealth.style.marginLeft = "240px";
        allyMana.innerText = "MP: " + ally.maxMp + "/" + ally.mp;
        allyMana.style.marginLeft = "20px";
        allyInformation.appendChild(allyBox);
        allyBox.appendChild(allyHealth);
        allyBox.appendChild(allyMana);
    });

    const actionContainer = document.createElement("div");
    actionContainer.id = "actionContainer";
    allyContainer.appendChild(actionContainer);

    const attackButton = document.createElement("div");
    attackButton.id = "attackButton";
    attackButton.className = "battleButtons";
    attackButton.innerText = "Attack";
    actionContainer.appendChild(attackButton);

    const skillsButton = document.createElement("div");
    skillsButton.id = "skillsButton";
    skillsButton.className = "battleButtons";
    skillsButton.innerText = "Skills";
    actionContainer.appendChild(skillsButton);

    const guardButton = document.createElement("div");
    guardButton.id = "guardButton";
    guardButton.className = "battleButtons";
    guardButton.innerText = "Guard";
    actionContainer.appendChild(guardButton);

    //document.getElementById("attackButton").addEventListener("click", regularAttack);
    //document.getElementById("skillsButton").addEventListener("click", bringUpSkills());
    //document.getElementById("guardButton").addEventListener("click", guard());
}
