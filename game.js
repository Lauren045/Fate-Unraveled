const background = document.getElementById("backgroundImage");
const characters = document.getElementById("characterImages");

let scenes = [];

async function loadScenes() {
    if (scenes.length === 0) {
        const response = await fetch("JSON/scene.json");
        const data = await response.json();
        scenes = data.scenes;
    }
}

async function changeScene(dialogueId) {
    await loadScenes();
    const scene = scenes.find(scene => scene.ids.includes(dialogueId));
    if (scene) {
        if (scene.background) changeBackground(scene.background);
        if (scene.character) changeCharacter(scene.character);
    }
}

function changeBackground(imageFile) {
    background.src = `assets/IMG/${imageFile}`;
}

function changeCharacter(imageFile) {
    if (imageFile) {
        characters.src = `assets/IMG/${imageFile}`;
        characters.style.display = "block";
    } else {
        characters.style.display = "none";
    }
}

changeBackground("bg.jpg")
