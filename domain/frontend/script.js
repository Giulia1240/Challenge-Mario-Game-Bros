const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('.restart');
const gameOver = document.querySelector('.game-over');
const startScreen = document.querySelector('.start');

const audioStart = new Audio('sounds/audio_theme.mp3');
const audioGameOver = new Audio('sounds/audio_gameover.mp3');

let loopInterval;

const startGame = () => {
  pipe.classList.add('pipe-animation');
  startScreen.style.display = 'none';
  gameOver.style.display = 'none';

  audioStart.currentTime = 0;
  audioStart.play();

  loopInterval = setInterval(loop, 10);
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  mario.src = 'img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.currentTime = 0;
  audioStart.play();

  pipe.classList.add('pipe-animation');
  loopInterval = setInterval(loop, 10);
};

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

const loop = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.classList.remove('pipe-animation');
    pipe.style.left = `${pipePosition}px`;

    mario.src = 'img/game-over.png';
    mario.style.width = '80px';
    mario.style.marginLeft = '50px';

    audioStart.pause();
    audioGameOver.play();

    gameOver.style.display = 'flex';

    clearInterval(loopInterval);
  }
};

startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', restartGame);

document.addEventListener('keypress', e => {
  if (e.key === ' ') jump();
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) jump();
});
