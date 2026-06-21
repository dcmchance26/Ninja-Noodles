const playerHealthBar = document.getElementById("playerHealth");

let playerHealth = 100;
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

const enemy = document.getElementById("enemy");
const enemyHealthBar = document.getElementById("enemyHealth");
let enemyX = window.innerWidth - 150;

enemy.style.left = enemyX + "px";
enemy.style.right = "auto";
let enemyHealth = 100;

document.getElementById("attackBtn").addEventListener("click", () => {

    player.style.transform = "scale(1.2)";

    setTimeout(() => {
        player.style.transform = "scale(1)";
    }, 100);

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    const distance = Math.abs(playerRect.left - enemyRect.left);

    if (distance < 100) {

        enemyHealth -= 10;

        if (enemyHealth < 0) {
            enemyHealth = 0;
        }

        enemyHealthBar.style.width = enemyHealth + "%";

        if (enemyHealth === 0) {
            alert("Round Win!");
        }
    }
});
let jumping = false;

document.getElementById("jumpBtn").addEventListener("click", () => {

    if (jumping) return;

    jumping = true;

    player.style.transition = "bottom 0.25s";

    player.style.bottom = "150px";

    setTimeout(() => {
        player.style.bottom = "20px";
    }, 250);

    setTimeout(() => {
        jumping = false;
    }, 500);

});
setInterval(() => {

    const distance = enemyX - playerX;

    if (distance > 90) {

        enemyX -= 4;

        enemy.style.left = enemyX + "px";
    }

}, 100);
