// Tiempo acumulado (temporizador)
// setInterval(): ejecuta una función infinitamente cada x milisegundos.
// setTimeout(): ejecuta una función una sola vez después de x milisegundos. 

var second = 1, minute = 0, hour = 0;

printTimer = () => {
    var h = `${hour < 10 ? "0" + hour : hour}`;
    var m = `${minute < 10 ? "0" + minute : minute}`;
    var s = `${second < 10 ? "0" + second : second}`;
    return `${h}:${m}:${s}`;
}

calculateTimer = () => {
    timer = setInterval(() => { 
        document.getElementById("timer").innerHTML = printTimer();
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

var images = [], temporary = [], temporaryId = [], winner = [];

// Crea el array de imágenes: [1,1,2,2,...,12,12]
createImages = () => {
    for(var i=1; i<=12; i++) {
        images.push(i);
        images.push(i);
    }
}

// Desordena aleatoriamente el array de imágenes 
shuffleImages = array => array.sort(() => Math.random() - 0.5);

// Crea el tablero con las imágenes
createBoard = () => {
    createImages();
    shuffleImages(images);
    var container = document.getElementById("board");
    for(var i=0; i<images.length; i++) {
        var image = document.createElement("img");
        image.setAttribute("id", i);
        image.setAttribute("name", images[i]);
        image.setAttribute("src", "img/fondo.png");
        image.classList.add("figure-img");
        image.addEventListener("click", flipImages);
        container.appendChild(image);        
    }
}

// Voltea la imágen cuando se hace click
function flipImages() {
// flipImages = () => {  //this.getAttribute is not a function at HTMLImageElement.flipImages
    var imageName = this.getAttribute("name"); 
    var imageId = this.getAttribute("id"); 
    this.setAttribute("src", `img/animals/${imageName}.svg`);
    this.removeEventListener("click", flipImages);
    temporary.push(imageName);
    temporaryId.push(imageId);
    if (temporary.length === 2) {
        if(temporary[0] === temporary[1]) {
            setTimeout(sameImages, 500);
        }
        else {
            setTimeout(differentImages, 500);
        }
    }
}

// Verifica si las dos imágenes son iguales
sameImages = () => {
    var index = document.querySelectorAll("img[name]");
    for(var i=0; i<index.length; i++) {
        if(index[i].name === temporary[0]) {
            index[i].setAttribute("style", "opacity: 0.5");
            winner.push(index[i].name);
        }
    }
    temporary = [];
    temporaryId = [];
    winGame();
}

// Verifica si las dos imágenes son diferentes
differentImages = () => {
    var index = document.querySelectorAll("img[name]");
    index[temporaryId[0]].setAttribute("src", "img/fondo.png");
    index[temporaryId[1]].setAttribute("src", "img/fondo.png");
    index[temporaryId[0]].addEventListener("click", flipImages);
    index[temporaryId[1]].addEventListener("click", flipImages);
    temporary = [];
    temporaryId = [];
}

// Ventana modal que avisa cuando ganastes el juego 
winGame = () => {
    if(winner.length === images.length) {
        clearInterval(timer);
        winner = [];
        var modalwinner = document.getElementById("modal-winner");
        var closewinner = document.getElementById("close-winner");
        modalwinner.classList.add("show");
        closewinner.addEventListener("click", () => {
            modalwinner.classList.remove("show");
            location.reload();      
        })
    }
}

// Carga el temporizador y las imágenes del tablero
window.onload = () => {
    document.getElementById('timer').innerHTML = '00:00:00';
    calculateTimer();
    createBoard();
}

// Reinicia la página
var reset = document.getElementById("reset");
reset.addEventListener("click", () => location.reload());

// Ventana modal acerca de (about) 
var modalabout = document.getElementById("modal-about");
var about = document.getElementById("about");
var closeabout = document.getElementById("close-about");
about.addEventListener("click", () => modalabout.classList.add("show"));
closeabout.addEventListener("click", () => modalabout.classList.remove("show"));