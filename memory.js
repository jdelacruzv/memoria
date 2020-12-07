// Ventana modal
var about = document.getElementById("about");
var container = document.getElementById("modal-container");
var closewindow = document.getElementById("close");

about.addEventListener("click", () => container.classList.add("show"))
closewindow.addEventListener("click", () => container.classList.remove("show"))


// Recargar pagina
loadPage = () => location.reload();


// Tiempo acumulado(temporizador)
// setInterval(): sirve para ejecutar una función infinitamente cada x milisegundos.
// setTimeout(): ejecuta una función una sola vez después de x milisegundos. 

var second = 1, minute = 0, hour = 0;
var capture = document.getElementById("timer");

printTimer = () => {
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
}

calculateTimer = () => {
    setInterval(() => { 
            capture.innerHTML = printTimer();
            second++;
            if(second === 59) {
                second = 0;
                minute++;
                if(minute === 59) {
                    minute = 0;
                    hour++;
                }
            }
    }, 1000);
}
// Carga el contador a la pagina y espera un segundo para arrancar
window.onload = () => window.setTimeout('calculateTimer()', 1);