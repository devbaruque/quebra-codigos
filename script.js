const challenges = {
  code: [
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '1-2-3'?",
      answer: "abc",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '3-2-1'?",
      answer: "cba",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '2-1-3'?",
      answer: "bac",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '1-3-2'?",
      answer: "acb",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '3-1-2'?",
      answer: "cab",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '2-3-1'?",
      answer: "bca",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '1-1-1'?",
      answer: "aaa",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '2-2-2'?",
      answer: "bbb",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '3-3-3'?",
      answer: "ccc",
    },
    {
      question:
        "Decifre o código: A = 1, B = 2, C = 3. Qual é a palavra para '1-2-1'?",
      answer: "aba",
    },
  ],
  sequence: [
    { question: "Complete a sequência: 2, 4, 6, _", answer: "8" },
    { question: "Complete a sequência: 5, 10, 15, _", answer: "20" },
    { question: "Complete a sequência: 3, 6, 9, _", answer: "12" },
    { question: "Complete a sequência: 1, 4, 9, _", answer: "16" },
    { question: "Complete a sequência: 10, 20, 30, _", answer: "40" },
    { question: "Complete a sequência: 7, 14, 21, _", answer: "28" },
    { question: "Complete a sequência: 0, 1, 1, 2, 3, _", answer: "5" },
    { question: "Complete a sequência: 12, 24, 36, _", answer: "48" },
    { question: "Complete a sequência: 8, 16, 24, _", answer: "32" },
    { question: "Complete a sequência: 9, 18, 27, _", answer: "36" },
  ],
  message: [
    {
      question: "Decodifique a mensagem: 'dliw' (Cifra de César +3)",
      answer: "wild",
    },
    {
      question: "Decodifique a mensagem: 'jodv' (Cifra de César +3)",
      answer: "goat",
    },
    {
      question: "Decodifique a mensagem: 'sulp' (Cifra de César +3)",
      answer: "piso",
    },
    {
      question: "Decodifique a mensagem: 'udlo' (Cifra de César +3)",
      answer: "raio",
    },
    {
      question: "Decodifique a mensagem: 'whdp' (Cifra de César +3)",
      answer: "team",
    },
    {
      question: "Decodifique a mensagem: 'frjd' (Cifra de César +3)",
      answer: "code",
    },
    {
      question: "Decodifique a mensagem: 'orqj' (Cifra de César +3)",
      answer: "long",
    },
    {
      question: "Decodifique a mensagem: 'oxfd' (Cifra de César +3)",
      answer: "luck",
    },
    {
      question: "Decodifique a mensagem: 'fkdw' (Cifra de César +3)",
      answer: "chat",
    },
    {
      question: "Decodifique a mensagem: 'grj' (Cifra de César +3)",
      answer: "dog",
    },
  ],
};

let currentChallenge;
let timeLeft = 30;
let timer;
let score = 0;
let totalChallenges = 30;
let challengesCompleted = 0;

const challengeText = document.getElementById("challenge-text");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const resultText = document.getElementById("result");
const timerText = document.getElementById("timer");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function startGame() {
  score = 0;
  challengesCompleted = 0;
  endScreen.style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  submitBtn.style.display = "block"; // Exibe o botão "Enviar"
  restartBtn.style.display = "none"; // Oculta o botão "Jogar Novamente"
  loadRandomChallenge();
  startTimer();
}

function loadRandomChallenge() {
  const challengeTypes = Object.keys(challenges);
  const randomType =
    challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
  const randomChallenge =
    challenges[randomType][
      Math.floor(Math.random() * challenges[randomType].length)
    ];
  currentChallenge = randomChallenge;
  challengeText.textContent = randomChallenge.question;
  userInput.value = "";
  resultText.textContent = "";
  userInput.focus(); // Foca no campo de entrada automaticamente
}

function startTimer() {
  clearInterval(timer); // Limpa o timer anterior, se houver
  timeLeft = 30;
  timerText.textContent = `Tempo restante: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

function checkAnswer() {
  const userAnswer = userInput.value.trim().toLowerCase();
  const correctAnswer = currentChallenge.answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    resultText.textContent = "Correto!";
    score++;
    challengesCompleted++;
    if (challengesCompleted >= totalChallenges) {
      endGame(true);
    } else {
      setTimeout(() => {
        loadRandomChallenge();
        startTimer(); // Reinicia o timer para o próximo desafio
      }, 1000);
    }
  } else {
    resultText.textContent = "Incorreto! Tente novamente.";
  }
}

function endGame(win) {
  clearInterval(timer);
  document.getElementById("game-screen").style.display = "none";
  endScreen.style.display = "block";
  submitBtn.style.display = "none"; // Oculta o botão "Enviar"
  restartBtn.style.display = "block"; // Exibe o botão "Jogar Novamente"
  if (win) {
    finalScore.textContent = `Parabéns! Você completou todas as ${totalChallenges} atividades com ${score} pontos!`;
  } else {
    finalScore.textContent = `Fim do jogo! Você fez ${score} pontos.`;
  }
}

// Adiciona o evento de clique ao botão "Enviar"
submitBtn.addEventListener("click", checkAnswer);

// Adiciona o evento de tecla "Enter" no campo de entrada
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Adiciona o evento de clique ao botão "Jogar Novamente"
restartBtn.addEventListener("click", startGame);

// Iniciar o jogo
startGame();
