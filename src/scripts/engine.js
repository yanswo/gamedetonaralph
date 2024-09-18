const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    playButton: document.querySelector("#play-button"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

let hitAudio = new Audio("/src/audios/hit.mp3");
hitAudio.volume = 0.2;

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;
  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function playSound() {
  hitAudio.currentTime = 0;
  hitAudio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function initialize() {
  moveEnemy();
  addListenerHitBox();
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

state.view.playButton.addEventListener("click", () => {
  initialize();
  state.view.playButton.style.display = "none";
});
