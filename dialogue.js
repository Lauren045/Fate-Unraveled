let dialogues = [];
let dialogueHistory = [];
let dialogueIndex = 0;

//Load the dialogue from dialogue.json
async function loadDialogue() {
    const response = await fetch("JSON/dialogue.json");
    const data = await response.json();
    dialogues = data.dialogues;
    showDialogue();
}

//Present the dialogue onto the designated dialogue box
function showDialogue() {
    const dialogueTextElement = document.getElementById("dialogueText");
    dialogueTextElement.innerText = dialogues[dialogueIndex];

    //store the dialogue into the history
    dialogueHistory.push(dialogues[dialogueIndex]);
}

//Move on to the next line of dialogue
function dialogueProgression() {
    dialogueIndex ++;

    if (dialogueIndex < dialogues.length) {
        showDialogue();
    }
}

//Event listeners so that when user clicks dialogue box/presses space, dialogue progresses
document.getElementById("dialogueBox").addEventListener("click", function() {
    dialogueProgression();
});
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

