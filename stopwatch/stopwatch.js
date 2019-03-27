'use stricts';

(function () {

    // stopwatch dom
    let stopwatch = document.getElementsByClassName('stopwatch');

    [].forEach.call(stopwatch, elem => {
        // button doms
        let startStopButton = elem.querySelector('button.start-stop-button');
        let lapResetButton = elem.querySelector('button.lap-reset-button');

        // display doms
        let mins = elem.querySelector('span.minutes');
        let secs = elem.querySelector('span.seconds');
        let centis = elem.querySelector('span.centiseconds');

        // variables
        let startStatus = false;
        let lappedStatus = false;
        let startedStatus = false;

        let currentTimer = 0;
        let lastUpdateTime = new Date().getTime();
        let lastLappedTime = 0;
        let interval = 0;

        function format(n) {
            return ('00' + n).substr(-2);
        }

        function update() {
            let now = new Date().getTime();
            let difference = now - lastUpdateTime;

            currentTimer += difference;
            // console.log(currentTimer);
            currentDatetime = new Date(currentTimer);

            mins.innerHTML = format(currentDatetime.getMinutes());
            secs.innerHTML = format(currentDatetime.getSeconds());
            centis.innerHTML = format(Math.floor(currentDatetime.getMilliseconds() / 10));

            lastUpdateTime = now;
        }

        function start() {
            if (!interval) {
                lastUpdateTime = new Date().getTime();
                interval = setInterval(update, 1);
                startStatus = true;
                startedStatus = true;
            }
        }

        function changeStartButtonLayoutToStopButtonLayout() {
            startStopButton.classList.add('button-stop');
            startStopButton.classList.remove('button-start');
            startStopButton.innerHTML = 'Stop';
        }

        function changeStopButtonLayoutToStartButtonLayout() {
            startStopButton.classList.add('button-start');
            startStopButton.classList.remove('button-stop');
            startStopButton.innerHTML = 'Start';
        }

        function changeDisabledButtonToActiveButton() {
            lapResetButton.classList.add('button-active');
            lapResetButton.classList.remove('button-disabled');
        }

        function changeActiveButtonToDisabledButton() {
            lapResetButton.classList.add('button-disabled');
            lapResetButton.classList.remove('button-active');
        }

        function stop() {
            clearInterval(interval);
            interval = 0;
            startStatus = false;
            startStopButton.innerHTML = 'START';
        }

        function reset() {
            clearInterval(interval);
            interval = 0;
            startStatus = false;
            lappedStatus = false;
            startedStatus = false;
            currentTimer = 0;
            lastUpdateTime = new Date().getTime();
            lastLappedTime = 0;
            changeActiveButtonToDisabledButton();
            lapResetButton.innerHTML = 'Lap';
            mins.innerHTML = '00';
            secs.innerHTML = '00';
            centis.innerHTML = '00';
            console.log('---- reset ----');
        }


        function lap() {
            let lapTime = currentTimer - lastLappedTime;
            lastLappedTime = currentTimer;
            let lapDatetime = new Date(lapTime);
            console.log(lapDatetime.getMinutes().toString() + ':' + lapDatetime.getSeconds().toString() + '.' + Math.floor(lapDatetime.getMilliseconds() / 10).toString());
            lappedStatus = true;
        }

        function startStop() {
            if (!startStatus) {
                start();
                changeStartButtonLayoutToStopButtonLayout();
                changeDisabledButtonToActiveButton();
                lapResetButton.innerHTML = 'Lap';
            } else {
                stop();
                changeStopButtonLayoutToStartButtonLayout();
                lapResetButton.innerHTML = 'Reset';
            }
        }

        function lapReset() {
            if (!startStatus) {
                if (!startedStatus) {
                    console.log('button is disabled!');
                } else {
                    reset();
                }
            } else {
                lap();
            }
        }

        lapResetButton.addEventListener('click', lapReset);
        startStopButton.addEventListener('click', startStop);
    });

})();