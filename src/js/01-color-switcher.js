//Отримуємо посилання на кнопки "Start" і "Stop" з допомогою методу querySelector.
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

//Створюємо змінну intervalId, яка буде зберігати ідентифікатор інтервалу для зупинки зміни кольору фону.
let intervalId = null;

//Створюємо функцію setBodyBgColor, яка генерує випадковий колір за допомогою функції getRandomHexColor і встановлює його як фон body.
function setBodyBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

//Створюємо функцію startBgColorChange, яка запускає зміну кольору фону кожну секунду за допомогою функції setInterval і зберігає ідентифікатор інтервалу в змінній intervalId. Також вимикаємо кнопку "Start" за допомогою властивості disabled.
function startBgColorChange() {
    intervalId = setInterval(setBodyBgColor, 1000);
    startBtn.disabled = true;
}

//Створюємо функцію stopBgColorChange, яка зупиняє зміну кольору фону за допомогою функції clearInterval і вмикає кнопку "Start".
function stopBgColorChange() {
    clearInterval(intervalId);
    startBtn.disabled = false;
}

//Додаємо обробники подій click на кнопки "Start" і "Stop", які викликають функції startBgColorChange і stopBgColorChange/
startBtn.addEventListener('click', startBgColorChange);
stopBtn.addEventListener('click', stopBgColorChange);

//Створюємо функцію getRandomHexColor, яка генерує випадковий колір в форматі HEX за допомогою методу Math.random() і методу toString(16). Для того, щоб довжина HEX-коду завжди була 6 символів, доповнюємо результат методом `padStart(6, '0')'
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

