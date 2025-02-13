document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settings");

    if (settingsButton) {
        settingsButton.addEventListener("click", function () {
            showSettingsMenu();
        });
    }
});

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

    // florencia, this is how you make the title for settings
    const title = document.createElement("h2");
    title.innerText = "Settings";
    settingsMenu.appendChild(title);

    // placeholder button for toggling sound for now
    const soundToggle = document.createElement("button");
    soundToggle.innerText = "Toggle Sound";
    soundToggle.onclick = function () {
        alert("pretend the sound changed idk");
    };
    settingsMenu.appendChild(soundToggle);

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
}

document.getElementById("newGame").addEventListener("click", () => {
    window.location.href = "game.html";
})
