let dialogues = [];
let dialogueHistory = [];
let dialogueIndex = 0;
let selectedChoice = null;

//load the dialogue from dialogue.json
async function loadDialogue() {
    const response = await fetch("JSON/dialogue.json");
    const data = await response.json();
    dialogues = data.dialogues;
    showDialogue();
}

//present the dialogue onto the designated dialogue box
//updated to also show choice options when it occurs
function showDialogue() {
    const dialogueTextElement = document.getElementById("dialogueText");
    const choiceBox = document.getElementById("choiceBox");

    choiceBox.innerHTML = "";
    let currentDialogue = dialogues[dialogueIndex];

    if (!currentDialogue) return;

    dialogueTextElement.innerText = currentDialogue.text;
    dialogueHistory.push(currentDialogue.text);

    if (currentDialogue.choices) {
        showChoices(currentDialogue.choices);
    }
}

//present choices in choice box
function showChoices(choices) {
    const choiceBox = document.getElementById("choiceBox");

    choices.forEach((choiceObj, index) => {
        let choiceButton = document.createElement("button");
        choiceButton.innerText = choiceObj.text;
        choiceButton.onclick = function () {
            selectChoice(choiceObj);
        };
        choiceBox.appendChild(choiceButton);
    });
}

//logic for when user has to make a choice
function selectChoice(choiceObj) {
    if (!choiceObj || !choiceObj.next) {
        console.error("Invalid choice object or missing 'next' property");
        return;
    }

    const nextId = choiceObj.next;
    const nextDialogueIndex = dialogues.findIndex(dialogue => dialogue.id === nextId);

    if (nextDialogueIndex >= 0) {
        dialogueIndex = nextDialogueIndex;
        showDialogue();
    }
    else {
        console.error("dialogue with the specified 'id' not found.");
    }
}

//move on to the next line of dialogue
function dialogueProgression() {
    if (dialogueIndex < dialogues.length - 1) {
        dialogueIndex++;
        showDialogue();
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
         if (ifOn == false) {
	     // progresses dialogue every 3 seconds but will change later
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
    // You skip all the way to the last dialogue
    document.getElementById("skipForward").addEventListener("click", function() {
         dialogueIndex = dialogues.length - 1;
         showDialogue();
    })
}

function history() {
    document.getElementById("history").addEventListener("click", function() {
         const historyMenu = document.createElement("div");
	 historyMenu.id = "historyMenu";
         historyMenu.style.position = "fixed";
         historyMenu.style.width = "100%";
	 historyMenu.style.height = "100%";
	 historyMenu.style.margin = "0";
	 historyMenu.style.padding = "0";
	 historyMenu.style.color = "white";
	 historyMenu.style.background = "black";
	 historyMenu.style.zIndex = "1000";

	 const historyContent = document.createElement("div");
	 historyContent.id = "historyContent";
	 for (let i = 0; i < dialogueHistory.length; i++) {
	      const entry = document.createElement("p");
	      entry.innerText = dialogueHistory[i];
	      historyContent.appendChild(entry);
	 }
	 historyMenu.appendChild(historyContent);
	 	 
	 const closeButton = document.createElement("button");
	 closeButton.innerText = "Close";
	 closeButton.onclick = function() {
	      document.body.removeChild(historyMenu);
	 }
	 historyMenu.appendChild(closeButton);

	 document.body.appendChild(historyMenu);
    })
}

loadDialogue();
autoplay();
skipForward();
history();

