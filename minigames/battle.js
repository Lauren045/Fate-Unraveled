let allies = [];
let enemies = [];
let allyIndex = 0;
let enemyIndex = 0;
let kiernan = { "name": "Kiernan", "maxHp": 100, "hp": 100, "maxMp": "50", "mp": "50", "skills": [{"name": "Fireball", "damage": "12", "mp": 5}, {"name": "Dark Whip", "damage": "16", "mp": 8}], "isGuarded": false};
let guinevere = { "name": "Guinevere", "maxHp": 100, "hp": 100, "maxMp": "50", "mp": "50", "isGuarded": false};
let zarek = { "name": "Zarek", "maxHp": 100, "hp": 100, "maxMp": "50", "mp": "50", "isGuarded": false};
let thug1 = { "name": "Thug 1", "maxHp": 50, "hp": 50, "sprite": "hachiware.png"};
let thug2 = { "name": "Thug 2", "maxHp": 50, "hp": 50, "sprite": "usagi.png"};
let undead1 = { "name": "Zombie 1", "maxHp": 50, "hp": 50, "sprite": "usagi.png"};
let undead2 = { "name": "Zombie 2", "maxHp": 50, "hp": 50, "sprite": "hachiware.png"};

let battleMessage = document.getElementById("battleMessage");

function initializeBattle(battleIndex) {
    //clears data from the previous battle
    allies = [];
    enemies = [];
    document.getElementById("enemyInformation").innerHTML = "";
    document.getElementById("enemyContainer").innerHTML = "";
    document.getElementById("allyInformation").innerHTML = "";

    //brings up the battle screen
    document.getElementById("battleContainer").style.display = "block";

    switch (battleIndex) {
        case 1:
            allies.push(kiernan);
            enemies.push(thug1);
            enemies.push(thug2);

            createBattle("pom.jpg");
            battleMessage.innerText = "Thug 1 and Thug 2 appeared!";
            break;
        
        case 2:
            allies.push(kiernan);
            enemies.push(undead1);
            enemies.push(undead2);

            createBattle("pom.jpg");
            battleMessage.innerText = "Zombies have appeared!";
            break;

        default:
            break;
    }
    // temporary way to get out of battle
    const pressButton = document.createElement("button");
    pressButton.id = "pressButton";
    pressButton.innerText = "Battle";
    document.getElementById("battleContainer").appendChild(pressButton);

    pressButton.addEventListener("click", closeBattle);
    
    setTimeout(allyTurn, 2000);
}

function createBattle(backgroundFile) {
    const battleBg = document.createElement("img");
    battleBg.id = "battleBg";
    battleBg.src = `assets/IMG/${backgroundFile}`;
    document.getElementById("battleContainer").appendChild(battleBg);

    allies.forEach(ally => {
        let allyBox = document.createElement("div");
        let allyHealth = document.createElement("div");
        let allyMana = document.createElement("div");
    
        allyBox.className = "allyBox";
        allyBox.innerHTML = ally.name;
        allyHealth.innerText = `HP: ${ally.hp}/${ally.maxHp}`;
        allyHealth.style.marginLeft = "240px";
        allyMana.innerText = `MP: ${ally.mp}/${ally.maxMp}`;
        allyMana.style.marginLeft = "20px";

        // stores references in ally objects
        ally.allyHealthElement = allyHealth;
        ally.allyManaElement = allyMana;
        document.getElementById("allyInformation").appendChild(allyBox);
        allyBox.appendChild(allyHealth);
        allyBox.appendChild(allyMana);
    });

    enemies.forEach(enemy => {
        let enemyBox = document.createElement("div");
        let enemyHealth = document.createElement("div");
        let enemySprite = document.createElement("img");

        enemyBox.className = "enemyBox";
        enemySprite.className = "enemySprite";
        enemyBox.innerText = enemy.name;
        enemyHealth.innerText = enemy.hp + "/" + enemy.maxHp;
        enemySprite.src = `assets/IMG/${enemy.sprite}`;

        // store references in enemy objects
        enemy.enemyHealthElement = enemyHealth;
        enemy.spriteElement = enemySprite;

        document.getElementById("enemyInformation").appendChild(enemyBox);
        enemyBox.appendChild(enemyHealth);
        document.getElementById("enemyContainer").appendChild(enemySprite);
    });
}

function allyTurn() {
    if (allies[allyIndex].hp <= 0) {
        nextAllyTurn();
        return;
    }

    battleMessage.innerText = `${allies[allyIndex].name}'s Turn`;

    document.getElementById("attackButton").addEventListener("click", regularAttack);
    document.getElementById("skillsButton").addEventListener("click", bringUpSkills);
    document.getElementById("guardButton").addEventListener("click", guard);
}

function regularAttack() {
    document.getElementById("actionContainer").style.display = "none";
    chooseTarget(8, 0);
}

