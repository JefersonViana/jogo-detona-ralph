const state = {
  views: {
    time: document.querySelector('#time'),
    score: document.querySelector('#score'),
    enemy: document.querySelector('.enemy'),
    squares: document.querySelectorAll('.square-box'),
    start: document.querySelector('#start'),
    paragraph: document.querySelector('#paragraph'),
    endBox: document.querySelector('#end-box'),
    end: document.querySelector('#end'),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    timegame: 30,
  },
  actions: {
    time: null,
    score: null,
  },
};

const randomNumber = () => {
  const random = Math.floor(Math.random() * 9);
  if (random === state.values.hitPosition) {
    return randomNumber();
  }
  return random;
};

const cleanMatriz = () => {
  state.views.squares.forEach((square) => {
    square.classList.remove('enemy');
});
};

const randomSquare = () => {
  cleanMatriz();
  const randoNumber = randomNumber();
  const randomSquare = state.views.squares[randoNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
};

const addEvent = () => {
  state.views.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        audioPlay()
        state.values.result += 1;
        state.views.score.textContent = state.values.result;
        state.values.hitPosition = null;
      }
    });
  });
  state.views.end.addEventListener('click', finish);
};

const finish = () => {
  state.values.result = 0;
  state.values.timegame = 30;
  state.views.score.textContent = state.values.result;
  state.views.time.textContent = state.values.timegame;
  state.views.endBox.style.display = 'none';
  state.views.start.style.display = 'flex';
};

const countdown = () => {
  state.values.timegame -= 1;
  if (state.values.timegame === 0) {
    state.values.hitPosition = null;
    clearInterval(state.actions.time);
    clearInterval(state.actions.score);
    state.views.paragraph.textContent = `Seu resultado foi: ${state.values.result}`;
    state.views.endBox.style.display = 'flex';
    cleanMatriz();
    state.views.enemy.classList.add('enemy');
  }
  state.views.time.textContent = state.values.timegame;
};

const audioPlay = () => {
  const audio = new Audio('./src/audios/hit.m4a');
  audio.volume = 0.2;
  audio.play();
}

const start = () => {
  state.views.start.style.display = 'none';
  state.actions.score = setInterval(randomSquare, 500);
  state.actions.time = setInterval(countdown, state.values.gameVelocity);
  addEvent();
};

const initialize = () => {
  state.views.start.addEventListener('click', start);
};

initialize();