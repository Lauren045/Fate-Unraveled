const background = document.getElementById("backgroundImage");
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

function changeCharacter(line) {
    const leftCharacter = document.getElementById("leftCharacter");
    const rightCharacter = document.getElementById("rightCharacter");
    const container = document.getElementById("characterImagesContainer");

    leftCharacter.classList.remove("centeredCharacter");
    rightCharacter.classList.remove("centeredCharacter");
    container.classList.remove("centerCharacters");

    if (line.leftChar) {
        leftCharacter.src = `assets/IMG/${line.leftChar}`;
        leftCharacter.style.display = "block";
    } else {
        leftCharacter.style.display = "none";
    }

    if (line.rightChar) {
	rightCharacter.src = `assets/IMG/${line.rightChar}`;
	rightCharacter.style.display = "block";
    } else {
        rightCharacter.style.display = "none";
    }

    if (line.char) {
	leftCharacter.src = `assets/IMG/${line.char}`;
	leftCharacter.style.display = "block";
	rightCharacter.style.display = "none";
        
        container.classList.add("centerCharacters");
        leftCharacter.classList.add("centeredCharacter");
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
