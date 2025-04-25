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
	    <input type="range" id="volumeSlider" class="ui-no-sparkle" min="0" max="200">
        </div>
        <span id="volumeDisplay"></span>

        <div class="settings-option">
            <label for="fontSizeSlider">Font Size</label>
            <input type="range" id="fontSizeSlider" class="ui-no-sparkle" min="12" max="60">
        </div>
        <span id="fontSizeDisplay"></span>

        <div class="settings-option">
            <label for="speedSlider">Typing Speed</label>
            <input type="range" id="speedSlider" class="ui-no-sparkle" min="10" max="100">
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
        localStorage.setItem("fontSize", fontSizeSlider.value);
        localStorage.setItem("soundVolume", volumeSlider.value);
        localStorage.setItem("typingSpeed", speedSlider.value);

	const savedPopup = document.createElement("div");
	savedPopup.id = "settingsSavedPopup";
	savedPopup.textContent = "Settings Saved!";
	document.body.appendChild(savedPopup);

	const sparkleSound = new Audio("assets/soundeffects/settingssaved.mp3");
	sparkleSound.volume = 0.9;
	sparkleSound.play();

	setTimeout(() => {
	    savedPopup.remove();
	}, 2500);

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

let sparkleTrailEnabled = false;

document.addEventListener("mousedown", () => sparkleTrailEnabled = true);
document.addEventListener("mouseup", () => sparkleTrailEnabled = false);

document.addEventListener("click", (event) => {
    if (!event.target.closest(".ui-no-sparkle")) {
        spawnClickSparkles(event.clientX, event.clientY);
    }
});

document.addEventListener("mousemove", (event) => {
    if (sparkleTrailEnabled && !event.target.closest(".ui-no-sparkle")) {
        spawnClickSparkles(event.clientX, event.clientY);
    }
});

function spawnClickSparkles(x, y) {
    const shapes = ["✧", "✦", "✨", "★", "❖"];
    const colors = ["#a582c2", "#ffffff", "#d5a1ff", "#ffd1f9", "#c29eff"];

    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "save-star";
        sparkle.textContent = shapes[Math.floor(Math.random() * shapes.length)];

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        // Set random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 15;
        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";
        sparkle.style.setProperty('--dx', dx);
        sparkle.style.setProperty('--dy', dy);

        // Random color
        sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 600);
    }
}
