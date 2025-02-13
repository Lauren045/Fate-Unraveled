const background = document.getElementById("backgroundImage");
const characters = document.getElementById("characterImages");

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
changeCharacter("def.png")
