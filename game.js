let lastLeftChar = null;
let lastRightChar = null;
let lastCenterChar = null;
const background = document.getElementById("backgroundImage");
const sceneEffect = document.getElementById("sceneEffect");

document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");

    // automatically plays audio track
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    bgMusic.play().catch(err => console.warn("Autoplay blocked: User interaction needed"));
});

// function handling song change logic
function changeMusic(track) {
    const bgMusic = document.getElementById("bgMusic");

    // if a song is alr playing, no need to do anything
    if (bgMusic.src.includes(track)) {
        return;
    }

    // fades out song -- lowers volume before change
    bgMusic.style.transition = "opacity 1s ease-out";
    bgMusic.volume = 0;

    // once song is faded, change the track to the one mentioned in the JSON
    setTimeout(() => {
        bgMusic.src = `assets/songs/${track}`;
        bgMusic.load();
        bgMusic.play();

        // fades in new song -- heightens volume after change
        bgMusic.style.transition = "opacity 1s ease-in";
        bgMusic.volume = 0.5;
    }, 1000);
}

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

    // Left character logic
    if ("leftChar" in line) {
        if (line.leftChar === "null") {
            leftCharacter.style.display = "none";
            lastLeftChar = null;
        } else {
            leftCharacter.src = `assets/IMG/${line.leftChar}`;
            leftCharacter.style.display = "block";
            lastLeftChar = line.leftChar;
        }
    } else if (lastLeftChar) {
        leftCharacter.src = `assets/IMG/${lastLeftChar}`;
        leftCharacter.style.display = "block";
    }

    // Right character logic
    if ("rightChar" in line) {
        if (line.rightChar === "null") {
            rightCharacter.style.display = "none";
            lastRightChar = null;
        } else {
            rightCharacter.src = `assets/IMG/${line.rightChar}`;
            rightCharacter.style.display = "block";
            lastRightChar = line.rightChar;
        }
    } else if (lastRightChar) {
        rightCharacter.src = `assets/IMG/${lastRightChar}`;
        rightCharacter.style.display = "block";
    }

    // Centered character logic
    if ("char" in line) {
        if (line.char === "null") {
            leftCharacter.style.display = "none";
            rightCharacter.style.display = "none";
            lastCenterChar = null;
        } else {
            leftCharacter.src = `assets/IMG/${line.char}`;
            leftCharacter.style.display = "block";
            rightCharacter.style.display = "none";
            container.classList.add("centerCharacters");
            leftCharacter.classList.add("centeredCharacter");
            lastCenterChar = line.char;
        }
    } else if (lastCenterChar) {
        leftCharacter.src = `assets/IMG/${lastCenterChar}`;
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
changeMusic("FU2.mp3")
