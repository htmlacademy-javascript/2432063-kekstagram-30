const WordsСhecked = 'Булочка'; // Проверяемая сторка
const number = 2; // Максимвльно допустимая строка

// Функция для проверки длины строки

const CheckingWordLength = (words, value) => words.length <= value;
console.log(CheckingWordLength (WordsСhecked, number));


// Функция для проверки, является ли строка палиндромом

const palindrom = (text) => {
  text = text.replaceAll(' ', '').toLowerCase();
  let newText = '';
  for(let i = text.length - 1; i >= 0 ; i--) {
    newText += text[i];
  }
  return text === newText;
};

console.log(palindrom(WordsСhecked));
