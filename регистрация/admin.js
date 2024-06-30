// Получение ссылок на необходимые элементы
const newCarForm = document.getElementById("newCarForm");
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
    Скорость ${car._Speed} км/ч. <br><br>
    Город: ${car.city}<br>
    Цена: ${car.price} руб.<br><br>
    
    <button class="deleteButton">Удалить</button>
  `;
  carElement.querySelector(".deleteButton").addEventListener("click", handleDeleteCar);
  return carElement;
}

// Обработчик удаления автомобиля
function handleDeleteCar(event) {
  const carElement = event.target.closest(".car");
  const carIndex = Array.from(carElement.parentNode.children).indexOf(carElement);
  const cars = loadCarsFromStorage();
  cars.splice(carIndex, 1);
  localStorage.setItem("cars", JSON.stringify(cars));
  carElement.remove();
}

// Обработчик добавления нового автомобиля
newCarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newCar = {
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: parseInt(formData.get("year")),
    color: formData.get("color"),
    power: parseInt(formData.get("power")),
    speed: formData.get("speed"),
    city: formData.get("city"),
    price: parseInt(formData.get("price")),
  };
  const cars = loadCarsFromStorage();
  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));
  localStorage.setItem("newCar", JSON.stringify(newCar));
  event.target.reset();
  renderCarsList();
});

// Инициализация
renderCarsList();
