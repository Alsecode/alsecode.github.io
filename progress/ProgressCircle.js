class ProgressCircle {
  // конструктор принимает элемент, радиус окружности и размер контейнера окружности
  constructor(element, radius = 45, size = 200) {
    // элемент, состояние компонента, радиус, размер, длина окружности, поворот прогресса, интервал анимации
    this.element = element;
    this.state = 'default';
    this.radius = radius;
    this.size = size;
    this.circleCircumference = 2 * Math.PI * this.radius;
    this.progressCircle = null;
    this.animationInterval = null;

    this.createSvg();
    this.init();
  }

  createSvg() {
    // Создание SVG элемента
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', `0 0 ${this.size / 2} ${this.size / 2}`);
    svg.classList.add('progress__circle-container');

    // Создание базовой окружности
    const baseCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    baseCircle.classList.add('progress__circle-base');
    baseCircle.setAttribute('cx', this.size / 4);
    baseCircle.setAttribute('cy', this.size / 4);
    baseCircle.setAttribute('r', this.radius);

    // Создание окружности прогресса
    this.progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.progressCircle.classList.add('progress__circle-current-progress');
    this.progressCircle.setAttribute('cx', this.size / 4);
    this.progressCircle.setAttribute('cy', this.size / 4);
    this.progressCircle.setAttribute('r', this.radius);

    // Добавление окружностей в SVG
    svg.appendChild(baseCircle);
    svg.appendChild(this.progressCircle);

    // Добавление SVG в контейнер
    this.element.appendChild(svg);
  }

  init() {
    // Устанановка начальных стилей
    this.progressCircle.style.strokeDasharray = `${this.circleCircumference} ${this.circleCircumference}`;
    this.progressCircle.style.strokeDashoffset = this.circleCircumference;

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`; 
  }

  // API для управления состоянием (3 состояния - начальное, анимация и скрыт)
  setState(newState) {
    this.state = newState;

    switch (this.state) {
      case 'default':
        this.stopAnimation();
        this.element.style.visibility = 'visible';
        break;
      case 'animated':
        this.startAnimation();
        this.element.style.visibility = 'visible';
        break;
      case 'hidden':
        this.stopAnimation();
        this.element.style.visibility = 'hidden';
        break;
    }
  }

  // Получение состояния
  getState() {
    return this.state;
  }

  // Установка значения прогресса
  setValue(value) {
    // Валидация (ограничение значения 0-100, если пустая строка - 0)
    this.validatedValue = Math.min(Math.max(value, 0), 100) || 0;

    const dashoffset = this.circleCircumference * (1 - (this.validatedValue / 100));
    this.progressCircle.style.strokeDasharray = `${this.circleCircumference} ${this.circleCircumference}`;
    this.progressCircle.style.strokeDashoffset = dashoffset;
  }

  // Получение значения после валидации
  getValue() {
    return this.validatedValue;
  }


  // Вспомогательные методы для анимации
  startAnimation() {
    let angle = 0;
    this.animationInterval = setInterval(() => {
      angle = (angle + 2) % 360;
      this.progressCircle.style.transform = `rotate(${angle}deg)`;
    }, 20); 
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
    this.progressCircle.style.transform = `rotate(0deg)`; 
  }
}

export default ProgressCircle;