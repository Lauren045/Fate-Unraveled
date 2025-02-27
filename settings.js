// When page loads, the settings will be applied
function applySavedSettings() {
    const savedFontSize = localStorage.getItem("fontSize") || "16";
    const dialogueText = document.getElementById("dialogueText");

    if (dialogueText) {
        dialogueText.style.fontSize = `${savedFontSize}px`;
    }
}

// Call this function when the page loads
window.onload = function () {
    applySavedSettings();
};

function showSettingsMenu() {
    // this checks if the settings menu already existed
    if (document.getElementById("settingsMenu")) return;

    // bring the settings menu up, pretty simple
    const settingsMenu = document.createElement("div");
    settingsMenu.id = "settingsMenu";
    settingsMenu.style.position = "fixed";
    settingsMenu.style.top = "50%";
    settingsMenu.style.left = "50%";
    settingsMenu.style.transform = "translate(-50%, -50%)";
    settingsMenu.style.width = "300px";
    settingsMenu.style.padding = "20px";
    settingsMenu.style.background = "white";
    settingsMenu.style.border = "2px solid black";
    settingsMenu.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    settingsMenu.style.textAlign = "center";
    settingsMenu.style.zIndex = "1000";

    // Load saved settings
    const savedFontSize = localStorage.getItem("fontSize") || "16";
    const savedSoundSetting = localStorage.getItem("soundEnabled") === "true";

    // florencia, this is how you make the title for settings
    const title = document.createElement("h2");
    title.innerText = "Settings";
    settingsMenu.appendChild(title);

    // Sound Button
    const soundToggle = document.createElement("button");
    soundToggle.innerText = savedSoundSetting ? "Sound: ON" : "Sound: OFF";
    soundToggle.style.display = "block";
    soundToggle.style.margin = "10px auto";
    soundToggle.onclick = function () {
        const newSetting = soundToggle.innerText === "Sound: OFF";
        soundToggle.innerText = newSetting ? "Sound: ON" : "Sound: OFF";
    };
    settingsMenu.appendChild(soundToggle);

    // Title for font size
    const fontSizeLabel = document.createElement("label");
    fontSizeLabel.innerText = "Font Size:";
    fontSizeLabel.style.display = "block";
    fontSizeLabel.style.marginTop = "10px";
    settingsMenu.appendChild(fontSizeLabel);

    // The font size slider
    const fontSizeSlider = document.createElement("input");
    fontSizeSlider.type = "range";
    fontSizeSlider.min = "12";
    fontSizeSlider.max = "30";
    fontSizeSlider.value = savedFontSize
    fontSizeSlider.style.display = "block";
    fontSizeSlider.style.margin = "10px auto";
    settingsMenu.appendChild(fontSizeSlider);

    // Shows the current size right now
    const fontSizeDisplay = document.createElement("span");
    fontSizeDisplay.innerText = `Current: ${fontSizeSlider.value}px`;
    settingsMenu.appendChild(fontSizeDisplay);

    fontSizeSlider.oninput = function () {
        fontSizeDisplay.innerText = `Current: ${fontSizeSlider.value}px`;
        const dialogueText = document.getElementById("dialogueText");
        if (dialogueText) {
            dialogueText.style.fontSize = `${fontSizeSlider.value}px`;
        }
    };

    // Save Settings Button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save Settings";
    saveButton.style.display = "block";
    saveButton.style.margin = "10px auto";
    saveButton.onclick = function () {
        localStorage.setItem("fontSize", fontSizeSlider.value);
        localStorage.setItem("soundEnabled", soundToggle.innerText === "Sound: ON");
        alert("Settings saved!");
    };
    settingsMenu.appendChild(saveButton);

    // Main menu button
    const mainMenuButton = document.createElement("button");
    mainMenuButton.innerText = "Main Menu";
    mainMenuButton.style.display = "block";
    mainMenuButton.style.margin = "10px auto";
    mainMenuButton.onclick = function () {
        localStorage.setItem("fontSize", fontSizeSlider.value);
        localStorage.setItem("soundEnabled", soundToggle.innerText === "Sound: ON");
        window.location.href = "index.html";
    };
    settingsMenu.appendChild(mainMenuButton);

    // close the button, pretty easy
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.display = "block";
    closeButton.style.margin = "15px auto 0";
    closeButton.onclick = function () {
         document.body.removeChild(settingsMenu);
    };
    settingsMenu.appendChild(closeButton);

    // this is where you append EVERYTHING for settingsMenu to work
    document.body.appendChild(settingsMenu);

    // Get the saved font size to dialogue text immediately
    const dialogueText = document.getElementById("dialogueText");
    if (dialogueText) {
        dialogueText.style.fontSize = `${savedFontSize}px`;
    }
}
