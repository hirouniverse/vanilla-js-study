'use strict';

// define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// define vars to hold display format
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

// define var to hold setInterval
let interval = null;

// define var to hold status of stop
let stopped = true;

// stopwatch function (logic to determine when to increment next value, etc)
function stopWatch() {

    seconds++;

    // logic to determine when to increment next value
    if (seconds >= 60) {
        seconds = 0;
        minutes++;

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    // format numbers
    if (seconds < 10) {
        displaySeconds = '0' + seconds;
    } else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = '0' + minutes;
    } else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = '0' + hours;
    } else {
        displayHours = hours;
    }

    // display updated values
    document.getElementById('display').innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}


function startStop() {
    if (stopped === true) {
        // start the stopwatch by calling setInterval
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = 'stop';
        stopped = false;
    } else {
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = 'start';
        stopped = true;
    }

    console.log(interval);
}

function reset() {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('display').innerHTML = '00:00:00';

    if (stopped !== true) {
        interval = window.setInterval(stopWatch, 1000);
        let node = document.getElementById('lapHistory');
        while (node.firstChild) {
            node.removeChild(firstChild);
        }
    }
    console.log(interval);
}

function lap() {
    if (stopped !== true) {
        let node = document.createElement('div');
        node.innerHTML = document.getElementById('display').innerHTML;
        document.getElementById('lapHistory').appendChild(node);
    }
}