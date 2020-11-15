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
};

shuffleButton.addEventListener('click', () => {

  if (fruits.length<=1){
    alert('Тут нечего перемешивать');
    return false;
  }
shuffleFruits();
display();  
});

/*** ФИЛЬТРАЦИЯ ***/

const minWeightInput = document.querySelector('.minweight__input'); // поле для ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле для ввода максимального веса
const fruitsWeight = [...new Set(fruits.map(el => el.weight))]; //Получим массив уникальных весов фруктов
var minWeight = 1;
var maxWeight = 100;

const filterFruits = () => {
 return fruits.filter((item) => {
   return item.weight >= minWeight && item.weight <= maxWeight;
 });
};
filterButton.addEventListener('click', () => {
 if (minWeightInput.value != "" && maxWeightInput.value !="" ) {
 // запомним введенное пользователем минимальное значение в переменной
 minWeight = parseInt(minWeightInput.value);
 // запомним введенное пользователем максимальное значение в переменной
 maxWeight = parseInt(maxWeightInput.value);
 //фильтруем
 fruits = filterFruits();
 display();
 } else {
   alert ('Введите min и max weight')
 };
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const priorityColor = {
  "фиолетовый": 2,
  "зеленый": 1,
  "розово-красный": 3,
  "желтый": 0,
  "светло-коричневый": 4
};

const comparationColor = (fruit1, fruit2) => {
  return priorityColor[fruit1.color] > priorityColor[fruit2.color];
  //fruit1 и fruit2 это структура вида fruit: {kind: "Мангустин", color: "фиолетовый", weight: 13}
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // arr - массив, который нужно отсортировать по возрастанию
     const n = arr.length;
     // внешняя итерация по элементам
     for (let i = 0; i < n-1; i++) {
         // внутренняя итерация для перестановки элемента в конец массива
         for (let j = 0; j < n-1-i; j++) {
             // сравниваем элементы
             if (comparation(arr[j], arr[j+1])) {
                 // делаем обмен элементов
                 let temp = arr[j+1];
                 arr[j+1] = arr[j];
                 arr[j] = temp;
             }
         }
     }
  },
  // алгоритм быстрой сортировки
  quickSort(items, comparation, left, right) {
    quickSort_main(items,  comparation, left, right);
  },
  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.textContent = sortTime;
  }
};
// В алгоритме быстрой сортировки
function quickSort_main(items,  comparation, left, right) {
// функция разделитель
  function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
//        while (items[i] < pivot) {
        while (comparation(pivot, items[i])) {
            i++;
        }
//        while (items[j] > pivot) {
        while (comparation(items[j], pivot)) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
  };
    function swap (items, firstIndex, secondIndex) {
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    };
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
          quickSort_main(items, comparation, left, index - 1);
        }
        if (index < right) {
          quickSort_main(items, comparation, index, right);
        }
    }
  return items;
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value})
  display();
});
