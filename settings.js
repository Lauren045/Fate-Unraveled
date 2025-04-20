let wasMusicPlaying = false;
let settingsMusic = new Audio("assets/songs/settingssong.mp3");
settingsMusic.loop = true;
settingsMusic.volume = 0.5;

function playUISound() {
    const sound = new Audio("assets/soundeffects/savedsettingsclick.mp3");
    sound.volume = 0.3;
    sound.play();
}

function playResetWarningSound() {
    const sound = new Audio("assets/soundeffects/resetalldatawarning.mp3");
    sound.volume = 0.5;
    sound.play();
}

// When page loads, the settings will be applied
function applySavedSettings() {
    const savedFontSize = localStorage.getItem("fontSize") || "30";
    const savedVolume = localStorage.getItem("soundVolume") || "100";
    const savedSpeed = localStorage.getItem("typingSpeed") || "50";
    const dialogueText = document.getElementById("dialogueText");
    const bgMusic = document.getElementById("bgMusic");

    if (dialogueText) {
        dialogueText.style.fontSize = `${savedFontSize}px`;
    }

    if (bgMusic) {
        bgMusic.volume = savedVolume / 200;
    }

    localStorage.setItem("typingSpeed", savedSpeed);
}

window.onload = function () {
    applySavedSettings();
};

function showSettingsMenu() {
    if (document.getElementById("settingsMenu")) return;

    // Create and fade in a dark overlay first
    const overlay = document.createElement("div");
    overlay.id = "settingsOverlay";
    document.body.appendChild(overlay);

    const settingsMenu = document.createElement("div");
    settingsMenu.id = "settingsMenu";
    settingsMenu.classList.add("settings-fade-in");
    settingsMenu.innerHTML = `
        <h2>Settings</h2>

        <div class="settings-option">
            <label for="volumeSlider">Music Volume</label>
            <input type="range" id="volumeSlider" min="0" max="200">
        </div>
        <span id="volumeDisplay"></span>

        <div class="settings-option">
            <label for="fontSizeSlider">Font Size</label>
            <input type="range" id="fontSizeSlider" min="12" max="60">
        </div>
        <span id="fontSizeDisplay"></span>

        <div class="settings-option">
            <label for="speedSlider">Typing Speed</label>
            <input type="range" id="speedSlider" min="10" max="100">
        </div>
        <span id="speedDisplay"></span>

        <button id="saveBtn">Save Settings</button>
        <button id="fullscreenBtn">Fullscreen</button>
        <button id="resetBtn">Reset All Data</button>
        <button id="mainMenuBtn">Main Menu</button>
        <button id="settingsCloseBtn">Close</button>
    `;
     
     // Delay showing settings menu slightly for drama
     setTimeout(() => {
	 document.body.appendChild(settingsMenu);
 
    // Handle background music swap
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic && !bgMusic.paused) {
        wasMusicPlaying = true;
        bgMusic.pause();
    }
    settingsMusic.currentTime = 0;
    settingsMusic.play();

    // Load saved settings
    const savedFontSize = localStorage.getItem("fontSize") || "30";
    const savedVolume = localStorage.getItem("soundVolume") || "100";
    const savedSpeed = localStorage.getItem("typingSpeed") || "50";

    const volumeSlider = document.getElementById("volumeSlider");
    const volumeDisplay = document.getElementById("volumeDisplay");
    const fontSizeSlider = document.getElementById("fontSizeSlider");
    const fontSizeDisplay = document.getElementById("fontSizeDisplay");
    const speedSlider = document.getElementById("speedSlider");
    const speedDisplay = document.getElementById("speedDisplay");

    volumeSlider.value = savedVolume;
    fontSizeSlider.value = savedFontSize;
    speedSlider.value = savedSpeed;

    volumeDisplay.textContent = `Current: ${savedVolume}%`;
    fontSizeDisplay.textContent = `Current: ${savedFontSize}px`;
    speedDisplay.textContent = `Current: ${savedSpeed}ms`;

    volumeSlider.oninput = () => {
        volumeDisplay.textContent = `Current: ${volumeSlider.value}%`;
        if (bgMusic) bgMusic.volume = volumeSlider.value / 200;
    };

    const dialogueText = document.getElementById("dialogueText");
    fontSizeSlider.oninput = () => {
        fontSizeDisplay.textContent = `Current: ${fontSizeSlider.value}px`;
        if (dialogueText) dialogueText.style.fontSize = `${fontSizeSlider.value}px`;
    };

    speedSlider.oninput = () => {
        speedDisplay.textContent = `Current: ${speedSlider.value}ms`;
    };

    document.getElementById("saveBtn").onclick = () => {
        playUISound();
        localStorage.setItem("fontSize", fontSizeSlider.value);
        localStorage.setItem("soundVolume", volumeSlider.value);
        localStorage.setItem("typingSpeed", speedSlider.value);
        alert("Settings saved!");
    };

    document.getElementById("fullscreenBtn").onclick = () => {
        playUISound();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    document.getElementById("resetBtn").onclick = () => {
        playResetWarningSound();
	showResetWarning();
    };

    function showResetWarning() {
        if (document.getElementById("warningOverlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "warningOverlay";

        const box = document.createElement("div");
        box.id = "warningBox";
        box.innerHTML = `
            <h3>⚠️ Reset All Data?</h3>
            <p>This will erase your saved settings and progress. This action cannot be undone.</p>
            <div class="warning-buttons">
                <button id="confirmReset">Yes, Reset</button>
                <button id="cancelReset">Cancel</button>
            </div>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        document.getElementById("confirmReset").onclick = () => {
            playUISound();
            localStorage.clear();
            window.location.href = "index.html";
        };

        document.getElementById("cancelReset").onclick = () => {
            playUISound();
            overlay.remove();
        };
    }

    document.getElementById("mainMenuBtn").onclick = () => {
        playUISound();
        localStorage.setItem("fontSize", fontSizeSlider.value);
        localStorage.setItem("soundVolume", volumeSlider.value);
        window.location.href = "index.html";
    };

    document.getElementById("settingsCloseBtn").onclick = () => {
        playUISound();
	settingsMenu.classList.remove("setting-fade-in");
	settingsMenu.classList.add("settings-fade-out");

	setTimeout(() => {
            settingsMenu.remove();
	    document.getElementById("settingsOverlay")?.remove();
            settingsMusic.pause();
            if (wasMusicPlaying) {
		const bgMusic = document.getElementById("bgMusic");
                if (bgMusic) bgMusic.play();
            }
        }, 300);
    };
 }, 400);
}
