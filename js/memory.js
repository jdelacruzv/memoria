// Ventana modal ---------------------------------------------------------->
var about = document.getElementById("about");
var modal = document.getElementById("modal");
var closewindow = document.getElementById("close");

about.addEventListener("click", () => modal.classList.add("show"))
closewindow.addEventListener("click", () => modal.classList.remove("show"))


// Recargar pagina -------------------------------------------------------->
loadPage = () => location.reload();


// Tiempo acumulado (temporizador) ---------------------------------------->
// setInterval(): ejecuta una función infinitamente cada x milisegundos.
// setTimeout(): ejecuta una función una sola vez después de x milisegundos. 

var second = 1, minute = 0, hour = 0;
var capture = document.getElementById("timer");

printTimer = () => {
    var hou = `${hour < 10 ? '0' + hour : hour}`;
    var min = `${minute < 10 ? '0' + minute : minute}`;
    var seg = `${second < 10 ? '0' + second : second}`;
    return `${hou}:${min}:${seg}`;
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

// Carga el contador a la pagina y espera cero para arrancar
window.onload = () => {
    document.getElementById('timer').innerHTML = '00:00:00';
    window.setTimeout('calculateTimer()', 0);
    createBoard();
}


// Logica del juego -------------------------------------------------------->
var container = document.getElementById('board');
var arrayCards = [1,2,3,4,5,6,7,8,9,10];
const COUNT = 10;

// Duplicar array de tarjetas
duplicateArrayCards = () => { 
    for(var i=1; i<=COUNT; i++) {
        arrayCards.push(i);
    }
}

// Barajar tarjetas
shufflingCards = array => array.sort(() => Math.random() - 0.5);

// Crea el tablero del juego
createBoard = () => {
    duplicateArrayCards();
    shufflingCards(arrayCards);
    for(var i=0; i<arrayCards.length; i++) {
        var card = document.createElement('img');
        card.classList.add('figure-img');
        card.setAttribute('name', arrayCards[i]);
        card.setAttribute('src', 'img/fondo-card.png');
        card.setAttribute('onClick', 'flipCard(this)');
        container.appendChild(card);
    }
}

// Voltear tarjeta
flipCard = (e) => {
    cardId = e.getAttribute('name');
    console.log(cardId);
    e.setAttribute('style', 'background-color: #999b84');
    e.setAttribute('src', `img/animals/${cardId}.svg`);
    e.removeAttribute('onClick', 'flipCard(this)');
}

// Coincidir tarjeta
matchCard = cardTemporal => {
    for(var i=0; i<=cardTemporal; i++) {
        if(i === i + 1) {
            return console.log('son iguales, no se revierte');
        } else {
            return console.log('no son iguales, se revierte');
        }

    }
}















// Muestra las imagenes
// createBoard = () => {
//     duplicateArrayCards();
//     shufflingCards(arrayCards);
//     for(var i=0; i<arrayCards.length; i++) {
//         var card = document.createElement('figure');
//         card.setAttribute('name', arrayCards[i]);
//         card.innerHTML = '<img class="figure-img" src="/img/animals/'+arrayCards[i]+'.svg"/>';
//         card.setAttribute('onClick', 'flipCard(this)');
//         container.appendChild(card);
//     }
// }

// createBoard = () => {
//     duplicateArrayCards();
//     shufflingCards(arrayCards);
//     for(var i=0; i<arrayCards.length; i++) {
//         var card = document.createElement('img');
//         card.classList.add('img-board');
//         card.setAttribute('img-board', i);
//         card.setAttribute("src", 'img/fondo-card.png');
//         card.addEventListener('click', flipCard);
//         container.appendChild(card);
//     }
// }