// Load the timer and board images
window.onload = () => {
    document.getElementById('timer').innerHTML = '00:00:00';
    calculateTimer();
    createBoard();
}

// Accumulated time (timer) ---------------------------------------------->
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


var container = document.getElementById("board");
var images = [1,2,3,4,5,6,7,8,9,10];
var temporary = [], winner = [];
const count = 10;

// Duplicate array of images
duplicateArrayImages = () => { 
    for(var i=1; i<=count; i++) {
        images.push(i);
    }
}

// Disorder the positions of the images
messArrayImages = array => array.sort(() => Math.random() - 0.5);

// Create the game board
createBoard = () => {
    duplicateArrayImages();
    messArrayImages(images);
    for(var i=0; i<images.length; i++) {
        var image = document.createElement("img");
        image.classList.add("figure-img");
        image.setAttribute("name", images[i]);
        image.setAttribute("src", "img/fondo.png");
        image.setAttribute("onclick", "flipImages(this)");
        container.appendChild(image);
    }
}

// Flip the images
flipImages = (e) => {
    var imageId = e.getAttribute("name");
    console.log(imageId);
    e.setAttribute("src", `img/animals/${imageId}.svg`);
    e.setAttribute("style", "background-color: #999b84");
    e.removeAttribute("onClick", "flipImages(this)");
    temporary.push(imageId);
    if (temporary.length === 2) {
        verifySameImages();
    }
}

// Check if the images are the same
verifySameImages = () => {
    var index = document.querySelectorAll("img[name]");
    if(temporary[0] === temporary[1]) {
        for(var i=0; i<index.length; i++) {
            if(index[i].name === temporary[0]) {
                index[i].setAttribute("style", "opacity: 0.5");
                winner.push(index[i].name);
            }
        }
        temporary = [];
    }
    else {
        for(var i=0; i<index.length; i++) {
            if(index[i].name === temporary[0]) { 
                var pos0 = index[i];
            }
            if(index[i].name === temporary[1]) { 
                var pos1 = index[i]; 
                break;
            }
        }
        setTimeout(() => {
            pos0.setAttribute("src", "img/fondo.png");
            pos0.setAttribute("onClick", "flipImages(this)");
            pos1.setAttribute("src", "img/fondo.png");
            pos1.setAttribute("onClick", "flipImages(this)");
        }, 500);
        console.log(pos0);
        console.log(pos1);
        temporary = [];
    }
    if(winner.length === images.length/10) {
        clearInterval(timer);
        winner = [];
        setTimeout(() => {
            var modalwinner = document.getElementById("modal-winner");
            var closewinner = document.getElementById("close-winner");
            modalwinner.classList.add("show");
            closewinner.addEventListener("click", () => {
                modalwinner.classList.remove("show");
                location.reload();            
            })
            
        }, 500);
    }
}

// Restart the page ------------------------------------------------------->
var reset = document.getElementById("reset");
reset.addEventListener("click", () => location.reload());


// Window about ----------------------------------------------------------->
var modalabout = document.getElementById("modal-about");
var about = document.getElementById("about");
var closeabout = document.getElementById("close-about");
about.addEventListener("click", () => modalabout.classList.add("show"));
closeabout.addEventListener("click", () => modalabout.classList.remove("show"));