// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = "";
  for (let i = 0; i < fruits.length; i++) {
    const colorClass = colorToClass(fruits[i].color)
    let newLi = document.createElement('li');
    newLi.className = `fruit__item ${colorClass}`;
    newLi.innerHTML = `<div class="fruit__info">
                       <div>index: ${i}</div>
                       <div>kind: ${fruits[i].kind}</div>
                       <div>color: ${fruits[i].color}</div>
                       <div>weight (кг): ${fruits[i].weight}</div>
                     </div>`
    fruitsList.append(newLi);
    
  }
};

function colorToClass(color) {
  switch (color) {
    case 'фиолетовый': return 'fruit_violet';
    case 'зеленый': return 'fruit_green';
    case 'розово-красный': return 'fruit_carmazin';
    case 'желтый': return 'fruit_yellow';
    case 'светло-коричневый': return 'fruit_lightbrown'
  }
}
 
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const fruits_old = [...fruits];

  while (fruits.length > 0) {
    const i = getRandomInt(0, fruits.length - 1)
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }

  if(JSON.stringify(fruits_old)==JSON.stringify(fruits)){
    alert ('Порядок не изменился!')
  };

  fruits = result;
  // console.log(fruits_old);
  // console.log(not_shuffled);
  // console.log(fruits);
};

// let not_shuffled = fruits.every((element, index) => element == fruits_old[index]);

shuffleButton.addEventListener('click', () => {

  if (fruits.length<=1){
    alert('Тут нечего перемешивать');
    return false;
  }

  

shuffleFruits();
display();  
});


/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  var minweight = document.getElementById("minweight__input").value;
  var maxweight = document.getElementById("maxweight__input").value;
  fruits.filter((item) => {
    return item.weight > minweight && item.weight < maxweight; 
   });
};

filterButton.addEventListener('click', () => {
  console.log(fruits)
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
