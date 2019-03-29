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

        //display
        let lapHistory = elem.querySelector('div.lap-history');
        let currentLapItem, currentLapName, currentLapTimer = 0;

        // variables
        let startStatus = false;
        let lappedStatus = false;
        let startedStatus = false;

        let currentTimer = 0;
        let lastUpdateTime = new Date().getTime();
        let lastLappedTime = 0;
        let interval = 0;

        let lapPrefix = 'Lap ';
        let lapNumber = 1;

        // format displayed timer
        // 1 -> 01, 5 -> 05, 55 -> 55
        function format(n) {
            return ('00' + n).substr(-2);
        }

        // update normal & lap timers
        function update() {

            // get current datetime
            let now = new Date().getTime();

            // calcurate previous updated time and current datetime
            let difference = now - lastUpdateTime;
            currentTimer += difference;

            let currentTime = new Date(currentTimer);
            let currentLapTime = new Date(currentTimer - lastLappedTime);


            // update current timer display
            mins.innerHTML = format(currentTime.getMinutes());
            secs.innerHTML = format(currentTime.getSeconds());
            centis.innerHTML = format(Math.floor(currentTime.getMilliseconds() / 10));

            currentLapTimer.innerHTML = format(currentLapTime.getMinutes()) + ':' + format(currentLapTime.getSeconds()) + '.' + format(Math.floor(currentLapTime.getMilliseconds() / 10));

            // console.log(currentLapTime);

            lastUpdateTime = now;
        }

        function start() {
            if (!interval) {
                if (!lapHistory.querySelector('table.lap-items')) {
                    console.log("There is no lap items! Let's create one!");
                    let tableForLap = document.createElement('table');
                    tableForLap.className = 'lap-items';

                    let currentLapBody = document.createElement('tbody');
                    currentLapItem = document.createElement('tr');

                    currentLapName = document.createElement('td');
                    currentLapName.innerHTML = lapPrefix + lapNumber;
                    currentLapTimer = document.createElement('td');

                    currentLapItem.appendChild(currentLapName);
                    currentLapItem.appendChild(currentLapTimer);

                    currentLapBody.appendChild(currentLapItem);
                    tableForLap.appendChild(currentLapBody);

                    lapHistory.appendChild(tableForLap);
                    lapHistory.className = 'lap-table';
                }

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
            lapNumber = 1;
            while (lapHistory.firstChild) lapHistory.removeChild(lapHistory.firstChild);
            console.log('---- reset ----');
        }

        function lap() {
            let lapTime = currentTimer - lastLappedTime;
            lastLappedTime = currentTimer;
            let lapDatetime = new Date(lapTime);
            // console.log(lapDatetime.getMinutes().toString() + ':' + lapDatetime.getSeconds().toString() + '.' + Math.floor(lapDatetime.getMilliseconds() / 10).toString());

            let lapStr = format(lapDatetime.getMinutes()) + ':' + format(lapDatetime.getSeconds()) + '.' + format(Math.floor(lapDatetime.getMilliseconds() / 10));
            if (document.querySelector('table.lap-items')) {
                let items = document.querySelector('table.lap-items');
                let body = items.querySelector('tbody');

                let tableRow = document.createElement('tr');
                let tableDataForLapName = document.createElement('td');
                let tableDataForLapTime = document.createElement('td');

                tableDataForLapName.innerHTML = lapPrefix + lapNumber;
                lapNumber++;
                tableDataForLapTime.innerHTML = lapStr;

                tableRow.appendChild(tableDataForLapName);
                tableRow.appendChild(tableDataForLapTime);
                // body.appendChild(tableRow);
                // targetElement.insertAdjacentElement(position, element);
                currentLapItem.insertAdjacentElement('afterend', tableRow);
                currentLapName.innerHTML = lapPrefix + lapNumber;
            }

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