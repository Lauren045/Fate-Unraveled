let dialogues = [];
let dialogueHistory = [];
let dialogueIndex = localStorage.getItem("dialogueIndex")
    ? parseInt(localStorage.getItem("dialogueIndex")) 
    : 0; // 0 if no save data exists
document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settings");

    if (settingsButton) {
        settingsButton.addEventListener("click", showSettingsMenu);
    }
});

//load the dialogue from dialogue.json
async function loadDialogue() {
    const response = await fetch("JSON/dialogue.json");
    dialogues = await response.json();
    showScene(dialogueIndex);
}

//function that shows the dialogue, name, and choices and changes the backgrounds, characters,
//and other visual elements based on the properties of the index in the array
function showScene(index) {
    const dialogueTextElement = document.getElementById("dialogueText");
    const choiceBox = document.getElementById("choiceBox");
    const skipButton = document.getElementById("skipForward");

    choiceBox.innerHTML = "";
    let currentDialogue = dialogues[index];
    if (!currentDialogue) return;

    //if the index has a name property, change the name of the namebox
    if (currentDialogue.name !== undefined) {
        document.getElementById("characterName").innerText = currentDialogue.name;
        dialogueHistory.push({ type: "name", text: currentDialogue.name});
    }

    //if the index has a background property, change the background
    //call changeBackground() in game.js
    if (currentDialogue.background) changeBackground(currentDialogue.background);
    //if the index has a char property, change the character sprite
    //if the char property is defined but empty, remove the character sprite
    //call changeCharacter() in game.js
    if (currentDialogue.char != undefined) changeCharacter(currentDialogue.char);

    //change the dialogue and push it into the dialogueHistory array
    dialogueTextElement.innerText = currentDialogue.text;
    dialogueHistory.push({ type: "dialogue", text: currentDialogue.text});

    if (currentDialogue.effect) {
        if (currentDialogue.effect === "flash") {
            triggerFX("flash");
        }
        else if (currentDialogue.effect === "fadeIn") {
            triggerFX("fadeIn");
        }
        else if (currentDialogue.effect === "fadeOut") {
            triggerFX("fadeOut");
        }
        else if (currentDialogue.effect === "shake") {
            triggerShake();
        }
    }

    //if currentDialogue has choices, call showChoices and display them
    if (currentDialogue.choices) {
        showChoices(currentDialogue.choices);
	skipButton.disabled = true;
    } else {
	skipButton.disabled = false;
    }
}

//present choices in choice box
function showChoices(choices) {
    const choiceBox = document.getElementById("choiceBox");
    choiceBox.innerHTML = "";

    choices.forEach(choiceObj => {
        let choiceButton = document.createElement("button");
        choiceButton.innerText = choiceObj.text;
        choiceButton.onclick = () => {
	    dialogueHistory.push({ type: "choice", text: choiceObj.text});
	    selectChoice(choiceObj);
	}
        choiceBox.appendChild(choiceButton);
    });
}

//logic for when user has to make a choice
function selectChoice(choiceObj) {
    const nextDialogue = dialogues.find(d => d.next === choiceObj.jump);

    if (nextDialogue) {
        dialogueIndex = dialogues.indexOf(nextDialogue);
        showScene(dialogueIndex);

	// Re-enables the skip button
	document.getElementById("skipForward").disabled = false;
    }
}

//function that progresses dialogue
function dialogueProgression() {
    let currentDialogue = dialogues[dialogueIndex];

    //if there are choices, stop the function to prevent progression
    if (currentDialogue.choices) {
        return;
    }

    //jump to the dialogue id if the property "jump" is used
    if (currentDialogue.jump !== undefined) {
        dialogueIndex = dialogues.findIndex(d => d.next === currentDialogue.jump);
        showScene(dialogueIndex);
    }
    //progress dialogue linearly
    else if (dialogueIndex < dialogues.length - 1) {
        dialogueIndex++;
        showScene(dialogueIndex);
    }
}

//event listeners so that when user clicks dialogue box/presses space, dialogue progresses
document.getElementById("dialogueBox").addEventListener("click", dialogueProgression);
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        dialogueProgression();
    }
});

function autoplay() {
    let ifOn = false;
    let setAutoplayOn = null;

    document.getElementById("autoplay").addEventListener("click", function() {
         if (!ifOn) {
	     // progresses the dialogue every 3 seconds
             setAutoplayOn = setInterval(dialogueProgression, 3000);
             ifOn = true;
	     // text changing is a placeholder
             document.getElementById("autoplay").innerText = "Autoplay On";
         }
         else {
             clearInterval(setAutoplayOn);
             ifOn = false;
             document.getElementById("autoplay").innerText = "Autoplay Off";
         }
    })
}

function skipForward() {
    let isSkipping = false;
    let skipInterval = null;

    document.getElementById("skipForward").addEventListener("click", function() {
        if (!isSkipping) {
            skipInterval = setInterval(function() {
                let currentDialogue = dialogues[dialogueIndex];

                // Stop skipping if choices appear
                if (currentDialogue.choices) {
                    clearInterval(skipInterval);
                    isSkipping = false;
                    document.getElementById("skipForward").innerText = "Skip Forward";
                    return;
                }

                dialogueProgression();
            }, 100);

            isSkipping = true;
            document.getElementById("skipForward").innerText = "Skipping...";
        } 
        else {
            // Stop skipping when clicked again
            clearInterval(skipInterval);
            isSkipping = false;
            document.getElementById("skipForward").innerText = "Skip Forward";
        }
    });
}

function history() {
    document.getElementById("history").addEventListener("click", function() {
         const historyMenu = document.createElement("div");
	 historyMenu.id = "historyMenu";

	 const historyContent = document.createElement("div");
	 historyContent.id = "historyContent";
	 // loops through each entry in dialogueHistory and prints it out
	 for (let i = 0; i < dialogueHistory.length; i++) {
	      const entry = document.createElement("p");
	      entry.style.marginTop = "4%";
	      entry.innerText = dialogueHistory[i].text;
	      historyContent.appendChild(entry);
	
	      // if the type is "name", change the apperance
	      if (dialogueHistory[i].type === "name") {
		  entry.style.fontWeight = "bold";
		  entry.style.color = "green";
	      }
	      // if the type is "choice", change the apperance
	      else if (dialogueHistory[i].type === "choice") {
		  entry.style.color = "red";
	      }
	 }
	 historyMenu.appendChild(historyContent);

	 // creates the close button
	 const closeButton = document.createElement("button");
	 closeButton.id = "closeButton";
	 closeButton.innerText = "Close";
	 closeButton.onclick = function() {
	      document.body.removeChild(historyMenu);
	 }
	 historyMenu.appendChild(closeButton);

	 // append everything to the body of the website
	 document.body.appendChild(historyMenu);
    })
}

loadDialogue();
autoplay();
skipForward();
history();
