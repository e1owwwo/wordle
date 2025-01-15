
const words = [
  "алмақ", "балақ", "аймақ", "кітап", "далақ",
  "қалау", "қалақ", "жолақ", "құрақ",
  "кеңір", "сөйлем", "түйін", "оймақ", "қазық"
];

let solution;
let attempts;
const board = document.getElementById("game-board");
const input = document.getElementById("guess-input");
const button = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");

const soundCorrect = document.getElementById("sound-correct");
const soundPartial = document.getElementById("sound-partial");
const soundWrong = document.getElementById("sound-wrong");
const soundWin = document.getElementById("sound-win");
const soundLose = document.getElementById("sound-lose");

// Функция для начала новой игры
function startNewGame() {
  solution = words[Math.floor(Math.random() * words.length)];
  attempts = 6;

  // Очищаем поле
  board.innerHTML = '';
  for (let i = 0; i < attempts * 5; i++) {
    const cell = document.createElement("div");
    board.appendChild(cell);
  }

  input.disabled = false;
  button.disabled = false;
  input.value = '';
}

// Запускаем новую игру при загрузке
startNewGame();

// Обработчик события для кнопки "Проверить"
button.addEventListener("click", () => {
  const guess = input.value.toLowerCase();
  if (guess.length !== 5) {
    alert("Сөз 5 әріптен тұруы керек!");
    return;
  }

  const row = Array.from(board.children).slice((6 - attempts) * 5, (6 - attempts + 1) * 5);

  // Копируем правильное слово для проверки и отметки использованных букв
  let solutionCopy = solution.split('');

  for (let i = 0; i < 5; i++) {
    row[i].textContent = guess[i];

    // Если буква на правильном месте
    if (guess[i] === solution[i]) {
      row[i].classList.add("correct");
      solutionCopy[i] = null; // Убираем эту букву из копии
      soundCorrect.play();
    } 
    // Если буква есть в слове, но не на правильном месте
    else if (solutionCopy.includes(guess[i])) {
      row[i].classList.add("partial");
      solutionCopy[solutionCopy.indexOf(guess[i])] = null; // Убираем эту букву из копии
      soundPartial.play();
    } 
    // Если буквы нет в слове
    else {
      row[i].classList.add("wrong");
      soundWrong.play();
    }
    row[i].style.animation = "pop 0.3s"; // Добавляем анимацию для букв
  }

  attempts--;
  input.value = "";

  // Проверка на победу или поражение
  if (guess === solution) {
    soundWin.play();
    alert("Сіз сөзді таптыңыз!");
    input.disabled = true;
    button.disabled = true;
  } else if (attempts === 0) {
    soundLose.play();
    alert('Сіз ұтылдыңыз! Дұрыс сөз: ${solution}');
    input.disabled = true;
    button.disabled = true;
  }
});

// Обработчик события для кнопки "Сбросить игру"
resetButton.addEventListener("click", () => {
  startNewGame();
});