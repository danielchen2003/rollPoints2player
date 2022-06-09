'use strict';
const play01El = document.querySelector('.player--0');
const play02El = document.querySelector('.player--1');
const score01El = document.querySelector('#score--0');
const score02El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current01El = document.querySelector('#current--0');
const current02El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score01El.textContent = 0;
score02El.textContent = 0;
diceEl.classList.add('hidden');
let score, currentScore, activePlayer, playing;

function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  play01El.classList.add('player--active');
  play02El.classList.remove('player--active');
  play01El.classList.remove('player--winner');
  play02El.classList.remove('player--winner');
  current01El.textContent = 0;
  current02El.textContent = 0;
  score01El.textContent = 0;
  score02El.textContent = 0;
}
init();

const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  play01El.classList.toggle('player--active');
  play02El.classList.toggle('player--active');
};
// current2 = 0;
btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      // current01El.textContent = currentscore;
      // console.log(activePlayer);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swichPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
