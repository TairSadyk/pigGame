"use strict";
//selecting HTML elements
const score0 = document.querySelector(".score--0");
const score1 = document.querySelector(".score--1");
////modal window elements
const btnClose = document.querySelector(".btn-close");
const btnRules = document.querySelector(".btn--rules");
const instructions = document.querySelector(".instructions");
const overlay = document.querySelector(".overlay");
const players = document.querySelectorAll(".player");

//game functionality elements
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");

//starting values
let currentScore = 0;
let scores = [0, 0];
let player = 0;
let playing = true;
//pop up window functionality
const toggleHidden = function () {
  instructions.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current-score--${player}`).textContent = 0;
  players.forEach(function (e) {
    console.log(e.classList);
    e.classList.toggle("player--active");
  });
  player = player === 0 ? 1 : 0;
};

btnRules.addEventListener("click", toggleHidden);
btnClose.addEventListener("click", toggleHidden);
overlay.addEventListener("click", toggleHidden);
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    instructions.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNum = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `img/Dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`.current-score--${player}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[player] += currentScore;
    document.querySelector(`.score--${player}`).textContent = scores[player];
    if (scores[player] >= 100) {
      playing = false;
      players[player].classList.add("winner");
      players[player].classList.remove("player--active");
      document.querySelector(`.current-score--${player}`).textContent = 0;

      btnNew.style.backgroundColor = "rgba(248, 241, 241, 0.9)";
      btnRules.classList.add("hidden");
      dice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  players[player].classList.remove("winner");
  btnRules.classList.remove("hidden");
  players[0].classList.add("player--active");
  btnNew.removeAttribute("style");
  score0.textContent = 0;
  score1.textContent = 0;
  //reset all values
  playing = true;
  player = 0;
  scores = [0, 0];
  currentScore = 0;
});
