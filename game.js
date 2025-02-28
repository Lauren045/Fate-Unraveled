const background = document.getElementById("backgroundImage");
const characters = document.getElementById("characterImages");

document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");

    // Autoplay audio when the page loads
    bgMusic.volume = 0.5;  // Set volume (0.0 to 1.0)
    bgMusic.play().catch(err => console.warn("Autoplay blocked: User interaction needed"));
});


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