function bringUpSkills() {
    if (document.getElementById("skillsMenu")) return;

    const skillsMenu = document.createElement("div");
    skillsMenu.id = "skillsMenu";
    document.getElementById("battleContainer").appendChild(skillsMenu);
    document.getElementById("actionContainer").style.display = "none";
    
    const allySkills = allies[allyIndex].skills;
    allySkills.forEach(skill => {
        const skillElement = document.createElement("div");
        skillElement.innerText = `${skill.name} (${skill.mp} MP)`;
        skillElement.className = "skillsButtons";
        skillsMenu.appendChild(skillElement);

        skillElement.addEventListener("click", function() {
            if (allies[allyIndex].mp < skill.mp) {
                battleMessage.innerText = "Not enough mana.";
                return;
            }
            chooseTarget(skill.damage, skill.mp);
            skillsMenu.remove();
        });
    });
    const cancelButton = document.createElement("div");
    cancelButton.className = "cancelButton";
    cancelButton.innerText = "Cancel";
    skillsMenu.appendChild(cancelButton);
    cancelButton.addEventListener("click", function() {
        document.getElementById("actionContainer").style.display = "block";
        skillsMenu.remove();
    });
}

function guard() {
    allies[allyIndex].isGuarded = true;
    battleMessage.innerText = `${allies[allyIndex].name} has guarded.`;
    document.getElementById("actionContainer").style.display = "none";
    setTimeout(nextAllyTurn, 2000);
}

function chooseTarget(damagePoints, manaPoints) {
    if (document.getElementById("targetEnemyMenu")) return;

    const targetEnemyMenu = document.createElement("div");
    targetEnemyMenu.id = "targetEnemyMenu";
    document.getElementById("battleContainer").appendChild(targetEnemyMenu);

    enemies.forEach(enemy => {
        if (enemy.hp > 0) {
            let targetEnemy = document.createElement("div");
            targetEnemy.className = "targetEnemies";
            targetEnemy.innerText = enemy.name;
            targetEnemyMenu.appendChild(targetEnemy);

            targetEnemy.addEventListener("click", function() {
                let damage = damagePoints;
                enemy.hp -= damage;
                enemy.enemyHealthElement.innerText = enemy.hp + "/" + enemy.maxHp;
                battleMessage.innerText = `${allies[allyIndex].name} dealt ${damage} to ${enemy.name}`;
                allies[allyIndex].mp -= manaPoints;
                allies[allyIndex].allyManaElement.innerText = `MP: ${allies[allyIndex].mp}/${allies[allyIndex].maxMp}`;
                targetEnemyMenu.remove();
                if (enemy.hp <= 0) enemy.spriteElement.style.display = "none";

                if (enemies.every(enemy => enemy.hp <= 0)) {
                    battleMessage.innerText = "You win!";
                    setTimeout(closeBattle, 2000);
                }
                else setTimeout(nextAllyTurn, 2000);
            });
        }
    });

    const cancelButton = document.createElement("div");
    cancelButton.className = "cancelButton";
    cancelButton.innerText = "Cancel";
    targetEnemyMenu.appendChild(cancelButton);
    cancelButton.addEventListener("click", function() {
        document.getElementById("actionContainer").style.display = "block";
        targetEnemyMenu.remove();
    });
}

function nextAllyTurn() {
    allyIndex++;
    if (allyIndex >= allies.length) {
        allyIndex = 0;
        enemyTurn();
    }
    else allyTurn();
}

function enemyTurn() {
    if (enemies[enemyIndex].hp <= 0) {
        nextEnemyTurn();
        return;
    }

    let targetedAlly = Math.floor(Math.random() * (allies.length));
    let damage = Math.floor((Math.random() * 7) + 3);
    if (allies[targetedAlly].isGuarded == true) {
        damage -= 3;
        if (damage < 0) damage = 0;
    }
    allies[targetedAlly].hp -= damage;
    allies[targetedAlly].allyHealthElement.innerText = `${allies[targetedAlly].hp}/${allies[targetedAlly].maxHp}`;
    battleMessage.innerText = `${enemies[enemyIndex].name} dealt ${damage} to ${allies[targetedAlly].name}`;

    if (allies.every(ally => ally.hp <= 0)) {
        battleMessage.innerText = "All allies have fallen.";
        // put code for game over
    }
    else setTimeout(nextEnemyTurn, 2000);
}

function nextEnemyTurn() {
    enemyIndex++;
    if (enemyIndex >= enemies.length) {
        enemyIndex = 0;
        allies.forEach(ally => {
            ally.isGuarded = false;
        });
        document.getElementById("actionContainer").style.display = "block";
        allyTurn();
    }
    else enemyTurn();
}

function closeBattle() {
    document.getElementById("battleContainer").style.display = "none";
    document.getElementById("characterImagesContainer").style.display = "flex";
    document.getElementById("dialogueBox").style.display = "block";
    document.getElementById("buttonContainer").style.display = "flex";
	dialogueIndex++;
    showScene(dialogueIndex);
}