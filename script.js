let gameOver = false;
let currentRound = 1;

let playerRoundsWon = 0;
let enemyRoundsWon = 0;
let fightActive = false;
const messageBox = document.getElementById("messageBox");
const playerHealthBar = document.getElementById("playerHealth");

let playerHealth = 100;
let enemyCanAttack = true;
const startBtn = document.getElementById("startBtn");
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");

const player = document.getElementById("player");

let playerX = 20;

startBtn.addEventListener("click", () => {

    titleScreen.style.display = "none";
    gameScreen.style.display = "block";

    startRoundIntro();

});

document.getElementById("leftBtn").addEventListener("click", () => {
if (!fightActive) return;
    playerX -= 20;

    if (playerX < 0) {
        playerX = 0;
    }

    player.style.left = playerX + "px";

});

document.getElementById("rightBtn").addEventListener("click", () => {
if (!fightActive) return;
    playerX += 20;

    const arena = document.getElementById("arena");
const maxX = arena.clientWidth - player.offsetWidth;

    if (playerX > maxX) {
        playerX = maxX;
    }

    player.style.left = playerX + "px";

});

const enemy = document.getElementById("enemy");
const enemyHealthBar = document.getElementById("enemyHealth");
let enemyX = window.innerWidth - 90;

enemy.style.left = enemyX + "px";
enemy.style.right = "auto";
let enemyHealth = 100;
enemy.style.opacity = "0.4";

setTimeout(() => {
    enemy.style.opacity = "1";
}, 100);

document.getElementById("attackBtn").addEventListener("click", () => {
if (!fightActive) return;
    player.style.transform = "scale(1.2)";

    setTimeout(() => {
        player.style.transform = "scale(1)";
    }, 100);

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    const distance = Math.abs(playerRect.left - enemyRect.left);

    if (distance < 70) {

    enemyHealth -= 10;

    if (enemyHealth < 0) {
        enemyHealth = 0;
    }

    enemyHealthBar.style.width = enemyHealth + "%";

    enemy.style.opacity = "0.4";

    setTimeout(() => {
        enemy.style.opacity = "1";
    }, 100);

    if (enemyHealth <= 0) {
    enemyHealth = 0;
}

enemyHealthBar.style.width = enemyHealth + "%";

    fightActive = false;

    playerRoundsWon++;

    messageBox.textContent =
        "PLAYER WINS ROUND " + currentRound;

    setTimeout(() => {

        currentRound++;

        resetRound();

        startRoundIntro();

    }, 2000);

}

    }

});

let jumping = false;

document.getElementById("jumpBtn").addEventListener("click", () => {
if (!fightActive) return;
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

    if (!fightActive) return;

    if (enemyX > playerX + 60) {

        enemyX -= 4;

    } else if (enemyX < playerX - 60) {

        enemyX += 4;

    }

    enemy.style.left = enemyX + "px";

}, 100);
setInterval(() => {
if (!fightActive) return;
    const distance = Math.abs(enemyX - playerX);

    if (distance < 70 && enemyCanAttack) {

        enemyCanAttack = false;

        // Enemy attack animation
        enemy.style.transform = "scale(1.2)";

        setTimeout(() => {
            enemy.style.transform = "scale(1)";
        }, 100);

        // Damage player
        playerHealth -= 10;

        if (playerHealth < 0) {
            playerHealth = 0;
        }

        // Flash player when hit
        player.style.opacity = "0.4";

        setTimeout(() => {
            player.style.opacity = "1";
        }, 100);

        // Update health bar
        playerHealthBar.style.width = playerHealth + "%";

        // Death check
        if (playerHealth <= 0 && !gameOver) {

    gameOver = true;

    fightActive = false;

    enemyRoundsWon++;

    messageBox.textContent =
        "ENEMY WINS ROUND " + currentRound;

    setTimeout(() => {

        currentRound++;

        resetRound();

        startRoundIntro();

    }, 2000);

}

        // Cooldown
        setTimeout(() => {
            enemyCanAttack = true;
        }, 1500);

    }

}, 100);
function resetRound() {

    playerHealth = 100;
    enemyHealth = 100;

    playerHealthBar.style.width = "100%";
    enemyHealthBar.style.width = "100%";

    playerX = 20;
    player.style.left = playerX + "px";

    enemyX = window.innerWidth - 90;
    enemy.style.left = enemyX + "px";

    gameOver = false;

}
function startRoundIntro() {

    fightActive = false;

    messageBox.textContent = "ROUND " + currentRound;

    setTimeout(() => {

        messageBox.textContent = "READY";

        setTimeout(() => {

            messageBox.textContent = "BOIL!";

            setTimeout(() => {

                messageBox.textContent = "";

                fightActive = true;

            }, 1500);

        }, 1500);

    }, 1500);

}

