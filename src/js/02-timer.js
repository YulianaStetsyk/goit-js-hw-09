import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysEL = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let dateInFuture = {};
let timerId = null;
const inputEL = document.getElementById('datetime-picker');

startBtn.addEventListener('click', clickOnStart);
startBtn.setAttribute('disabled', 'disabled');

let minus = 0;

function clickOnStart() {
    timerId = setInterval(() => {
        minus -= 1000;
        dateInFuture = convertMs(minus);
        daysEL.textContent = `${dateInFuture.days}`.padStart(2, '0');
        hourEl.textContent = `${dateInFuture.hours}`.padStart(2, '0');
        minutesEl.textContent = `${dateInFuture.minutes}`.padStart(2, '0');
        secondsEl.textContent = `${dateInFuture.seconds}`.padStart(2, '0');
        if (minus < 1000) {
            clearInterval(timerId);
            return;
        }
    }, 1000);
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        minus = selectedDates[0] - options.defaultDate;
        if (minus < 0) {
            startBtn.setAttribute('disabled', 'disabled');
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        startBtn.removeAttribute('disabled', 'disabled');
    },
};

flatpickr(inputEL, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute)/ second);
    return { days, hours, minutes, seconds };
} 