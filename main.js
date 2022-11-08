//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer= 300;
let timerInicial = 300;
let tiempoRegresivoId= null;

//audio
let winAudio = new Audio('./sonidos/win.wav');
let clickAudio = new Audio ('/sonidos/click.wav');
let loseAudio = new Audio ('/sonidos/lose.wav');
let rightAudio = new Audio('/sonidos/right.wav');
let wrongAudio = new Audio('/sonidos/wrong.wav');

//apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos')
let mostarAciertos = document.getElementById('aciertos')
let mostarTiempo = document.getElementById('t-restantes')
//gerneracion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{
    return Math.random()-0.5
});
console.log(numeros);
//funciones
function bloquearTarjetas(){
    for (let i =0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src = "./img/${numeros[i]}.png" alt="" >`;
        tarjetaBloqueada.disabled = true;
    }
}
function contarTiempo(){
    tiempoRegresivoId = setInterval(() => {
        timer --;
        mostarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        if(timer < 0){
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000, timer);
}
//funcion principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas == 1){
        //Mostar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros [id];
        tarjeta1.innerHTML =`<img src = "./img/${primerResultado}.png" alt="" >`
         rightAudio.play();
        //deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros [id];
        tarjeta2.innerHTML = `<img src = "./img/${segundoResultado}.png" alt="" >`;
      
        //deshabilitar segundo boton
        tarjeta2.disabled = true;
        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if (primerResultado == segundoResultado){
            // encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
             loseAudio.play();
            //Aumentar aciertos
            aciertos++;
            mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostarAciertos.innerHTML = `Aciertos: ${aciertos}😱 `
                mostarTiempo.innerHTML= `Fantastico!🎉tardaste ${timerInicial - timer}segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}🤟😎`
            winAudio.play()
            }
        }else{
             clickAudio.play();
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}