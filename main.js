const questionTitle = document.getElementById("question-title");
const optionsContainer = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const container = document.getElementById("quiz-container");

let questions = [];

fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    console.log(questions);
    renderQuestion();
  });

let currentIndex = 0;
let currentScore = 0;

function renderQuestion() {
  const q = questions[currentIndex];

  questionTitle.textContent = q.question;

  optionsContainer.innerHTML = "";

  q.options.forEach((option) => {
    const label = document.createElement("label");
    label.classList.add("option-label");
    label.textContent = option;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz-option";
    input.value = option;

    label.append(input);

    label.addEventListener("click", () => selectOption(label));

    optionsContainer.append(label);
  });

  nextBtn.disabled = true;
}

function selectOption(selectedLabel) {
  const allLabels = document.querySelectorAll(".option-label");
  allLabels.forEach((lbl) => lbl.classList.remove("selected"));

  selectedLabel.classList.add("selected");

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    "input[name='quiz-option']:checked",
  );

  if (!selectedOption) return;

  const answer = selectedOption.value;
  if (answer === questions[currentIndex].correct) {
    currentScore++;
    scoreElement.textContent = currentScore;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  container.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p class="final-score">You scored ${currentScore} out of ${questions.length}</p>
    <button class="submit-btn" onclick="location.reload()">Restart Quiz</button>
  `;
}

// renderQuestion();
