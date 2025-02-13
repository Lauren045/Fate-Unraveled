let dialogues = [];
let dialogueIndex = 0;

//Load the dialogue from dialogue.json
async function loadDialogue() {
    const response = await fetch("JSON/dialogue.json");
    const data = await response.json();
    dialogues = data.dialogues;
    showDialogue();
}

function showDialogue() {
    const dialogueTextElement = document.getElementById("dialogueText");
    dialogueTextElement.innerText = dialogues[dialogueIndex];
}

function dialogueProgression() {
    dialogueIndex ++;

    if (dialogueIndex < dialogues.length) {
        showDialogue();
    }
}

function userInput(event) {
    if (event.key === " " || event.type === "click") {
        dialogueProgression();
    }
}

function autoplay() {
    let ifOn = false;
    let setAutoplayOn = null;

    document.getElementById("autoplay").addEventListener("click", function() {
         if (ifOn == false) {
             setAutoplayOn = setInterval(dialogueProgression, 3000);
             ifOn = true;
             document.getElementById("autoplay").innerText = "Autoplay On";
         }
         else {
             clearInterval(setAutoplayOn);
             ifOn = false;  
             document.getElementById("autoplay").innerText = "Autoplay Off";
         }        
    })
}

function skipforward() {
    // You skip all the way to the last dialogue
    document.getElementById("skipforward").addEventListener("click", function() {
    dialogueIndex = dialogues.length - 1;
    showDialogue();
    })
}

document.addEventListener("keydown", userInput);
document.addEventListener("click", userInput);

loadDialogue();
skipforward();
autoplay();
