const text = 'Булочка'; // Проверяемая сторка
const number = 20; // Cтрока короче ** символов
let answer; // Переменная для записи Палиндрома

// Функция для проверки длины строки

const calculate = function (length, value) {
  if (length.length <= value) {
    console.log('true');
  } else {
    console.log('false');
  }
};
calculate (text, number);

// Функция для проверки, является ли строка палиндромом

const poli = function (txt) {
  txt = txt.toLowerCase();
  for(let i = 1; i <= txt.length - i ; i++) {
    if(txt[i - 1] === txt[txt.length - i]){
      answer = 'true';
    } else {
      answer = 'false'; break;
    }
  } return answer;
};
console.log(poli(text));
