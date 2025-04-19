// javascript file for the battle minigame
// Author: Lauren Huynh

let allies = [];
let enemies = [];
let allyIndex = 0;
let kiernan = { "name": "Kiernan", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let guinevere = { "name": "Guinevere", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let zarek = { "name": "Zarek", "maxHp": "100", "hp": 100, "maxMp": "50", "mp": "50"};
let thug1 = { "name": "Thug 1", "maxHp": "100", "hp": 100, "sprite": "hachiware.png"};
let thug2 = { "name": "Thug 2", "maxHp": "100", "hp": 100, "sprite": "usagi.png"};

function initializeBattle(battleIndex) {
    document.getElementById("battleContainer").style.display = "block";

    switch (battleIndex) {
        case 1:
            allies.push(kiernan);

            enemies.push(thug1);
            enemies.push(thug2);
            //temporary img file
            changeBattleBg("pom.jpg");
            createEnemies();
            document.getElementById("battleMessage").innerText = "Thug 1 and Thug 2 appeared!";
            break;

        default:
            break;
    }
    // temporary way to get out of battle
    const pressButton = document.createElement("button");
    pressButton.id = "pressButton";
    pressButton.innerText = "Battle";
    //battleContainer.appendChild(pressButton);
    document.getElementById("battleContainer").appendChild(pressButton);

    pressButton.addEventListener("click", function() {
	document.getElementById("battleContainer").style.display = "none";
        document.getElementById("enemyInformation").innerHTML = "";
        document.getElementById("enemyContainer").innerHTML = "";
        document.getElementById("allyInformation").innerHTML = "";

        document.getElementById("characterImagesContainer").style.display = "flex";
        document.getElementById("dialogueBox").style.display = "block";
	document.getElementById("buttonContainer").style.display = "flex";
        allies = [];
        enemies = [];
	dialogueIndex++;
        showScene(dialogueIndex);
    });
    
    firstTurn();
}

function changeBattleBg(backgroundFile) {
    const battleBg = document.createElement("img");
    battleBg.id = "battleBg";
    battleBg.src = `assets/IMG/${backgroundFile}`;
    document.getElementById("battleContainer").appendChild(battleBg);
}

function createEnemies() {
    enemies.forEach(enemy => {
        let enemyBox = document.createElement("div");
        let enemyHealth = document.createElement("div");
        let enemySprite = document.createElement("img");

        enemyBox.className = "enemyBox";
        enemySprite.className = "enemySprite";
        enemyBox.innerText = enemy.name;
        enemyHealth.innerText = enemy.hp + "/" + enemy.maxHp;
        enemySprite.src = `assets/IMG/${enemy.sprite}`;

        // stores a reference in enemy objects
        enemy.enemyHealthElement = enemyHealth;

        document.getElementById("enemyInformation").appendChild(enemyBox);
        enemyBox.appendChild(enemyHealth);
        document.getElementById("enemyContainer").appendChild(enemySprite);
    });
}

function firstTurn() {
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

    document.getElementById("attackButton").addEventListener("click", regularAttack);
    document.getElementById("skillsButton").addEventListener("click", bringUpSkills);
    //document.getElementById("guardButton").addEventListener("click", guard());
}

function regularAttack() {
    chooseTarget(0);
    // code for going to the next turn
}


function bringUpSkills() {
    //check for whose skills menu to bring up
    const skillsMenu = document.createElement("div");
    skillsMenu.id = "skillsMenu";
    document.getElementById("battleContainer").appendChild(skillsMenu);

    const fireball = document.createElement("div");
    const darkwhip = document.createElement("div");
    fireball.innerText = "Fireball";
    darkwhip.innerText = "Dark Whip";
    fireball.className = "skillsButtons";
    darkwhip.className = "skillsButtons";
    skillsMenu.appendChild(fireball);
    skillsMenu.appendChild(darkwhip);

    fireball.addEventListener("click", function() {
        chooseTarget(5);
        skillsMenu.remove();
    });

    darkwhip.addEventListener("click", function() {
        chooseTarget(7);
        skillsMenu.remove();
    });
    
    //in future, check for whose skills menu to bring up
}

function chooseTarget(manaPoints) {
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
                damage = Math.floor((Math.random() * 10) + 1);
                enemy.hp -= damage;
                enemy.enemyHealthElement.innerText = enemy.hp + "/" + enemy.maxHp;
                document.getElementById("battleMessage").innerText = `Dealt ${damage} to ${enemy.name}`;
                kiernan.mp -= manaPoints;
                kiernan.allyManaElement.innerText = `MP: ${kiernan.mp}/${kiernan.maxMp}`;
                targetEnemyMenu.remove();
            });
        }
    })
}
