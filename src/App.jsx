import { useState } from 'react';

const questions = [
  {
    question: 'Quem construiu a arca?',
    options: ['Moisés', 'Abraão', 'Noé', 'Davi'],
    answer: 2,
    explanation: 'Foi Noé quem construiu a arca por ordem de Deus para sobreviver ao dilúvio.',
  },
  {
    question: 'Qual o primeiro livro da Bíblia?',
    options: ['Êxodo', 'Gênesis', 'Levítico', 'Salmos'],
    answer: 1,
    explanation: 'Gênesis é o primeiro livro da Bíblia, que narra a criação do mundo.',
  },
  {
    question: 'Quem foi lançado na cova dos leões?',
    options: ['Daniel', 'José', 'Elias', 'Pedro'],
    answer: 0,
    explanation: 'Daniel foi lançado na cova dos leões por manter sua fé em Deus.',
  },
  {
    question: 'Quantos livros tem o Novo Testamento?',
    options: ['27', '39', '66', '12'],
    answer: 0,
    explanation: 'O Novo Testamento possui 27 livros.',
  },
  {
    question: 'Quem traiu Jesus?',
    options: ['Pedro', 'Judas', 'João', 'Tomé'],
    answer: 1,
    explanation: 'Judas Iscariotes traiu Jesus por 30 moedas de prata.',
  },
  {
    question: 'Qual foi o primeiro milagre de Jesus?',
    options: ['Curar um cego', 'Multiplicar pães', 'Andar sobre as águas', 'Transformar água em vinho'],
    answer: 3,
    explanation: 'O primeiro milagre foi transformar água em vinho nas bodas de Caná.',
  },
  {
    question: 'Quem foi o pai de Davi?',
    options: ['Jessé', 'Saul', 'Salomão', 'Jacó'],
    answer: 0,
    explanation: 'Jessé era o pai de Davi.',
  },
  {
    question: 'Qual apóstolo negou Jesus três vezes?',
    options: ['João', 'Pedro', 'Tiago', 'André'],
    answer: 1,
    explanation: 'Pedro negou Jesus três vezes antes do galo cantar.',
  },
  {
    question: 'Quem escreveu a maioria das cartas do Novo Testamento?',
    options: ['Pedro', 'Paulo', 'João', 'Tiago'],
    answer: 1,
    explanation: 'O apóstolo Paulo escreveu a maioria das cartas.',
  },
  {
    question: 'Onde Jesus nasceu?',
    options: ['Jerusalém', 'Belém', 'Nazaré', 'Galileia'],
    answer: 1,
    explanation: 'Jesus nasceu em Belém, conforme as profecias.',
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];
  const finished = currentQuestion >= questions.length;

  function confirmAnswer() {
    if (selectedOption === null) return;
    setAnswered(true);
    if (selectedOption === question.answer) setScore((currentScore) => currentScore + 1);
  }

  function nextQuestion() {
    setCurrentQuestion((current) => current + 1);
    setSelectedOption(null);
    setAnswered(false);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
  }

  if (finished) {
    return (
      <main className="container">
        <header className="brand"><span className="brand-mark">+</span><span>Quiz Bíblico</span></header>
        <section className="quiz-box results">
          <div className="results-icon">★</div>
          <p className="eyebrow">Quiz concluído</p>
          <h1>Fim do Quiz!</h1>
          <p>Você respondeu {questions.length} perguntas e acertou <strong>{score}</strong>.</p>
          <p className="results-message">Continue estudando a Palavra de Deus!</p>
          <button className="primary-button" onClick={restartQuiz}>Refazer quiz</button>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="brand"><span className="brand-mark">+</span><span>Quiz Bíblico</span></header>
      <section className="quiz-box">
        <div className="progress-row">
          <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span>{score} acertos</span>
        </div>
        <div className="progress-track"><span style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} /></div>
        <h1>{question.question}</h1>
        <div className="options" role="radiogroup" aria-label="Alternativas">
          {question.options.map((option, index) => {
            const isCorrect = answered && index === question.answer;
            const isIncorrect = answered && index === selectedOption && index !== question.answer;
            return (
              <button
                className={`option ${selectedOption === index ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                key={option}
                onClick={() => !answered && setSelectedOption(index)}
                aria-pressed={selectedOption === index}
                disabled={answered}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
                {isCorrect && <span className="status">✓</span>}
                {isIncorrect && <span className="status">×</span>}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`feedback ${selectedOption === question.answer ? 'success' : 'error'}`}>
            <strong>{selectedOption === question.answer ? 'Você acertou!' : 'Você errou.'}</strong> {question.explanation}
          </div>
        )}
        {!answered ? (
          <button className="primary-button" onClick={confirmAnswer} disabled={selectedOption === null}>Confirmar resposta</button>
        ) : (
          <button className="primary-button" onClick={nextQuestion}>Próxima pergunta</button>
        )}
      </section>
    </main>
  );
}

export default App;
