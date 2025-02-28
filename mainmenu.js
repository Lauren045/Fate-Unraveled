document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settings");
    const loadGameButton = document.getElementById("loadGame");

    if (settingsButton) {
        settingsButton.addEventListener("click", showSettingsMenu);
    }

    if (loadGameButton) {
        loadGameButton.addEventListener("click", function () {
	    showSaveLoadWindow(true); // Opens the load window for real
	});
    }
});

// Function to show the Save/Load window
function showSaveLoadWindow(isLoading = false) {
    if (document.getElementById("saveLoadWindow")) return; // Prevent duplicate windows

    const saveLoadWindow = document.createElement("div");
    saveLoadWindow.id = "saveLoadWindow";
    saveLoadWindow.style.position = "fixed";
    saveLoadWindow.style.top = "50%";
    saveLoadWindow.style.left = "50%";
    saveLoadWindow.style.transform = "translate(-50%, -50%)";
    saveLoadWindow.style.width = "300px";
    saveLoadWindow.style.padding = "20px";
    saveLoadWindow.style.background = "white";
    saveLoadWindow.style.border = "2px solid black";
    saveLoadWindow.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    saveLoadWindow.style.textAlign = "center";
    saveLoadWindow.style.zIndex = "1000";

    const title = document.createElement("h2");
    title.innerText = isLoading ? "Load Game" : "Save Game";
    saveLoadWindow.appendChild(title);

    // Show the save/load window
    for (let i = 1; i <= 6; i++) {
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
            saveLoadWindow.remove(); // Close that window when you click it
        };

        saveLoadWindow.appendChild(slotButton);
        saveLoadWindow.appendChild(document.createElement("br"));
    }

    // Close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.onclick = () => saveLoadWindow.remove();
    saveLoadWindow.appendChild(closeButton);

    document.body.appendChild(saveLoadWindow);
}

// This loads the game from the selected slot
function loadGameFromSlot(slotNumber) {
    const saveData = localStorage.getItem(`saveSlot${slotNumber}`);

    if (saveData) {
        localStorage.setItem("lastUsedSlot", slotNumber); // stores the last slot
        let parsedData = JSON.parse(saveData);
        localStorage.setItem("dialogueIndex", parsedData.dialogueIndex); // saves dialogue position

        window.location.href = "game.html"; // Takes you to the game
    } else {
        alert(`No save data found in Slot ${slotNumber}`);
    }
}

document.getElementById("newGame").addEventListener("click", () => {
    localStorage.removeItem("lastUsedSlot"); // This clears the old save slot
    localStorage.setItem("dialogueIndex", 0);
    window.location.href = "game.html";
});

