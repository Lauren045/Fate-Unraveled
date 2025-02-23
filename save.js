// Made 6 slots cuz seems reasonable
const num_slots = 6;

// This will bring up the save/load window up
function showSaveLoadWindow(isLoading = false) {
    // This will remove the window if it's already up
    const existingWindow = document.getElementById("saveLoadWindow");
    if (existingWindow) {
        existingWindow.remove();
    }

    // Pop the save/load window up
    const saveLoadWindow = document.createElement("div");
    saveLoadWindow.id = "saveLoadWindow";
    saveLoadWindow.style.position = "fixed";
    saveLoadWindow.style.top = "50%";
    saveLoadWindow.style.left = "50%";
    saveLoadWindow.style.transform = "translate(-50%, -50%)";
    saveLoadWindow.style.background = "white";
    saveLoadWindow.style.padding = "20px";
    saveLoadWindow.style.border = "2px solid black";
    saveLoadWindow.style.zIndex = "1000";
    saveLoadWindow.style.textAlign = "center";

    // Title
    const title = document.createElement("h2");
    title.innerText = isLoading ? "Load Game" : "Save Game";
    saveLoadWindow.appendChild(title);

    // Makes the slot buttons in the window and get the data ready
    for (let i = 1; i <= num_slots; i++) {
        let slotButton = document.createElement("button");
        let savedData = localStorage.getItem(`saveSlot${i}`);
        
        if (savedData) {
            let saveInfo = JSON.parse(savedData);
            slotButton.innerText = `Slot ${i}: Dialogue ${saveInfo.dialogueIndex}`;
        } else {
            slotButton.innerText = `Slot ${i}: Empty`;
        }

        slotButton.onclick = () => {
            if (isLoading) {
                loadGameFromSlot(i);
            } else {
                saveGameToSlot(i);
            }
            saveLoadWindow.remove(); // Closes the window when done
        };

        saveLoadWindow.appendChild(slotButton);
        saveLoadWindow.appendChild(document.createElement("br"));
    }

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.onclick = () => saveLoadWindow.remove();
    saveLoadWindow.appendChild(closeButton);

    // Append the window to document body
    document.body.appendChild(saveLoadWindow);
}

// This function saves game progress in a slot you clicked
function saveGameToSlot(slotNumber) {
    const saveData = {
        dialogueIndex: dialogueIndex, 
        dialogueHistory: dialogueHistory
    };
    localStorage.setItem(`saveSlot${slotNumber}`, JSON.stringify(saveData));
    localStorage.setItem("lastUsedSlot", slotNumber); // Store last used slot
    alert(`Game got saved in Slot ${slotNumber} dude!`);
}

// Load game progress from slot you clicked
function loadGameFromSlot(slotNumber) {
    const saveData = localStorage.getItem(`saveSlot${slotNumber}`);
    
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        dialogueIndex = parsedData.dialogueIndex;
        dialogueHistory = parsedData.dialogueHistory || [];
        showDialogue(dialogues[dialogueIndex].id);
        alert(`Loaded game from Slot ${slotNumber}`);
    } else {
        alert(`No save slot here bro in Slot ${slotNumber}`);
    }
}

// Put save button to open save window
document.getElementById("save").addEventListener("click", () => showSaveLoadWindow(false));

// Auto-load the last save when it's available
window.onload = function() {
    loadDialogue().then(() => {
        const lastSlot = localStorage.getItem("lastUsedSlot");
        if (lastSlot) {
            loadGameFromSlot(lastSlot);
        }
    });
};
