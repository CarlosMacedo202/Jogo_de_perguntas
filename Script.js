const levels = {
  facil: [
    { question: "2 + 3 =", options: ["4", "5", "6", "7"], answer: "5" },
    { question: "5 - 2 =", options: ["2", "3", "4", "1"], answer: "3" },
    { question: "3 x 2 =", options: ["5", "6", "4", "3"], answer: "6" },
    { question: "10 - 4 =", options: ["6", "5", "4", "7"], answer: "6" },
    { question: "1 + 1 =", options: ["1", "2", "3", "4"], answer: "2" },
    { question: "6 + 2 =", options: ["7", "8", "9", "6"], answer: "8" },
    { question: "4 - 1 =", options: ["2", "3", "4", "5"], answer: "3" },
    { question: "5 + 0 =", options: ["4", "5", "6", "7"], answer: "5" },
    { question: "3 + 4 =", options: ["6", "7", "8", "5"], answer: "7" },
    { question: "8 - 3 =", options: ["5", "6", "4", "3"], answer: "5" }
  ],
  medio: [
    { question: "12 ÷ 4 =", options: ["2", "3", "4", "5"], answer: "3" },
    { question: "7 x 8 =", options: ["56", "54", "64", "48"], answer: "56" },
    { question: "15 + 13 =", options: ["28", "27", "29", "26"], answer: "28" },
    { question: "9 x 6 =", options: ["54", "56", "52", "48"], answer: "54" },
    { question: "36 ÷ 6 =", options: ["5", "6", "7", "8"], answer: "6" },
    { question: "11 x 3 =", options: ["33", "32", "31", "30"], answer: "33" },
    { question: "50 - 25 =", options: ["20", "25", "30", "35"], answer: "25" },
    { question: "6 x 7 =", options: ["42", "48", "36", "49"], answer: "42" },
    { question: "64 ÷ 8 =", options: ["7", "8", "9", "6"], answer: "8" },
    { question: "20 + 15 =", options: ["34", "35", "36", "33"], answer: "35" }
  ],
  dificil: [
    { question: "√144 =", options: ["11", "12", "13", "10"], answer: "12" },
    { question: "25 x 4 =", options: ["100", "90", "110", "120"], answer: "100" },
    { question: "49 ÷ 7 =", options: ["6", "7", "8", "5"], answer: "7" },
    { question: "81 ÷ 9 =", options: ["8", "9", "7", "6"], answer: "9" },
    { question: "√169 =", options: ["12", "13", "14", "15"], answer: "13" },
    { question: "13 x 7 =", options: ["91", "89", "90", "92"], answer: "91" },
    { question: "100 ÷ 25 =", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "15² =", options: ["215", "225", "235", "250"], answer: "225" },
    { question: "√225 =", options: ["14", "15", "16", "13"], answer: "15" },
    { question: "121 ÷ 11 =", options: ["9", "10", "11", "12"], answer: "11" }
  ]
};

const levelOrder = ["facil", "medio", "dificil"];
let currentLevelIndex = 0;
let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startLevel() {
  const levelKey = levelOrder[currentLevelIndex];
  currentQuestions = shuffle(levels[levelKey]); // usa as 10 perguntas
  currentQuestion = 0;
  updateLevelTitle();
  showQuestion();
}

function updateLevelTitle() {
  const titles = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };
  document.getElementById("level-title").textContent = "Nível: " + titles[levelOrder[currentLevelIndex]];
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimerDisplay();

  const q = currentQuestions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    answersDiv.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft === 0) {
      clearInterval(timer);
      disableAnswers();
      alert("Tempo esgotado! Resposta correta: " + q.answer);
      document.getElementById("next-button").style.display = "block";
    }
  }, 1000);

  document.getElementById("next-button").style.display = "none";
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = `Tempo: ${timeLeft}s`;
}

function selectAnswer(selected) {
  clearInterval(timer);
  const correct = currentQuestions[currentQuestion].answer;
  disableAnswers();
  if (selected === correct) {
    score++;
    alert("Correto!");
  } else {
    alert("Errado! Resposta correta: " + correct);
  }
  document.getElementById("next-button").style.display = "block";
}

function disableAnswers() {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < currentQuestions.length) {
    showQuestion();
  } else {
    currentLevelIndex++;
    if (currentLevelIndex < levelOrder.length) {
      startLevel();
    } else {
      endGame();
    }
  }
}

function endGame() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("level-title").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("score").textContent = `Fim de jogo! Você acertou ${score} de ${levelOrder.length * 10} perguntas.`;
}

window.onload = startLevel;
