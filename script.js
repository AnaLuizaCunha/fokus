const html = document.querySelector('html');

const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
// const playBtn = document.getElementById('start-pause');
// const displayTime = document.getElementById('timer');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicFocusInput = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const starPauseBtn = document.querySelector('#start-pause');

let elapsedTimeInSeconds = 5;
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
    changeContext('foco');
    focusBtn.classList.add('active');
});

shortBtn.addEventListener('click', () => {
    changeContext('descanso-curto');
    shortBtn.classList.add('active');
});

longBtn.addEventListener('click', () => {
    changeContext('descanso-longo');
    longBtn.classList.add('active');
});

function changeContext(context) {
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
        reset();
        alert('Acabou o tempo!');
        return;
    }
    elapsedTimeInSeconds -= 1;
    console.log(elapsedTimeInSeconds);
}

starPauseBtn.addEventListener('click', startTimer);

function startAndPauseTimer() {
    if (breakId) {
        reset();
        return;
    }
    breakId = setInterval(countdown, 1000);
}

function reset() {
    clearInterval(breakId);
    breakId = null;
}





// playBtn.addEventListener('click', () => {
//     timer
// });

