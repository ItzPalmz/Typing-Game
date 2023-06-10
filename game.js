//Define the time limit.
let timeLimit = 30;

//Define quotes that will be used.
let quotesArray = [
  "Today is your opportunity to build the tomorrow you want.",
  "Whatever you are, be a good one.",
  "There are always flowers for those who want to see them.",
  "Every flower blooms in its own time.",
  "You will face many defeats in life, but never let yourself be defeated.",
  "The quick brown fox jumps over the lazy dog.",
  "Your success and happiness lie in you.",
  "Out of the mountain of despair, a stone of hope.",
  "When the roots are deep, there is no reason to fear the wind.",
  "You are more than who you were.",
  "Be brave. Take risks. Nothing can substitute experience."
];

//Define the elements that will be displayed.
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let accuracy_group = document.querySelector(".accuracy");
let error_text = document.querySelector(".curr_errors");
let error_group = document.querySelector(".errors");
let cpm_text = document.querySelector(".curr_cpm");
let cpm_group = document.querySelector(".cpm");
let wpm_text = document.querySelector(".curr_wpm");
let wpm_group = document.querySelector(".wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");




//Define the variable that will be used.
let timeLeft = timeLimit;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNumber = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotesArray[quoteNumber];

  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  if (quoteNumber < quotesArray.length - 1)
    quoteNumber++;
  else
    quoteNumber = 0;
}

function runText() {

  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  //Increase the number of characterTyped.
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    //Characters that are not typed.
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      //Correct characters.
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      //Incorrect characters.
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      //Increase the number of errors.
      errors++;
    }
  });

  //Display the number of errors.
  error_text.textContent = totalErrors + errors;

  //Update the accuracy.
  let correctCharacters = (characterTyped - (totalErrors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);


  if (curr_input.length == current_quote.length) {
    updateQuote();

    totalErrors += errors;

    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    //Decrease the amount of time left.
    timeLeft--;

    //Increase the amount of time elapsed.
    timeElapsed++;

    //Update the timer.
    timer_text.textContent = timeLeft + "s";
  }
  else {
    //Finish the game.
    finishGame();
  }
}

function finishGame() {
  //Stop the timer.
  clearInterval(timer);

  //Close the input area.
  input_area.disabled = true;

  //Display the instruction to play again.
  quote_text.textContent = "Click on restart to start a new game.";

  //Display restart button.
  restart_btn.style.display = "block";

  //Find the cpm and wpm.
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  //Update the cpm and wpm.
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  //Display the cpm and wpm.
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {

  resetValues();
  updateQuote();

  //Start new timer.
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = timeLimit;
  timeElapsed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNumber = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
