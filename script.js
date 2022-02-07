import Pomodoro from './src/Pomodoro.js';

// inicia o pomodoro
window.onload = () => {
  const pomodoro = new Pomodoro();
  const body = document.querySelector('body');
  body.appendChild(pomodoro.element);
};
