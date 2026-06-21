const startBtn = document.getElementById("startBtn");
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");

const player = document.getElementById("player");

let playerX = 50;

startBtn.addEventListener("click", () => {
    titleScreen.style.display = "none";
    gameScreen.style.display = "block";
});

document.getElementById("leftBtn").addEventListener("click", () => {
    playerX -= 20;
    player.style.left = playerX + "px";
});

document.getElementById("rightBtn").addEventListener("click", () => {
    playerX += 20;
    player.style.left = playerX + "px";
});

document.getElementById("attackBtn").addEventListener("click", () => {
    player.style.transform = "scale(1.2)";

    setTimeout(() => {
        player.style.transform = "scale(1)";
    }, 100);
});
