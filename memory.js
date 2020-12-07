// Ventana modal
var about = document.getElementById("about");
var container = document.getElementById("modal-container");
var closewindow = document.getElementById("close");

about.addEventListener("click", () => container.classList.add("show"))
closewindow.addEventListener("click", () => container.classList.remove("show"))


// Recargar pagina
loadPage = () => location.reload();


// Tiempo restante
startday = new Date();

initStopwatch = () => {
    var myTime = new Date();
    return (myTime.getTime() - startday.getTime()) / 1000;
}

calculateTime = () => { 
    var tSecs = Math.floor(initStopwatch());
    var second = tSecs % 60;
    second = "" + (second < 10 ? "0" + second : second);

    var minute = Math.floor((tSecs / 60) % 60);
    minute = "" + (minute < 10 ? "0" + minute : minute);
    
    var hour = Math.floor(tSecs / 3600)    
    hour = "" + (hour < 10 ? "0" + hour : hour);

    document.getElementById('timeleft').value = hour + ":" + minute + ":" + second;
    window.setTimeout("calculateTime()", 1000); // Actualiza cada segundo
}

window.onload = () => window.setTimeout("calculateTime()", 1);

// startday = new Date();
// clockStart = startday.getTime(); // Devuelve el número en milisegundos

// initStopwatch = () => {
//     var myTime = new Date();
//     return ((myTime.getTime() - clockStart) / 1000);
// }

// getSecs = () => { 
//     var tSecs = Math.round(initStopwatch());
//     var iSecs = tSecs%60;
//     var iMins = Math.round((tSecs-30)/60);
//     var sSecs = "" + ((iSecs>9) ? iSecs : "0" + iSecs);
//     var sMins = "" + ((iMins>9) ? iMins : "0" + iMins);
//     document.getElementById('timespent').value = sMins + ":" + sSecs;
//     // Actualiza cada segundo
//     window.setTimeout('getSecs()', 1000);
// }

// window.onload = () => window.setTimeout('getSeconds()', 1);