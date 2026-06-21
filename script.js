let gameOver = false;
const playerHealthBar = document.getElementById("playerHealth");

let playerHealth = 100;
let enemyCanAttack = true;
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

    if (playerX < 0) {
        playerX = 0;
    }

    player.style.left = playerX + "px";

});

document.getElementById("rightBtn").addEventListener("click", () => {

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
let enemyX = window.innerWidth - 150;

enemy.style.left = enemyX + "px";
enemy.style.right = "auto";
let enemyHealth = 100;
enemy.style.opacity = "0.4";

setTimeout(() => {
    enemy.style.opacity = "1";
}, 100);

document.getElementById("attackBtn").addEventListener("click", () => {

    player.style.transform = "scale(1.2)";

    setTimeout(() => {
        player.style.transform = "scale(1)";
    }, 100);

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    const distance = Math.abs(playerRect.left - enemyRect.left);

    if (distance < 70) {

        enemyHealth -= 10;
        enemy.style.opacity = "0.4";

setTimeout(() => {
    enemy.style.opacity = "1";
}, 100);

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

    if (enemyX > playerX + 60) {

        enemyX -= 4;

    } else if (enemyX < playerX - 60) {

        enemyX += 4;

    }

    enemy.style.left = enemyX + "px";

}, 100);
setInterval(() => {

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
        if (playerHealth === 0 && !gameOver) {

    gameOver = true;

    alert("You Lost!");
            

}  

        // Cooldown
        setTimeout(() => {
            enemyCanAttack = true;
        }, 1500);

    }

}, 100);
