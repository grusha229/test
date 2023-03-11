const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

/**
* Функция парсит секунды и обновляет значения в DOM
* @param  {number} seconds      количество секунд
* @return {void}                Обновляет элемент span
*/
const secondsParser = (seconds) => {
  let parsedHours = (Math.trunc(seconds / (60*60))).toString().padStart(2,'0');
  let parsedMinutes = (Math.trunc((seconds - parsedHours*60*60) / 60)).toString().padStart(2,'0');
  let parsedSeconds = (Math.trunc((seconds - parsedHours*60*60 - parsedMinutes*60))).toString().padStart(2,'0');

  timerEl.innerHTML = `${parsedHours}:${parsedMinutes}:${parsedSeconds}`
}

const createTimerAnimator = () => {
  return function (seconds) {
    let deadlineTime = seconds;
    let timer = setInterval(function () {
      if (deadlineTime === 0) {
        clearInterval(timer);
        secondsParser(0);
        alert('Время истекло!');
      }
      if (deadlineTime > 0) {
        secondsParser(deadlineTime);
        --deadlineTime;
      }
    }, 1000)
    return timer
  }
}

const animateTimer = createTimerAnimator();


/**
 * Очищаем инпут с помощью регулярного выражения
 * Заменяем все символы в строке, кроме цифр, на ''
 */
inputEl.addEventListener('input',
    function(){
      this.value = this.value.replace(/[^\d]/g, '');
    }
)

buttonEl.addEventListener('click', (e) => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});
