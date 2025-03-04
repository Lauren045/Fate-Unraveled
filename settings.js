// When page loads, the settings will be applied
function applySavedSettings() {
    const savedFontSize = localStorage.getItem("fontSize") || "30";
    const savedVolume = localStorage.getItem("soundVolume") || "100";
    const dialogueText = document.getElementById("dialogueText");
    const bgMusic = document.getElementById("bgMusic");

    if (dialogueText) {
        dialogueText.style.fontSize = `${savedFontSize}px`;
    }

    if (bgMusic) {
	bgMusic.volume = savedVolume / 200;
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
    const savedVolume = localStorage.getItem("soundVolume") || "100";

    // florencia, this is how you make the title for settings
    const title = document.createElement("h2");
    title.innerText = "Settings";
    settingsMenu.appendChild(title);

    // Title for song slider
    const volumeLabel = document.createElement("label");
    volumeLabel.innerText = "Sound Volume:";
    volumeLabel.style.display = "block";
    volumeLabel.style.marginTop = "10px";
    settingsMenu.appendChild(volumeLabel);

    // The Sound slider
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "200";
    volumeSlider.value = savedVolume;
    volumeSlider.style.display = "block";
    volumeSlider.style.margin = "10px auto";
    settingsMenu.appendChild(volumeSlider);

    // Shows the current volume right now
    const volumeDisplay = document.createElement("span");
    volumeDisplay.innerText = `Current: ${volumeSlider.value}%`;
    settingsMenu.appendChild(volumeDisplay);

    // Updates the volume from the slider
    volumeSlider.oninput = function () {
        volumeDisplay.innerText = `Current: ${volumeSlider.value}%`;
        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.volume = volumeSlider.value / 200; // Converts the range
        }
    };

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
    fontSizeSlider.max = "60";
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
        localStorage.setItem("soundVolume", volumeSlider.value);
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
        localStorage.setItem("soundVolume", volumeSlider.value); // Make sure to save volume correctly
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
mainMenuButton.onclick
