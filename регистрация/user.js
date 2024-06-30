// Получение ссылки на контейнер для автомобилей
const carsContainer = document.getElementById("carsContainer");

// Загрузка списка автомобилей из localStorage
function loadCarsFromStorage() {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  return cars;
}

// Отображение списка автомобилей
function renderCarsList() {
  carsContainer.innerHTML = "";
  const cars = loadCarsFromStorage();
  cars.forEach((car) => {
    const carElement = createCarElement(car);
    carsContainer.appendChild(carElement);
  });
}

// Создание элемента для отображения автомобиля
function createCarElement(car) {
  const carElement = document.createElement("div");
  carElement.classList.add("car");
  carElement.innerHTML = `
    <h3>${car.brand}  ${car.model}</h3>
    Год выпуска: ${car.year}<br>
    Цвет: ${car.color}<br>
    Мощность: ${car.power} л.с.<br>
    Город: ${car.city}<br>
    Цена: ${car.price} руб.<br><br>
    Скорость ${car._Speed} км/ч. <br><br>
  `;
  return carElement;
}

// Инициализация
renderCarsList();