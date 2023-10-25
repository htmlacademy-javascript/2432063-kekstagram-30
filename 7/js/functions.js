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


const calculateTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((item) => Number(item));
  return time = hours * 60 + minutes;
};


const showTime = (beginingWorkDay, endWorkDay, startMeeting, meetingInMinutes) => {
  const beginingWorkDayMinutes = calculateTimeInMinutes(beginingWorkDay);
  const endWorkDayMinutes = calculateTimeInMinutes(endWorkDay);
  const startMeetingMinutes = calculateTimeInMinutes(startMeeting);
  if (endWorkDayMinutes - startMeetingMinutes >= meetingInMinutes && beginingWorkDayMinutes <= startMeetingMinutes) {
    return true;
  } else {
    return false;
  }
} ;


const timeValue = showTime ('14:00', '17:30', '14:00', 90);
console.log(timeValue);
