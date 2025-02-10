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

document.addEventListener("keydown", userInput);
document.addEventListener("click", userInput);

loadDialogue();
