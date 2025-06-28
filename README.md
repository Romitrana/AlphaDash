# pending feature

> Status board

1.  total words typed ✅
2.  correct words ✅
3.  wrong words ✅
4.  Accuracy : Accuracy (%) = (Correct Characters / Total Typed Characters) × 100✅
5.  model : as per the WPM show the animal photo in that particular ranges. ✅

- check the round of WPM working or not (for 2,3,5 minutes) ❌

6. Running out of timer✅
7. Restart ✅

# on going pending work

> space bgcolor not working set correct css height in it.

# my own implemented feature

<!----------------------------Game_Initialization------------------------------>

<!-- function Initialize_Game() {
  const typeArea = document.getElementById("wallpaper");

  let RegularWord = document.createElement("div");
  RegularWord.className = "word";

  for (let i = 0; i < text[0].length; i++) {
    const char = text[0][i];

    if (char !== " ") {
      // Create and append letter to current word
      const CellDiv = document.createElement("div");
      CellDiv.textContent = char;
      CellDiv.className = "letter";
      RegularWord.appendChild(CellDiv);
    } else {
      // Append current word to typeArea
      typeArea.appendChild(RegularWord);

      // Create and append space
      const SpaceDiv = document.createElement("div");
      SpaceDiv.className = "space_div";
      SpaceDiv.innerHTML = "&nbsp;";
      typeArea.appendChild(SpaceDiv);

      // Start new word container
      RegularWord = document.createElement("div");
      RegularWord.className = "word";
    }
  }

  // In case the last word doesn't end in space, append it
  if (RegularWord.children.length > 0) {
    typeArea.appendChild(RegularWord);
  }
}

Initialize_Game(); -->

<!-- -------------------------------------start typing feature-------------------- -->

//start on key press
// function StartTyping(key) {
// console.log(currentpointer);

// //curreny key pressed logic and score updation
// //check for space counted or not

// if (key == letters[currentpointer].textContent) {
// letters[currentpointer].classList.add("CorrectLetter");
// letters[currentpointer].classList.remove("CurrentActiveLetter");
// currentpointer++;
// letters[currentpointer].classList.add("CurrentActiveLetter");
// } else {
// if (key == "Backspace") {
// letters[currentpointer].classList.remove("CurrentActiveLetter");
// if (currentpointer >= 1) {
// currentpointer--;
// }
// letters[currentpointer].classList.remove("CorrectLetter");
// letters[currentpointer].classList.remove("WrongLetter");
// letters[currentpointer].classList.add("CurrentActiveLetter");
// } else {
// const wrongLetter = new Audio("../sounds/wrongLetterSound.wav");
// wrongLetter.play();
// wrongLetter.volume = 1;
// letters[currentpointer].classList.add("WrongLetter");
// letters[currentpointer].classList.remove("CurrentActiveLetter");
// currentpointer++;
// letters[currentpointer].classList.add("CurrentActiveLetter");
// }
// }
// }

<!-- updated start typing with game status variables -->

// function StartTyping(key) {
// console.log(currentpointer);

// let expectedChar = letters[currentpointer].textContent;

// // Convert non-breaking space ( ) to regular space if needed
// if (expectedChar === "\u00A0") {
// expectedChar = " ";
// }

// if (key === expectedChar) {
// correctChar++;
// letters[currentpointer].classList.add("CorrectLetter");
// letters[currentpointer].classList.remove("CurrentActiveLetter");
// currentpointer++;
// if (currentpointer < letters.length) {
// letters[currentpointer].classList.add("CurrentActiveLetter");
// }
// console.log(correctChar)
// } else {
// if (key === "Backspace") {
// letters[currentpointer].classList.remove("CurrentActiveLetter");
// if (currentpointer >= 1) {
// currentpointer--;
// }
// letters[currentpointer].classList.remove("CorrectLetter");
// letters[currentpointer].classList.remove("WrongLetter");
// letters[currentpointer].classList.add("CurrentActiveLetter");
// } else {
// wrongChar+=1;
// const wrongLetter = new Audio("../sounds/wrongLetterSound.wav");
// wrongLetter.play();
// wrongLetter.volume = 1;

// letters[currentpointer].classList.add("WrongLetter");
// letters[currentpointer].classList.remove("CurrentActiveLetter");

// currentpointer++;
// if (currentpointer < letters.length) {
// letters[currentpointer].classList.add("CurrentActiveLetter");
// }
// }
// }
// }
