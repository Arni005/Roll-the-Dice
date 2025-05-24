//let heading1=document.querySelector("h1")
//console.log("heading",heading1)
//let input=document.querySelector("input")
//console.log("input", input)
//let player=document.querySelectorAll("input")
let players = document.querySelectorAll("input")
// Select only the roll buttons (btn1 to btn5)
let dicebutton = document.querySelectorAll('button[id^="btn"]')
let scoreSpans = document.querySelectorAll("span")
let endBtn = document.querySelector("#endBtn")
let resetBtn = document.querySelector("#resetBtn")
let winMessage = document.querySelector(".winMessage")

// Initially disable all roll buttons
dicebutton.forEach(btn => btn.disabled = true)

// Add input event listeners to each player input
players.forEach((input, index) => {
  input.addEventListener('input', function() {
    // Enable the corresponding button if input is not empty
    dicebutton[index].disabled = input.value.trim() === '';
  });
});

for (let i = 0; i <= dicebutton.length - 1; i++) {
  dicebutton[i].addEventListener("click", rollTheDice)
}

let count = 0
function rollTheDice(eventObj) {
  count++
  if (count == 5) {
    endBtn.disabled = false
  }
  let clickedButton = eventObj.target
  let clickedButtonId = clickedButton.id
  let currentIndex = clickedButtonId.slice(3) - 1

  let randomDiceValue = 1 + Math.floor(Math.random() * 6)
  scoreSpans[currentIndex].innerText = randomDiceValue
  clickedButton.disabled = true
}

endBtn.addEventListener("click", endGame)
function endGame() {
  let big = 0
  for (let i = 0; i < scoreSpans.length; i++) {
    let score = parseInt(scoreSpans[i].innerText)
    if (score > big) {
      big = score
    }
  }
  let winnerNames = []
  for (let i = 0; i < scoreSpans.length; i++) {
    let score = parseInt(scoreSpans[i].innerText)
    if (score == big) {
      winnerNames.push(players[i].value)
    }
  }
  if (winnerNames.length === 1) {
    winMessage.innerText = " Winner is: " + winnerNames[0]
  } else {
    winMessage.innerText = " Winners are: " + winnerNames.join(", ")
  }
  winMessage.style.display = "inline-block"
  winMessage.classList.add('active');
}

resetBtn.addEventListener("click", resetGame)
function resetGame() {
  for (let i = 0; i < dicebutton.length; i++) {
    scoreSpans[i].innerText = "0"
    // Re-enable buttons only if the input has a value
    dicebutton[i].disabled = players[i].value.trim() === '';
  }
  count = 0
  endBtn.disabled = true
  winMessage.innerText = ""
  winMessage.style.display = "none"
  winMessage.classList.remove('active');
  winMessage.style.display = 'none';
  winMessage.style.opacity = '0';
}