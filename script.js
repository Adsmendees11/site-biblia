const questions = [
  {
    question: "Quem construiu a arca?",
    options: ["Moisés", "Abraão", "Noé", "Davi"],
    answer: 2,
    explanation: "Foi Noé quem construiu a arca por ordem de Deus para sobreviver ao dilúvio."
  },
  {
    question: "Qual o primeiro livro da Bíblia?",
    options: ["Êxodo", "Gênesis", "Levítico", "Salmos"],
    answer: 1,
    explanation: "Gênesis é o primeiro livro da Bíblia, que narra a criação do mundo."
  },
  {
    question: "Quem foi lançado na cova dos leões?",
    options: ["Daniel", "José", "Elias", "Pedro"],
    answer: 0,
    explanation: "Daniel foi lançado na cova dos leões por manter sua fé em Deus."
  },
  {
    question: "Quantos livros tem o Novo Testamento?",
    options: ["27", "39", "66", "12"],
    answer: 0,
    explanation: "O Novo Testamento possui 27 livros."
  },
  {
    question: "Quem traiu Jesus?",
    options: ["Pedro", "Judas", "João", "Tomé"],
    answer: 1,
    explanation: "Judas Iscariotes traiu Jesus por 30 moedas de prata."
  },
  {
    question: "Qual foi o primeiro milagre de Jesus?",
    options: ["Curar um cego", "Multiplicar pães", "Andar sobre as águas", "Transformar água em vinho"],
    answer: 3,
    explanation: "O primeiro milagre foi transformar água em vinho nas bodas de Caná."
  },
  {
    question: "Quem foi o pai de Davi?",
    options: ["Jessé", "Saul", "Salomão", "Jacó"],
    answer: 0,
    explanation: "Jessé era o pai de Davi."
  },
  {
    question: "Qual apóstolo negou Jesus três vezes?",
    options: ["João", "Pedro", "Tiago", "André"],
    answer: 1,
    explanation: "Pedro negou Jesus três vezes antes do galo cantar."
  },
  {
    question: "Quem escreveu a maioria das cartas do Novo Testamento?",
    options: ["Pedro", "Paulo", "João", "Tiago"],
    answer: 1,
    explanation: "O apóstolo Paulo escreveu a maioria das cartas."
  },
  {
    question: "Onde Jesus nasceu?",
    options: ["Jerusalém", "Belém", "Nazaré", "Galileia"],
    answer: 1,
    explanation: "Jesus nasceu em Belém, conforme as profecias."
  }
];

let currentQuestion = 0;
let selectedOption = null;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = `Pergunta ${currentQuestion + 1}: ${q.question}`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => selectOption(index);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("confirm").style.display = "block";
  document.getElementById("next").style.display = "none";
  selectedOption = null;
}

function selectOption(index) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  allOptions[index].classList.add("selected");
  selectedOption = index;
}

document.getElementById("confirm").addEventListener("click", () => {
  if (selectedOption === null) {
    alert("Selecione uma alternativa!");
    return;
  }

  const q = questions[currentQuestion];
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach((opt, index) => {
    opt.classList.remove("selected");
    if (index === q.answer) {
      opt.classList.add("correct");
    } else if (index === selectedOption) {
      opt.classList.add("incorrect");
    }
  });

  const feedback = document.getElementById("feedback");
  if (selectedOption === q.answer) {
    feedback.textContent = "✅ Você acertou! " + q.explanation;
    score++;
  } else {
    feedback.textContent = "❌ Você errou. " + q.explanation;
  }

  document.getElementById("confirm").style.display = "none";
  document.getElementById("next").style.display = "block";
});

document.getElementById("next").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-box").innerHTML = `
    <h2>🎉 Fim do Quiz!</h2>
    <p>Você respondeu ${questions.length} perguntas.</p>
    <p>Acertou ${score} de ${questions.length}.</p>
    <p>👏 Parabéns pelo seu desempenho! Continue estudando a Palavra de Deus!</p>
  `;
}

loadQuestion();