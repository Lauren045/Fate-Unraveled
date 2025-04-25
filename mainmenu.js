document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = 0;

  const fadeIn = setInterval(() => {
    if (bgMusic.volume < 0.5) {
      bgMusic.volume = Math.min(bgMusic.volume + 0.01, 0.5);
    } else {
      clearInterval(fadeIn);
    }
  }, 100);

  bgMusic.play().catch(err => {
    console.warn("Autoplay blocked:", err);
  });
});

window.addEventListener("load", () => {
    triggerFX("fadeIn");
});

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
    
    fadeAndRedirect(() => {
        if (saveData) {
           localStorage.setItem("lastUsedSlot", slotNumber); // stores the last slot
           let parsedData = JSON.parse(saveData);
           localStorage.setItem("dialogueIndex", parsedData.dialogueIndex); // saves dialogue position

           window.location.href = "game.html"; // Takes you to the game
        } else {
           alert(`No save data found in Slot ${slotNumber}`);
        }
    });
}

function fadeAndRedirect(callback) {
    const overlay = document.getElementById("fadeOverlay");
    overlay.classList.add("fade-out");
    setTimeout(() => {
        callback();
    }, 1000);
}

document.getElementById("newGame").addEventListener("click", () => {
    const fadeOverlay = document.getElementById("fadeOverlay");
    const flashOverlay = document.getElementById("flashOverlay");
    const titleOverlay = document.getElementById("titleFadeOverlay");

    setTimeout(() => {
        titleOverlay.classList.remove("hidden");
        titleOverlay.style.animation = "none"; // reset animation
        void titleOverlay.offsetWidth; // force reflow
        titleOverlay.style.animation = "fadeTitle 5s ease forwards"; // slower fade
    }, 350);

    // Trigger fade and effects
    fadeOverlay.classList.add("fade-out", "flicker");

    const startSound = new Audio("assets/soundeffects/newgame.mp3");
    startSound.volume = 0.9;
    startSound.play();

    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        let fadeOutInterval = setInterval(() => {
            if (bgMusic.volume > 0.05) {
                bgMusic.volume -= 0.05;
            } else {
                bgMusic.volume = 0;
                bgMusic.pause();
                clearInterval(fadeOutInterval);
            }
        }, 120);
    }


    // Load game after fade finishes
    setTimeout(() => {
        window.location.href = "game.html";
    }, 3500); // wait for all effects to complete
});

function triggerFX(type) {
    const overlay = document.getElementById("fadeOverlay");

    if (type === "fadeIn") {
        overlay.classList.remove("fade-out");
        overlay.classList.add("fade-in");
    }

    if (type === "fadeOut") {
        overlay.classList.remove("fade-in");
        overlay.classList.add("fade-out");
    }
}

document.getElementById("htp").addEventListener("click", () => {
    const bg = document.getElementById("helpOverlayBg");
    const overlay = document.getElementById("helpOverlay");

    bg.classList.remove("hidden");

    setTimeout(() => {
        bg.classList.add("visible");
    }, 50);

    setTimeout(() => {
        overlay.classList.remove("hidden");
        overlay.classList.add("visible");
    }, 600);
});


function closeHelp() {
    const bg = document.getElementById("helpOverlayBg");
    const overlay = document.getElementById("helpOverlay");

    overlay.classList.remove("visible");

    bg.classList.remove("visible");

    setTimeout(() => {
        overlay.classList.add("hidden");
        bg.classList.add("hidden");
    }, 600);
}

const loadBtn = document.getElementById("loadGame");
const loadOverlayBg = document.getElementById("loadOverlayBg");
const loadOverlay = document.getElementById("loadOverlay");
const loadSlotsContainer = document.getElementById("loadSlots");

loadBtn.addEventListener("click", openLoad);

function openLoad() {
    loadOverlayBg.classList.add("visible");
    loadOverlay.classList.remove("hidden");
    loadOverlay.classList.add("visible");

    renderLoadSlots();
}

function closeLoad() {
    loadOverlayBg.classList.remove("visible");
    loadOverlay.classList.remove("visible");
    loadOverlay.classList.add("hidden");
}

function renderLoadSlots() {
    loadSlotsContainer.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const slotData = localStorage.getItem(`saveSlot${i}`);
        const slot = document.createElement("div");
        slot.className = "load-slot";
        slot.innerHTML = slotData
            ? `<strong>${JSON.parse(slotData).name}</strong><br><small>${JSON.parse(slotData).timestamp}</small>`
            : `<em>Empty Slot</em>`;

        slot.addEventListener("click", () => {
            if (slotData) {
                localStorage.setItem("currentLoadSlot", i);
                const fadeOverlay = document.getElementById("fadeOverlay");
                fadeOverlay.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = "game.html";
                }, 1000);
            }
        });

        loadSlotsContainer.appendChild(slot);
    }
}
