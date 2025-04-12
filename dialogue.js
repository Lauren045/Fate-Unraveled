let dialogues = [];
let dialogueHistory = [];
let isTyping = false; // Prevents skipping dialogue while typing
let typingTimeouts = []; // Stores all active timeouts to clear them if needed
let dialogueIndex = localStorage.getItem("dialogueIndex")
    ? parseInt(localStorage.getItem("dialogueIndex")) 
    : 0; // 0 if no save data exists
let alignment = {evil: 0, friendship: 0};
let flags = [];

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

// This will display each text letter
function typeText(element, text, speed = null, callback = null) {
    // Clear previous timeouts to prevent overlapping typing
    typingTimeouts.forEach(clearTimeout);
    typingTimeouts = []; // resets it

    element.innerHTML = ""; // Clears existing text
    let i = 0;
    isTyping = true; // Prevents dialogue progression until done

    // Default speed is 50ms
    let savedSpeed = localStorage.getItem("typingSpeed");
    speed = speed !== null ? speed: savedSpeed ? parseInt(savedSpeed) : 50;

    function type() {
        if (i < text.length) {
	    element.innerHTML += text[i];
            i++;
            let timeout = setTimeout(type, speed);
            typingTimeouts.push(timeout);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    type();
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

    document.getElementById("speedBurst").style.display = "none";

    let savedSpeed = parseInt(localStorage.getItem("typingSpeed")) || 50;
    //change the dialogue and push it into the dialogueHistory array
    typeText(dialogueTextElement, currentDialogue.text, savedSpeed, () => {
        isTyping = false; // Unlocks dialogue progression when typing is done
    });

    //if the index has a name property, change the name of the namebox
    if (currentDialogue.name !== undefined) {
        document.getElementById("characterName").innerText = currentDialogue.name;
        dialogueHistory.push({ type: "name", text: currentDialogue.name});
    }

    // puts the current dialogue text into the history
    dialogueHistory.push({ type: "dialogue", text: currentDialogue.text});

    //if the index has a background or character property, change bg or character
    //call changeBackground() and changeCharacter() in game.js
    if (currentDialogue.background) changeBackground(currentDialogue.background);
    if (currentDialogue.char != undefined) changeCharacter(currentDialogue.char);

    //if currentDialogue has choices, call showChoices and display them
    if (currentDialogue.choices) {
        showChoices(currentDialogue.choices);
        skipButton.disabled = true;
    } 
    else {
        skipButton.disabled = false;
    }

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
        else if (currentDialogue.effect === "speedBurst") {
            triggerFX("speedBurst");
        }
    }

    // triggers minigames
    if (currentDialogue.minigame) {
        document.getElementById("characterImages").style.display = "none";
        document.getElementById("dialogueBox").style.display = "none";
        document.getElementById("buttonContainer").style.display = "none";

	if (currentDialogue.minigame === "battle") {
            initializeBattle(1);
        }
    }

    // triggers the ending the player receives depending on choices
    if (currentDialogue.ending === "triggerEnding") {
        determineEnding();
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

    // increases a given alignment, giving the player a certain ending depending which alignment is highest
    if (choiceObj.alignment) {
        alignment[choiceObj.alignment]++;
    }
    
    // sets a flag so that the game remembers player's choices and changes the story accordingly
    if (choiceObj.setFlag) {
        flags.push(choiceObj.setFlag);
    }
}

//function that progresses dialogue
function dialogueProgression() {
    const dialogueTextElement = document.getElementById("dialogueText");
    let currentDialogue = dialogues[dialogueIndex];

    if (isTyping) {
        // If typing is ongoing, immediately finish the text
        isTyping = false;
        typingTimeouts.forEach(clearTimeout); // Stop further typing
        typingTimeouts = []; // Reset timeout tracking
        dialogueTextElement.textContent = currentDialogue.text;
        return;
    }

    //if there are choices, stop the function to prevent progression
    if (currentDialogue.choices) {
        return;
    }

    if (currentDialogue.checkFlag) {
        if (flags.includes(currentDialogue.checkFlag)) {
            dialogueIndex = dialogues.findIndex(d => d.goToFlag === currentDialogue.checkFlag);
            showScene(dialogueIndex);
        }
    }

    //jump to the dialogue id if the property "jump" is used
    else if (currentDialogue.jump !== undefined) {
        dialogueIndex = dialogues.findIndex(d => d.next === currentDialogue.jump);
        showScene(dialogueIndex);
    }
    //progress dialogue linearly
    else if (dialogueIndex < dialogues.length - 1) {
        dialogueIndex++;
        showScene(dialogueIndex);
    }
}

function determineEnding() {
    if (alignment.evil > alignment.friendship) {
        triggerEnding("evil");
    }
    else {
        triggerEnding("friendship");
    }
}

function triggerEnding(type) {
    const nextDialogue = dialogues.find(d => d.ending === type);

    if (nextDialogue) {
        dialogueIndex = dialogues.indexOf(nextDialogue);
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
