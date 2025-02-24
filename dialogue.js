let dialogues = [];
let dialogueHistory = [];
let dialogueIndex = 0;

//load the dialogue from dialogue.json
async function loadDialogue() {
    const response = await fetch("JSON/dialogue.json");
    dialogues = await response.json();
    showDialogue(dialogues[dialogueIndex].id);
}

//present the dialogue onto the designated dialogue box
//updated to also show choice options when it occurs
function showDialogue(id) {
    const dialogueTextElement = document.getElementById("dialogueText");
    const choiceBox = document.getElementById("choiceBox");

    choiceBox.innerHTML = "";
    let currentDialogue = dialogues.find(d => d.id === id);

    if (!currentDialogue) return;

    dialogueTextElement.innerText = currentDialogue.text;
    dialogueHistory.push(currentDialogue.text);

    changeScene(id);

    if (currentDialogue.choices) {
        showChoices(currentDialogue.choices);
    }
}

//present choices in choice box
function showChoices(choices) {
    const choiceBox = document.getElementById("choiceBox");
    choiceBox.innerHTML = "";

    choices.forEach(choiceObj => {
        let choiceButton = document.createElement("button");
        choiceButton.innerText = choiceObj.text;
        choiceButton.onclick = () => selectChoice(choiceObj);
        choiceBox.appendChild(choiceButton);
    });
}

//logic for when user has to make a choice
function selectChoice(choiceObj) {
    const nextDialogue = dialogues.find(d => d.id === choiceObj.next);

    if (nextDialogue) {
        dialogueIndex = dialogues.indexOf(nextDialogue);
        showDialogue(nextDialogue.id);
    }
}

//function that progresses dialogue
function dialogueProgression() {
    let currentDialogue = dialogues[dialogueIndex];

    //if there are choices, stop the function to prevent progression
    if (currentDialogue.choices) {
        return;
    }
    //jump to the dialogue id if "next" is used
    else if (currentDialogue.next !== undefined) {
        dialogueIndex = dialogues.findIndex(d => d.id === currentDialogue.next);
        showDialogue(dialogues[dialogueIndex].id);
    }
    //progress dialogue linearly
    else if (dialogueIndex < dialogues.length - 1) {
        dialogueIndex++;
        showDialogue(dialogues[dialogueIndex].id);
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

	 const historyContent = document.createElement("div");
	 historyContent.id = "historyContent";
	 for (let i = 0; i < dialogueHistory.length; i++) {
	      const entry = document.createElement("p");
	      entry.className = "entry";
	      entry.innerText = dialogueHistory[i];
	      historyContent.appendChild(entry);
	 }
	 historyMenu.appendChild(historyContent);

	 const closeButton = document.createElement("button");
	 closeButton.id = "closeButton";
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

