// window.addEventListener("load", event => {
//     MainMusic.play();
//     MainMusic.volume = 0.3;
//     document.getElementById("new-game").addEventListener("click", event => {
//         MainMusic.pause();
//     });
// })

function fadeIn(el) {
    el.style.opacity = 0;
    var tick = function () {
        el.style.opacity = +el.style.opacity + 0.01;
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
    };
    tick();
}

// initial values
let level = 1000;
let health = 100;

//updates the width of the border health bar by decreasing the width to
//give the illusion of lost health points

function updateHp(points) {
    let healthBar = document.querySelector("#healthBar");
    healthBar.style.width = (points) + "%";

    if (health < 1) {
        var el = document.getElementById("game-over");
        el.style.display = 'inline';
        fadeIn(el);
        setTimeout(() => {
            alert("Game Over");
            window.location.href = "index.html";
            health = 100;
        }, 1000);
    }
}

function userFire(enemies) {
    enemies.classList.add("dead");
    if (!livingEnemies().length) {
        alert("You cleaned up a stew of scum! Good job!");
        // window.location.reload();
        level -= 100;
        newGameStart(level);
        reviveEnemies();
    }
}

function enemiesAtk(enemies) {
    enemies.classList.add("visible");
    setTimeout(() => {
        enemiesShoot(enemies);
    }, 1000);
    setTimeout(() => {
        enemies.classList.remove("visible");
    }, 2000);
}

function randomAtk() {
    let randomEnemy = Math.floor(Math.random() * livingEnemies().length);
    let enemies = livingEnemies()[randomEnemy];
    let randomDelay = Math.random() * 2000 + level;
    let startGame;
    if (health > 0) {
        startGame = setTimeout(() => {
            enemiesAtk(enemies);
            randomAtk();
        }, randomDelay);
        startGame;
    } else {
        clearTimeout(startGame);
    }
}

function enemiesShoot(enemies) {
    if (!enemies.classList.contains("dead")) {
        enemyGunshotSFX.play();
        enemies.classList.add("shooting");
        let blink = document.getElementById('blink');
        blink.style.backgroundColor = 'red';
        health = health - 20;
        updateHp(health);
        setTimeout(() => {
            enemies.classList.remove("shooting");
            blink.style.backgroundColor = 'black';
        }, 250);
    }
}

let myGunshotSFX = new Audio("Assets/myGunshot.mp3");
myGunshotSFX.volume = 0.2;

let enemyGunshotSFX = new Audio("Assets/enemyGunshot.mp3");
enemyGunshotSFX.volume = 0.4;

function reviveEnemies() {
    let enemies = document.querySelectorAll(".enemies");
    enemies.forEach(e => {
        console.log(e);
        e.classList.remove("dead");
    })
}

function livingEnemies() {
    return document.querySelectorAll(".enemies:not(.dead)");
}

function newGameStart() {
    randomAtk();
    Gmusic.play();
}

let Gmusic = new Audio("Assets/gameMusic.mp3");
Gmusic.volume = 0.1;
Gmusic.loop = true;



// function mainMenuSound() {
//     MainMusic.play();
//     if(newGameStart()){
//         MainMusic.pause();
//     }
// }






