let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivo = null;

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('Aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Rutas de las imágenes
let numeros = [
    'images/ghost1.png', 'images/ghost1.png',
    'images/ghost2.png', 'images/ghost2.png',
    'images/ghost3.png', 'images/ghost3.png',
    'images/ghost4.png', 'images/ghost4.png',
    'images/ghost5.png', 'images/ghost5.png',
    'images/ghost6.png', 'images/ghost6.png',
    'images/ghost7.png', 'images/ghost7.png',
    'images/ghost8.png', 'images/ghost8.png'
];
numeros = numeros.sort(() => Math.random() - 0.5);

// Cargar sonidos
const sonidoBien = new Audio('sonidos/bien.wav');
const sonidoClick = new Audio('sonidos/click.wav');
const sonidoGanar = new Audio('sonidos/ganar.wav');
const sonidoMal = new Audio('sonidos/mal.wav');
const sonidoPerder = new Audio('sonidos/perder.wav');

function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer === 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            sonidoPerder.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada = document.getElementById(i.toString());
        tarjetaBloqueada.innerHTML = `<img src="${numeros[i]}" alt="Imagen bloqueada" width="100" height="100">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    sonidoClick.play(); // Reproducir sonido al hacer clic en una tarjeta

    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id.toString());
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="${primerResultado}" alt="Imagen 1" width="100" height="100">`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id.toString());
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="${segundoResultado}" alt="Imagen 2" width="100" height="100">`;
        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            sonidoBien.play(); // Reproducir sonido al encontrar un par correcto

            if (aciertos === 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `¡Fantástico! Solo te demoraste ${timerInicial - timer} segundos.`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
                sonidoGanar.play(); // Reproducir sonido al ganar el juego
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                sonidoMal.play(); // Reproducir sonido al equivocarse
            }, 800);
        }
    }
}
