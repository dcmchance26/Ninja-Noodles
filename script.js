let currentRound = 1;

let playerRoundsWon = 0;
let enemyRoundsWon = 0;

let fightActive = false;
let enemyCanAttack = true;

const startBtn = document.getElementById("startBtn");

const titleScreen = document.getElementById("titleScreen");
const characterSelectScreen = document.getElementById("characterSelectScreen");
const gameScreen = document.getElementById("gameScreen");
const matchWinnerScreen = document.getElementById("matchWinnerScreen");

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const playerHealthBar = document.getElementById("playerHealth");
const enemyHealthBar = document.getElementById("enemyHealth");

const messageBox = document.getElementById("messageBox");

const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");

const healthStat = document.getElementById("healthStat");
const damageStat = document.getElementById("damageStat");
const speedStat = document.getElementById("speedStat");

const winnerName = document.getElementById("winnerName");

const noodles = [

{
    name:"RAMEN",
    image:"images/ramen.png",
    health:100,
    damage:10,
    speed:4,
    color:"orange"
},

{
    name:"SPAGHETTI",
    image:"images/spaghetti.png",
    health:80,
    damage:8,
    speed:6,
    color:"gold"
},

{
    name:"LINGUINE",
    image:"images/linguine.png",
    health:120,
    damage:12,
    speed:3,
    color:"deepskyblue"
}

];

let selectedNoodle = 0;

let playerMaxHealth = 100;
let playerHealth = 100;

let playerDamage = 10;
let playerSpeed = 4;

let enemyHealth = 100;

let playerX = 20;
let enemyX = window.innerWidth - 90;

/* =====================
   CHARACTER SELECT
===================== */

function updateCharacterCard(){

    const noodle = noodles[selectedNoodle];

    characterImage.src = noodle.image;

    characterName.textContent = noodle.name;

    healthStat.textContent = noodle.health;
    damageStat.textContent = noodle.damage;
    speedStat.textContent = noodle.speed;

}

document.getElementById("prevCharacterBtn")
.addEventListener("click", () => {

    selectedNoodle--;

    if(selectedNoodle < 0){
        selectedNoodle = noodles.length - 1;
    }

    updateCharacterCard();

});

document.getElementById("nextCharacterBtn")
.addEventListener("click", () => {

    selectedNoodle++;

    if(selectedNoodle >= noodles.length){
        selectedNoodle = 0;
    }

    updateCharacterCard();

});

startBtn.addEventListener("click", () => {

    titleScreen.style.display = "none";

    characterSelectScreen.style.display = "flex";

    updateCharacterCard();

});

document.getElementById("selectCharacterBtn")
.addEventListener("click", () => {

    const noodle = noodles[selectedNoodle];

    playerMaxHealth = noodle.health;
    playerHealth = noodle.health;

    playerDamage = noodle.damage;
    playerSpeed = noodle.speed;

    player.style.background = noodle.color;

    characterSelectScreen.style.display = "none";

    gameScreen.style.display = "block";

    startMatch();

});

/* =====================
   MATCH
===================== */

function startMatch(){

    currentRound = 1;

    playerRoundsWon = 0;
    enemyRoundsWon = 0;

    startRound();

}

function startRound(){

    resetRound();

    startRoundIntro();

}

function resetRound(){

    playerHealth = playerMaxHealth;
    enemyHealth = 100;

    playerHealthBar.style.width = "100%";
    enemyHealthBar.style.width = "100%";

    playerX = 20;
    enemyX = window.innerWidth - 90;

    player.style.left = playerX + "px";
    enemy.style.left = enemyX + "px";

}

function startRoundIntro(){

    fightActive = false;

    messageBox.textContent =
        "ROUND " + currentRound;

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

/* =====================
   PLAYER MOVEMENT
===================== */

document.getElementById("leftBtn")
.addEventListener("click", () => {

    if(!fightActive) return;

    playerX -= playerSpeed * 5;

    if(playerX < 0){
        playerX = 0;
    }

    player.style.left = playerX + "px";

});

document.getElementById("rightBtn")
.addEventListener("click", () => {

    if(!fightActive) return;

    playerX += playerSpeed * 5;

    const arena =
        document.getElementById("arena");

    const maxX =
        arena.clientWidth -
        player.offsetWidth;

    if(playerX > maxX){
        playerX = maxX;
    }

    player.style.left = playerX + "px";

});

/* =====================
   ATTACK
===================== */

document.getElementById("attackBtn")
.addEventListener("click", () => {

    if(!fightActive) return;

    const distance =
        Math.abs(playerX - enemyX);

    if(distance < 70){

        enemyHealth -= playerDamage;

        if(enemyHealth < 0){
            enemyHealth = 0;
        }

        enemyHealthBar.style.width =
            (enemyHealth / 100) * 100 + "%";

        if(enemyHealth <= 0){

            playerRoundsWon++;

            roundWinner("PLAYER");

        }

    }

});

/* =====================
   JUMP
===================== */

let jumping = false;

document.getElementById("jumpBtn")
.addEventListener("click", () => {

    if(!fightActive) return;
    if(jumping) return;

    jumping = true;

    player.style.bottom = "150px";

    setTimeout(() => {

        player.style.bottom = "20px";

    },250);

    setTimeout(() => {

        jumping = false;

    },500);

});

/* =====================
   ENEMY AI
===================== */

setInterval(() => {

    if(!fightActive) return;

    if(enemyX > playerX + 60){

        enemyX -= 4;

    }
    else if(enemyX < playerX - 60){

        enemyX += 4;

    }

    enemy.style.left =
        enemyX + "px";

},100);

setInterval(() => {

    if(!fightActive) return;

    const distance =
        Math.abs(enemyX - playerX);

    if(distance < 70 && enemyCanAttack){

        enemyCanAttack = false;

        playerHealth -= 10;

        if(playerHealth < 0){
            playerHealth = 0;
        }

        playerHealthBar.style.width =
            (playerHealth / playerMaxHealth) * 100 + "%";

        if(playerHealth <= 0){

            enemyRoundsWon++;

            roundWinner("ENEMY");

        }

        setTimeout(() => {

            enemyCanAttack = true;

        },1500);

    }

},100);

/* =====================
   ROUND WINNER
===================== */

function roundWinner(winner){

    fightActive = false;

    messageBox.textContent =
        winner + " WINS ROUND " + currentRound;

    setTimeout(() => {

        if(playerRoundsWon >= 2){

            matchWinner(
                noodles[selectedNoodle].name
            );

            return;
        }

        if(enemyRoundsWon >= 2){

            matchWinner(
                "BROTH RONIN"
            );

            return;
        }

        currentRound++;

        startRound();

    },2000);

}

/* =====================
   MATCH WINNER
===================== */

function matchWinner(name){

    gameScreen.style.display = "none";

    matchWinnerScreen.style.display = "flex";

    winnerName.textContent = name;

    setTimeout(() => {

        matchWinnerScreen.style.display = "none";

        characterSelectScreen.style.display = "flex";

        updateCharacterCard();

    },3000);

}
