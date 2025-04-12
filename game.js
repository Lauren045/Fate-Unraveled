const background = document.getElementById("backgroundImage");
const characters = document.getElementById("characterImages");
const sceneEffect = document.getElementById("sceneEffect");

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
    const leftChar = document.getElementById('characterImageLeft');
    const rightChar = document.getElementById('characterImageRight');

    if (Array.isArray(imageFile)) {
        // two people
        leftChar.src = `assets/IMG/${imageFile[0]}`;
        rightChar.src = `assets/IMG/${imageFile[1]}`;
        leftChar.style.display = "block";
        rightChar.style.display = "block";
    } else if (imageFile) {
        // single person
        leftChar.src = `assets/IMG/${imageFile}`;
        leftChar.style.display = "block";
        rightChar.style.display = "none";
    } else {
        // nobody
        leftChar.style.display = "none";
        rightChar.style.display = "none";
    }
}

function triggerFX(fxType) {
    if (fxType === "flash") {
        sceneEffect.style.animation = "flash 1s ease-in-out";
    }
    else if (fxType === "fadeIn") {
        sceneEffect.style.animation = "fadeIn 3s ease-in-out";
    }
    else if (fxType === "fadeOut") {
        sceneEffect.style.animation = "fadeOut 3s ease-in-out";
    }

    else if (fxType === "speedBurst") {
        const burst = document.getElementById("speedBurst");
        burst.style.display = "block";
    }

    setTimeout(() => {
        sceneEffect.style.animation = "";
    }, duration);
}

function triggerShake() {
    background.classList.add("shake");
    setTimeout(() => {
        background.classList.remove("shake");
    }, 500);
}

changeBackground("bg.jpg")
