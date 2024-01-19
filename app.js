var hitVal = 0;
var timer = 60;
var score = 0;
const audio= new Audio();
audio.src="./mixkit-arcade-game-jump-coin-216.wav";
function makeBubble() {
    var clutter = "";

    for (var i = 1; i <= 184; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

function getNewHit() {
    hitVal = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitVal;
}

function runTimer() {
    var timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            var gameOverSound = document.querySelector("#gameOverSound");
            if (gameOverSound) {
                gameOverSound.volume = 0.5;
                gameOverSound.play();
            }

            var gameOverContainer = document.createElement("div");
            gameOverContainer.id = "game-over-container";
            gameOverContainer.innerHTML = `
                <h1>Game Over</h1>
                <button id="playagain">Play Again</button>
            `;

            document.querySelector("#pbtm").innerHTML = ''; // Clear existing content
            document.querySelector("#pbtm").appendChild(gameOverContainer);
            document.querySelector("#playagain").addEventListener("click", function () {
                timer = 60;
                score = 0;
                makeBubble();
                runTimer();
                getNewHit();
            })
        }
    }, 1000)
}

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}
function decreaseScore() {
    score = Math.max(0, score - 1); // Ensure score doesn't go below 0
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#pbtm").addEventListener("click", function (dets) {
    var clickedNum = Number(dets.target.textContent);
    if (clickedNum == hitVal) {
        increaseScore();
    } else {
        decreaseScore();
    }
    makeBubble();
    getNewHit();
});


makeBubble();
runTimer();
getNewHit();
