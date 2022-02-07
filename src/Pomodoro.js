export default class Pomodoro {
  constructor() {
    // controlador da transição do botão do Pomodoro
    this.isClicked = false;

    // minutos e segundos
    this.s = 0;
    this.m = 25;

    // quantidade de pomodoros
    this.pomodoros = 0;

    // os tempos padrões para cada tipo de timer
    this.Pomodoro = 25;
    this.Short = 5;
    this.Long = 15;

    this.type = 'Pomodoro';

    // Faz toda a manipulão do DOM, criando o Pomodoro.element
    this.createContainer();
  }

  removeBkColor() {
    const body = document.querySelector('body');
    body.classList.remove('main-bk');
    body.classList.remove('short-bk');
    body.classList.remove('long-bk');
  }

  changeBkColor(type) {
    // Muda o background do container
    let classList = 'main-bk';
    if (type === 'Short') classList = 'short-bk';
    else if (type === 'Long') classList = 'long-bk';

    const container = document.querySelector('.container');
    if (container) {
      container.classList = 'container ' + classList;
    }

    // Muda o background do body
    this.removeBkColor();
    const body = document.querySelector('body');
    body.classList.add(classList);
  }

  // toca som por 5 segundos
  playSound() {
    const playingTime = 5000;
    const audio = document.createElement('audio');
    audio.src = './assets/alarm.mp3';
    audio.currentTime = 7;
    audio.play();
    setInterval(() => {
      audio.pause();
    }, playingTime);
  }

  // Controla o os atributos de minutos e segundo pomodoro 
  // e toca o som quando o tempo acaba
  timer(element) {
    if (this.m <= 0 && this.s <= 0) {
      clearInterval(this.interval);
      this.playSound();

      if (this.pomodoros >= 3 && this.type === 'Pomodoro') {
        this.changePomodoro('Long');
        this.pomodoros = 0;
      } else if (this.type === 'Pomodoro') {
        this.changePomodoro('Short');
        this.pomodoros++;
      } else {
        this.changePomodoro('Pomodoro');
      }
    } else if (this.s <= 0) {
      this.m--;
      this.s = 59;
    } else this.s--;
    this.changeTimeElement(element);
  }

  // retorna como string os valores de segundos e minutos
  get getTimer() {
    const minutes = this.m < 10 ? '0' + this.m : this.m;
    const seconds = this.s < 10 ? '0' + this.s : this.s;
    const timer = minutes + ':' + seconds;
    return timer;
  }

  // muda o tipo do pomodoro
  // changeToPlay é um booleano que se for true texto colocado será play
  // se changeToPlay for false ou não declarado o texto mudará de Play para Pause ou o contrário
  changePomodoro(type, changeToPlay) {
    this.changeBkColor(type);
    this.m = this[type];
    this.s = 0;
    clearInterval(this.interval);
    this.timerElement.textContent = this.getTimer;
    this.type = type;
    this.changeButtonText(changeToPlay);
  }

  // changeToPlay é usado aqui para a troca do nome da ação do botão
  changeButtonText(changeToPlay) {
    if (changeToPlay) this.playBtn.textContent = 'Play';
    else
      this.playBtn.textContent =
        this.playBtn.textContent === 'Play' ? 'Pause' : 'Play';
    document.title = this.getTimer + ' - ' + this.type;
  }

  // muda o titulo da aba, para o timer
  changeTimeElement(element) {
    const timer = this.getTimer;
    document.title = this.getTimer + ' - ' + this.type;
    element.textContent = timer;
  }

  createContainer() {
    this.changeBkColor('Pomodoro');

    const body = document.querySelector('body');
    const container = document.createElement('button');
    const timer = document.createElement('h3');
    const btnContainer = document.createElement('div');
    const play = document.createElement('p');
    const settings = this.createSettingsBtn();

    this.playBtn = play;

    container.classList = 'container main-bk';
    timer.classList.add('timer');
    btnContainer.classList.add('btn-container');
    const timerText = this.getTimer;
    play.textContent = 'Play';
    timer.textContent = timerText;
    ['Pomodoro', 'Short', 'Long'].forEach((type) => {
      btnContainer.appendChild(this.createTypeBtn(type));
    });

    this.putContainerEvents(container, play);

    this.element = container;
    this.timerElement = timer;
    body.appendChild(btnContainer);
    container.appendChild(timer);
    container.appendChild(settings);
    container.appendChild(play);
  }

  createTypeBtn(type) {
    const box = document.createElement('div');
    const btn = document.createElement('button');

    let classList = 'main-bk';
    if (type === 'Short') classList = 'short-bk';
    else if (type === 'Long') classList = 'long-bk';

    box.classList.add('box');
    btn.classList = 'btn-type ' + classList;
    btn.classList.add(type);
    btn.textContent = type;
    box.addEventListener('click', () => this.changePomodoro(type, true));
    box.appendChild(btn);
    return box;
  }

  createSettingsBtn() {
    const body = document.querySelector('body');
    const btn = document.createElement('button');
    btn.addEventListener('click', () => {
      const settings = this.createSettings();
      body.appendChild(settings);
    });
    btn.classList.add('settings');
    btn.textContent = '⚙';
    return btn;
  }

  createSettingsInputs(type) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const fieldset = document.createElement('fieldset');
    const labelText = type === 'Pomodoro' ? type : type + ' break';

    label.textContent = labelText;
    label.htmlFor = type;
    label.classList.add('change-label');

    input.type = 'number';
    input.id = type;
    input.value = this[type];
    input.max = 60;
    input.min = 1;
    input.classList.add('change-time');

    fieldset.appendChild(label);
    fieldset.appendChild(input);

    return fieldset;
  }

  createSettings() {
    const cover = document.createElement('div');
    const div = document.createElement('div');
    const exit = document.createElement('button');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const confirm = document.createElement('button');
    const form = document.createElement('form');
    const types = ['Pomodoro', 'Short', 'Long'];

    cover.classList.add('cover');
    div.classList.add('settings-box');
    exit.classList.add('exit');
    confirm.classList.add('confirm');

    h3.textContent = 'Settings';
    p.textContent = 'Change Time';
    confirm.textContent = 'Apply';
    exit.textContent = 'x';

    cover.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) return;
      const cover = document.querySelector('.cover');
      cover.parentElement.removeChild(cover);
    });

    exit.addEventListener('click', () => {
      const cover = document.querySelector('.cover');
      cover.parentElement.removeChild(cover);
    });

    confirm.addEventListener('click', () => {
      const inputs = [...document.querySelectorAll('.change-time')];
      const values = inputs.map((input) => input.value);

      this.Pomodoro = values[0];
      this.Short = values[1];
      this.Long = values[2];

      this.changePomodoro(this.type, true);

      const cover = document.querySelector('.cover');
      cover.parentElement.removeChild(cover);
    });

    types.forEach((type) => {
      const input = this.createSettingsInputs(type);
      form.appendChild(input);
    });

    div.appendChild(exit);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(form);
    div.appendChild(confirm);

    cover.appendChild(div);

    return cover;
  }

  isSettingsBtn(e) {
    const elementType = e.target.type;
    const containsClassSettings = e.target.classList.contains('settings');
    return elementType === 'submit' && containsClassSettings;
  }

  putContainerEvents(container) {
    // Eventos de transição e de ação
    
    container.addEventListener('mousedown', (e) => {
      if (this.isSettingsBtn(e)) return;
      this.isClicked = true;
      container.classList.add('active');
    });

    container.addEventListener('mouseleave', () => {
      if (!this.isClicked) return;
      container.classList.remove('active');
      if (this.playBtn.textContent === 'Play') {
        this.interval = setInterval(() => this.timer(this.timerElement), 1000);
      } else clearInterval(this.interval);
      this.changeButtonText();
      setTimeout(() => container.classList.remove('active'), 200);
    });

    container.addEventListener('mouseup', (e) => {
      if (this.isSettingsBtn(e)) return;
      this.isClicked = false;
      if (this.playBtn.textContent === 'Play') {
        this.interval = setInterval(() => this.timer(this.timerElement), 1000);
      } else clearInterval(this.interval);
      this.changeButtonText();
      setTimeout(() => container.classList.remove('active'), 200);
    });
  }
}
