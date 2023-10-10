const WordsСhecked = 'Булочка'; // Проверяемая сторка
const number = 20; // Максимвльно допустимая строка

// Функция для проверки длины строки

const CheckingWordLength = (words, value) => words.length <= value;
console.log(CheckingWordLength (WordsСhecked, number));


// Функция для проверки, является ли строка палиндромом

const palindrom = function (text) {
  text = text.toLowerCase();
  for(let i = 1; i <= text.length - i ; i++) {
    if(text[i - 1] === text[text.length - i]){
      return true;
    } else {
      return false;
    }
  }
};
console.log(palindrom(WordsСhecked));
