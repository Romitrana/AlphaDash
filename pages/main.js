import text from "../data.js";

//game sounds
const gameOver = new Audio("../public/sounds/gameOver.wav");
const tiktik = new Audio("../public/sounds/clocktiktik.mp3");

//game status variables
let wrongChar = 0;
let correctChar = 0;
let totalWord = 0;
let overAllAcuracy;
const timing = localStorage.getItem("timer");
document.title = `AlphaDash | Timer ${timing} Min`;
const arr = [
  "theme1.jpg",
  "theme2.jpg",
  "theme3.webp",
  "theme4.avif",
  "theme5.jpg",
  "theme6.jpg",
  "theme7.jpg",
  "theme8.jpg",
  "theme9.avif",
  "theme10.avif",
  "theme11.jpg",
  "theme12.avif",
];

const typeArea = document.getElementById("wallpaper");
const fontSelector = document.getElementById("fontSelector");

//model elements
const modelE1 = document.getElementById("model");
const closeE1 = document.getElementById("closeModel");
const overlayE1 = document.getElementById("overlay");
const restartE1 = document.getElementById("restart");

//modelData elements
const modelTimer = document.getElementById("TypingType");
const modelWord = document.getElementById("model-word");
const modelAccuracy = document.getElementById("model-accuracy");
const modelIMG = document.getElementById("modelImg");

//data elements
const wordE1 = document.getElementById("wordNumber");
const correctE1 = document.getElementById("correctNumber");
const wrongE1 = document.getElementById("wrongNumber");
const AccuracyE1 = document.getElementById("AccuracyNumber");

//timer element
const MinuteE1 = document.getElementById("minutes");
const SecondE1 = document.getElementById("seconds");

//theme change feature
function changeTheme(idx) {
  typeArea.style.backgroundImage = `url("../public/images/${arr[idx]}")`;
}
changeTheme(0);

//font family change feature
fontSelector.addEventListener("change", () => {
  const selectedFont = fontSelector.value;
  wallpaper.style.fontFamily = selectedFont;
});

//initialize game
function Initialize_Game() {
  MinuteE1.textContent = timing;
  const typeArea = document.getElementById("wallpaper");
  typeArea.innerHTML = ""; // clear previous content

  let RegularWord = document.createElement("div");
  RegularWord.className = "word";

  for (let i = 0; i < text[0].length; i++) {
    const char = text[0][i];

    if (char !== " ") {
      const CellDiv = document.createElement("div");
      CellDiv.textContent = char;
      CellDiv.className = "letter";
      RegularWord.appendChild(CellDiv);
    } else {
      // Add space at the end of the current word
      const SpaceDiv = document.createElement("div");
      SpaceDiv.className = "space_div";
      SpaceDiv.textContent = " ";
      RegularWord.appendChild(SpaceDiv);

      // Append the word (with trailing space) to the typeArea
      typeArea.appendChild(RegularWord);

      // Start a new word
      RegularWord = document.createElement("div");
      RegularWord.className = "word";
    }
  }

  // Append the last word (if any)
  if (RegularWord.children.length > 0) {
    typeArea.appendChild(RegularWord);
  }

  // Set the first letter or space as active
  const firstElement = typeArea.querySelector(".letter, .space_div");
  if (firstElement) firstElement.classList.add("active");
}

Initialize_Game();

// ----------------------typeArea font size inc/dec feature---------------
const letterSize = document.getElementsByClassName("letter");
const fontSizes = document.querySelectorAll(".font_size div");

fontSizes.forEach((item) => {
  item.addEventListener("click", () => {
    fontSizes.forEach((div) => div.classList.remove("active"));
    item.classList.add("active");

    let size;

    switch (item.innerHTML.trim()) {
      case "S":
        size = "1.5rem";
        break;
      case "M":
        size = "2rem";
        break;
      case "L":
        size = "3rem";
        break;
      default:
        console.log("some error in font size settings");
        return;
    }

    // Apply the size to all elements with class "letter"
    for (let i = 0; i < letterSize.length; i++) {
      letterSize[i].style.fontSize = size;
    }
  });
});

//----------------starting game feature-------------------

// const letters = document.querySelectorAll("#wallpaper .word .letter");
const letters = document.querySelectorAll(
  "#wallpaper .letter, #wallpaper .space_div"
);

let currentpointer = 0;
letters[currentpointer].classList.add("CurrentActiveLetter");

let hasTimestarted = true;
let timesup = false;
window.addEventListener("keyup", (event) => {
  if (hasTimestarted) {
    timerCountDown();
    console.log("exicuted once");
    hasTimestarted = false;
  }
  const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "CapsLock"];
  if (!ignoredKeys.includes(event.key) && timesup == false) {
    const correctLetter = new Audio("../public/sounds/correctLetterSound.wav");
    correctLetter.volume = 1;
    correctLetter.play();
    StartTyping(event.key);
  }
});

