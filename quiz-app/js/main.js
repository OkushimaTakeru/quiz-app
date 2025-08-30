const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'option-btn';
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    alert('正解！');
    score++;
  } else {
    alert(`不正解… 正解は "${quizData[currentQuestion].options[correct]}" です`);
  }
  nextBtn.style.display = 'inline-block';
  disableOptions();
}

function disableOptions() {
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.style.display = 'none';
  } else {
    quizOver();
  }
};

function quizOver() {
  questionEl.textContent = 'クイズ終了！';
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = `あなたのスコアは ${score} / ${quizData.length} です`;
}

// 初期表示
loadQuestion();
nextBtn.style.display = 'none';
