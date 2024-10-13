const html = document.querySelector('html');

const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicFocusInput = document.querySelector('#alternar-musica');
const playOrPauseBtn = document.querySelector('#start-pause span');
const playOrPauseBtnIcon = document.querySelector('.app__card-primary-butto-icon');
const displayTimer = document.querySelector('#timer');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const starPauseBtn = document.querySelector('#start-pause');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTimeFinished = new Audio('./sons/beep.mp3');

// let elapsedTimeInSeconds = 1500; // 1500 = 25 min
let elapsedTimeInSeconds = 30; 
let breakId = null;

music.loop = true;

musicFocusInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    }
});



focusBtn.addEventListener('click', () => {
    // elapsedTimeInSeconds = 1500;
    elapsedTimeInSeconds = 10;
    changeContext('foco');
    focusBtn.classList.add('active');
});

shortBtn.addEventListener('click', () => {
    // elapsedTimeInSeconds = 300;
    elapsedTimeInSeconds = 5;
    changeContext('descanso-curto');
    shortBtn.classList.add('active');
});

longBtn.addEventListener('click', () => {
    // elapsedTimeInSeconds = 900;
    elapsedTimeInSeconds = 15;
    changeContext('descanso-longo');
    longBtn.classList.add('active');
});

function changeContext(context) {
    displayTime();
    buttons.forEach(function(context) {
        context.classList.remove('active');
    })
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `/imagens/${context}.png`);
    switch(context) {
        case 'foco':
            title.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            title.innerHTML = `
            Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            title.innerHTML = `
            Hora de voltar à superfície. 
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
        default:
            break;
    }
}

const countdown = () => {
    if (elapsedTimeInSeconds <= 0) {
        audioTimeFinished.play();
        alert('Acabou o tempo!');
        const activeFocus = html.getAttribute('data-contexto') == 'foco';
        if(activeFocus) {
            const event = new CustomEvent('focusFinished');
            document.dispatchEvent(event);
        }
        reset();
        return;
    }
    elapsedTimeInSeconds -= 1;
    displayTime();
}

starPauseBtn.addEventListener('click', startAndPauseTimer);

function startAndPauseTimer() {
    if (breakId) {
        audioPause.play();
        reset();
        return;
    }
    audioPlay.play();
    breakId = setInterval(countdown, 1000); // setInterval: a cada 1000 ms executa a funcao countdown
    playOrPauseBtn.textContent = 'Pausar'; // textContent somente quando queremos passar um texto, innerHTML usado em casos de texto e tags
    playOrPauseBtnIcon.setAttribute('src', `/imagens/pause.png`);
}

function reset() {
    clearInterval(breakId); // para o que o setInterval comecou 
    playOrPauseBtn.textContent = 'Começar';
    playOrPauseBtnIcon.setAttribute('src', `/imagens/play_arrow.png`);
    breakId = null; // valor volta a ser null para poder parar de rodar o if da funcao countdown
}

function displayTime() {
    const time = new Date(elapsedTimeInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    displayTimer.innerHTML = `${formattedTime}`
}

displayTime();