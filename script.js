'use strict';

const checkBtn = document.querySelector(`.check`);
const resetBtn = document.querySelector(`.again`);
const guess = document.querySelector(`.number`);
const inputNumber = document.querySelector(`input[type='number']`);
const highscore = document.querySelector(`.highscore`);

const correctGuessBg = document.querySelector(`body`);
let guessNumber = Math.floor(Math.random() * 20) + 1;
let scorePoints = 20;
let highestScore = 0;

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

const updateScore = function (score) {
  document.querySelector(`.score`).textContent = score;
};

const evaluateInputAndScore = function (input) {
  if (scorePoints > 1) {
    scorePoints--;
    displayMessage(
      `${input}? ${input > guessNumber ? `Too high!` : `Too low!`}`
    );
    updateScore(scorePoints);
    inputNumber.value = ``;
  } else {
    displayMessage(`You lose!`);
    guess.textContent = guessNumber;
    correctGuessBg.style.backgroundColor = `red`;
    updateScore(0);
    checkBtn.disabled = true;
    inputNumber.disabled = true;
  }
};

const checkInput = function () {
  const inputValue = Number(inputNumber.value);
  if (!inputValue) {
    displayMessage(`❗ Please input a number`);
  } else if (inputValue === guessNumber) {
    guess.textContent = guessNumber;
    guess.style.width = `25rem`;
    correctGuessBg.style.backgroundColor = `#60b347`;
    displayMessage(`🎉 Correct!`);
    inputNumber.value = ``;
    checkBtn.disabled = true;
    inputNumber.disabled = true;

    if (scorePoints > highestScore) {
      highestScore = scorePoints;
      highscore.textContent = highestScore;
    }
  } else if (inputValue !== guessNumber) {
    evaluateInputAndScore(inputValue);
  }
};

checkBtn.addEventListener(`click`, checkInput);

resetBtn.addEventListener(`click`, function () {
  correctGuessBg.style.backgroundColor = `#222`;
  guessNumber = Math.floor(Math.random() * 20) + 1;
  guess.textContent = `?`;
  guess.style.width = `15rem`;
  inputNumber.value = ``;
  checkBtn.disabled = false;
  inputNumber.disabled = false;
  scorePoints = 20;
  updateScore(scorePoints);
  displayMessage(`Start guessing...`);
});