//start typing
function StartTyping(key) {
  if (currentpointer >= letters.length) return; // Safety check

  let expectedChar = letters[currentpointer].textContent;

  // Handle non-breaking space
  if (expectedChar === "\u00A0") {
    expectedChar = " ";
  }

  // If the typed key is correct
  if (key === expectedChar) {
    if (expectedChar === " ") {
      totalWord++;
    }
    correctChar++;

    letters[currentpointer].classList.add("CorrectLetter");
    letters[currentpointer].classList.remove("CurrentActiveLetter");

    currentpointer++;

    if (currentpointer < letters.length) {
      letters[currentpointer].classList.add("CurrentActiveLetter");
    }
  } else if (key === "Backspace") {
    letters[currentpointer].classList.remove("CurrentActiveLetter");

    if (currentpointer > 0) {
      currentpointer--;
    }

    const currentLetter = letters[currentpointer];
    const wasCorrect = currentLetter.classList.contains("CorrectLetter");
    const wasWrong = currentLetter.classList.contains("WrongLetter");
    const charText = currentLetter.textContent;

    // If previously correct
    if (wasCorrect) {
      correctChar--;

      // If it was a space, reduce word count too
      if (charText === " ") {
        totalWord--;
      }
    } else if (wasWrong) {
      wrongChar--;
    }

    // Remove any correctness class
    currentLetter.classList.remove("CorrectLetter");
    currentLetter.classList.remove("WrongLetter");
    currentLetter.classList.add("CurrentActiveLetter");
  } else {
    // Wrong key pressed
    wrongChar++;

    const wrongLetter = new Audio("../public/sounds/wrongLetterSound.wav");
    wrongLetter.volume = 1;
    wrongLetter.play();

    letters[currentpointer].classList.add("WrongLetter");
    letters[currentpointer].classList.remove("CurrentActiveLetter");

    currentpointer++;

    if (currentpointer < letters.length) {
      letters[currentpointer].classList.add("CurrentActiveLetter");
    }
  }

  // console.log(
  //   "Correct:",
  //   correctChar,
  //   "Wrong:",
  //   wrongChar,
  //   "Words:",
  //   totalWord,
  //   "current pointer:",
  //   currentpointer
  // );

  ScoreUpdation(totalWord, correctChar, wrongChar);
}

// set timer of game over
let runningTimePlayed = false;
function timerCountDown() {
  const countDownTimer = Number(timing); // in minutes
  let timer = countDownTimer * 60 * 1000; // convert to milliseconds

  const timerID = setInterval(() => {
    timer -= 1000; // subtract 1 second (1000 ms)

    if (timer <= 10000 && runningTimePlayed == false) {
      tiktik.play();
      MinuteE1.classList.add("less-time-warning");
      SecondE1.classList.add("less-time-warning");
      runningTimePlayed = true;
    }
    const minutes = Math.floor(timer / (60 * 1000));
    const seconds = Math.floor((timer % (60 * 1000)) / 1000);

    //remaining time display
    // console.log(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    MinuteE1.textContent = minutes;
    SecondE1.textContent = seconds;

    if (timer <= 0) {
      MinuteE1.classList.remove("less-time-warning");
      SecondE1.classList.remove("less-time-warning");
      timesup = true;
      gameOver.play();
      clearInterval(timerID);
      console.log("Time's up!");
      //model open
      overlayE1.style.display = "block";
      modelE1.style.visibility = "visible";
      modelTimer.textContent = `${countDownTimer} ${
        countDownTimer > 1 ? "Minutes" : "Minute"
      }`;
      modelAccuracy.textContent = `${overAllAcuracy}%`;
      const AverageWords = Math.round(totalWord / countDownTimer);
      modelWord.textContent = AverageWords;
      if (AverageWords <= 10) {
        //snail
        modelIMG.src = "../public/images/snail.png";
      } else if (AverageWords >= 11 && AverageWords <= 20) {
        //turtle
        modelIMG.src = "../public/images/turtle.png";
      } else if (AverageWords >= 21 && AverageWords <= 30) {
        // rabbit
        modelIMG.src = "../public/images/rabbit.png";
      } else if (AverageWords >= 31 && AverageWords <= 40) {
        //cheetaah
        modelIMG.src = "../public/images/cheetah.png";
      } else {
        //falcon eagle
        modelIMG.src = "../public/images/falconEagle.png";
      }
    }
  }, 1000);
}

function ScoreUpdation(w, r, c) {
  wordE1.textContent = w;
  correctE1.textContent = r;
  wrongE1.textContent = c;

  const totalTyped = r + c;
  const accuracy = totalTyped > 0 ? (r / totalTyped) * 100 : 0;

  overAllAcuracy = accuracy.toFixed(1);
  AccuracyE1.textContent = `${overAllAcuracy}%`;
}

closeE1.addEventListener("click", () => {
  modelE1.style.visibility = "hidden";
  overlayE1.style.display = "none";
  restartGame();
});

restartE1.addEventListener("click", () => {
  restartGame();
});

//restart game  (will be fully completed in future)
function restartGame() {
  location.reload();
}

//window config
window.changeTheme = changeTheme;
