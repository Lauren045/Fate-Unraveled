const SAVE_SLOT_COUNT = 6;

const saveBtn = document.getElementById("save");
const saveOverlayBg = document.getElementById("saveOverlayBg");
const saveOverlay = document.getElementById("saveOverlay");
const saveSlotsContainer = document.getElementById("saveSlots");

if (typeof currentDialogueIndex === "undefined") {
    currentDialogueIndex = 0;
}

if (typeof flags === "undefined") {
    flags = {};
}

// Attach open save menu
saveBtn.addEventListener("click", openSave);

// Create and populate save slots
function openSave() {
    saveOverlayBg.classList.add("visible");
    saveOverlay.classList.remove("hidden");
    saveOverlay.classList.add("visible");

    renderSaveSlots();
}

// Close save menu
function closeSave() {
    saveOverlayBg.classList.remove("visible");
    saveOverlay.classList.remove("visible");
    saveOverlay.classList.add("hidden");
}

// Save current game data to localStorage
function saveToSlot(slot) {
    const saveData = {
        dialogueIndex: currentDialogueIndex || 0,
        flags: flags || {},
        name: "Save Slot " + (slot + 1),
        timestamp: new Date().toLocaleString(),
    };

    localStorage.setItem(`saveSlot${slot}`, JSON.stringify(saveData));
    renderSaveSlots(); // Refresh slot display
}

// Make each save slot visually
function renderSaveSlots() {
    saveSlotsContainer.innerHTML = "";
    for (let i = 0; i < SAVE_SLOT_COUNT; i++) {
        const slotData = localStorage.getItem(`saveSlot${i}`);
        const slot = document.createElement("div");
        slot.className = "save-slot";
        slot.innerHTML = slotData
            ? `<strong>${JSON.parse(slotData).name}</strong><br><small>${JSON.parse(slotData).timestamp}</small>`
            : `<em>Empty Slot</em>`;

        slot.addEventListener("click", () => {
            saveToSlot(i);
        });

        saveSlotsContainer.appendChild(slot);
    }
}

function loadFromSlot(slot) {
    const data = localStorage.getItem(`saveSlot${slot}`);
    if (!data) return;

    const saveData = JSON.parse(data);
    currentDialogueIndex = saveData.dialogueIndex;
    flags = saveData.flags || {};
    startDialogue(currentDialogueIndex);
}

