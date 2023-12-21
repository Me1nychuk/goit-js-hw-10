// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start');
const daysElement = document.querySelector('.value[data-days]');
const hoursElement = document.querySelector('.value[data-hours]');
const minutesElement = document.querySelector('.value[data-minutes]');
const secondsElement = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;
let userSelectedDate;
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    userSelectedDate -= new Date().getTime();
    setNewTime(convertMs(userSelectedDate));
    startCountdown(userSelectedDate);
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
   onClose(selectedDates) {
       if (selectedDates[0].getTime() > new Date().getTime()) {
            
           startBtn.disabled = false;  
       
           iziToast.success({
              title: 'OK',
               position:'topRight',
            message: 'You have selected the corect date',
           });
           
           userSelectedDate = selectedDates[0].getTime();
       } else {
          
           startBtn.disabled = true;
           
           iziToast.error({
               title: 'error',
               position:'topRight',
             message: "Please choose a date in the future"});
       }
  },
}

flatpickr(inputTime, options);

function setNewTime({ days, hours, minutes, seconds }) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function startCountdown(ms) {
    const intervalId = setInterval(() => {
        
        if (ms <= 0) {
            clearInterval(intervalId);
            iziToast.success({
              title: 'OK',
               position:'topRight',
            message: 'The Countdown is over!',
           });
        }
        else {
            setNewTime(convertMs(ms));
            ms -= 1000;
        }
    }, 1000);
}
