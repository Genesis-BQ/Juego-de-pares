//variables
let terjertasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerinicial = 50;
let tiempoRegresivoId = null;
//variables de sonidos
let winAudio   = new Audio('sounds/win.wav');
let loseAudio  = new Audio('sounds/lose.wav');
let rightAudio = new Audio('sounds/right.wav');
let wrongAudio = new Audio('sounds/wrong.wav');
let clickAudio = new Audio('sounds/click.wav');

//mostrar datos
let mostrarMovimientos = document.getElementById("movimientos") //mostras movimientos de la cartas
let mostrarAciertos = document.getElementById("aciertos") //mostrar los aciertos de las cartas
let mostrarTiempo = document.getElementById("tiempo-restante") //mostrar el tiempo

//Crear un array que vaya en pares
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random() -0.5}) //datos aletorios

function contarTiempo(){ //contador de tiempo
    tiempoRegresivoId = setInterval(() => {
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            //audios
            loseAudio.play();
        }
    },1000);
}

function bloquearTarjetas(){
    for( let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="img/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal para destapar las cartas
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    terjertasDestapadas++;
    if(terjertasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="img/${primerResultado}.png">`;
        //Audio
        clickAudio.play();
        tarjeta1.disabled = true;
    }else if(terjertasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="img/${segundoResultado}.png">`;
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if(primerResultado == segundoResultado){
            terjertasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId); //reinicia todo
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
                mostrarTiempo.innerHTML = `Fantastico: ${timerinicial - timer} segundos`;
                winAudio.play();
            }
        }else{
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                terjertasDestapadas = 0;
                //Audio
                wrongAudio.play();
            },700);
        }
    }
}