function triggerBattle() {
    document.getElementById("characterImages").style.display = "none";
    document.getElementById("dialogueBox").style.display = "none";
    document.getElementById("buttonContainer").style.display = "none";
    const minigameScreen = document.createElement("div");
    minigameScreen.id = "minigameScreen";
    document.body.appendChild(minigameScreen);

    const pressButton = document.createElement("button");
    pressButton.id = "pressButton";
    pressButton.innerText = "Battle";
    minigameScreen.appendChild(pressButton);

    pressButton.addEventListener("click", function() {
	minigameScreen.remove();
        document.getElementById("characterImages").style.display = "block";
        document.getElementById("dialogueBox").style.display = "block";
	document.getElementById("buttonContainer").style.display = "block";
    });
}
