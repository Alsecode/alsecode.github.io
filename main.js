import ProgressCircle from './progress/ProgressCircle.js';

// Получение контейнера круга
const progressCircleContainer = document.querySelector('.progress');

// Создание экземпляра ProgressCircle
const circle = new ProgressCircle(
  progressCircleContainer,
  parseFloat(progressCircleContainer.dataset.radius), // Радиус из data-radius
  parseFloat(progressCircleContainer.dataset.size)  // Размер из data-size
);

// Получение ссылок на элементы DOM
const valueInput = document.getElementById('valueInput');
const animateCheckbox = document.getElementById('animateCheckbox');
const hideCheckbox = document.getElementById('hideCheckbox');

// Обработчики событий
valueInput.addEventListener('input', () => {
  circle.setValue(parseInt(valueInput.value)); 
  valueInput.value = circle.getValue();
});

animateCheckbox.addEventListener('change', () => {
  circle.setState(animateCheckbox.checked ? 'animated' : 'default');
  hideCheckbox.checked = circle.getState() === 'hidden'; // Синхронизация
});

hideCheckbox.addEventListener('change', () => {
  circle.setState(hideCheckbox.checked ? 'hidden' : 'default');
  animateCheckbox.checked = circle.getState() === 'animated'; // Синхронизация
});

// Синхронизация чекбоксов с начальным состоянием
animateCheckbox.checked = circle.getState() === 'animated';
hideCheckbox.checked = circle.getState() === 'hidden';