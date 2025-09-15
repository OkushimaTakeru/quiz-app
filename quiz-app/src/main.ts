// // [question:問題文][options:選択肢][nextBtn:次の問題][score:スコア表示(何問正解したか表示)]
// const els = document.querySelectorAll("#question, #options, #nextBtn, #score");

// // 選択肢のボタン
// const OPTION_CLASS = "option-btn";

// let currentQuestion = 0;
// let score = 0;

// // 共通関数
// // quizData : データ取得(クイズの問題文、選択肢、答え)
// const getCurrentQuestion = () => quizData[currentQuestion];

// // 選択肢表示のリセット
// const clearOptions = () => (els[1].innerHTML = "");

// // 次の問題ボタンの表示・非表示
// const showNextBtn = () => (els[2].style.display = "inline-block");

// // 初期状態では「次の問題」ボタンを非表示にする
// const hideNextBtn = () => (els[2].style.display = "none");

// // 問題を画面に表示して選択肢をボタンで作る
// const loadQuestion = () => {
//   const questionOptions = getCurrentQuestion();
//   // console.log(questionOptions) // 問題の選択肢を取り出す
//   els[0].textContent = questionOptions.question;
//   clearOptions();

//   // 選択肢ボタンを作成して表示
//   questionOptions.options.forEach((option, index) => {
//     const btn = document.createElement("button");
//     btn.textContent = option;
//     btn.className = OPTION_CLASS;
//     btn.onclick = () => checkAnswer(index);
//     els[1].appendChild(btn);
//   });
// };

// const checkAnswer = (selected) => {
//   // 現在の問題データを取得
//   const nowQuestion = getCurrentQuestion();
//   if (selected === nowQuestion.answer) {
//     alert("正解！");
//     score++;
//   } else {
//     alert(`不正解… 正解は "${nowQuestion.options[nowQuestion.answer]}" です`);
//   }

//   // 「次の問題」ボタンを表示
//   showNextBtn();

//   //選択肢ボタンを無効化(すでに答えを選んだ後は 他のボタンを押せないようにする)
//   // disableOptions();

//   // disableOptions = () => {
//   //   document
//   //     .querySelectorAll(`.${OPTION_CLASS}`)
//   //     .forEach((btn) => (btn.disabled = true));
//   // };
//   document
//     .querySelectorAll(`.${OPTION_CLASS}`)
//     .forEach((btn) => (btn.disabled = true));
// };

// els[2].onclick = () => {
//   currentQuestion++;
//   if (currentQuestion < quizData.length) {
//     loadQuestion();
//     hideNextBtn();
//   } else {
//     quizOver();
//   }
// };

// const quizOver = () => {
//   els[0].textContent = "クイズ終了！";
//   clearOptions();
//   hideNextBtn();
//   els[3].textContent = `あなたのスコアは ${score} / ${quizData.length} です`;
// };

// // 初期表示
// loadQuestion();
// hideNextBtn();

// import { quizData, QuizItem } from './data';
import { quizData, QuizItem } from './data.js';


let currentQuestion = 0;
let score = 0;

// ---------------------------
// UI操作クラス
// ---------------------------
class QuizUI {
  private questionEl: HTMLElement;
  private optionsEl: HTMLElement;
  private nextBtn: HTMLElement;
  private scoreEl: HTMLElement;

  constructor() {
    this.questionEl = document.getElementById("question")!;
    this.optionsEl = document.getElementById("options")!;
    this.nextBtn = document.getElementById("nextBtn")!;
    this.scoreEl = document.getElementById("score")!;


    this.nextBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        this.showEndMessage("クイズ終了！");
        this.clearOptions();
        this.hideNextBtn();
        this.showScore(score, quizData.length);
      }
    });
  }

  showQuestion(question: string): void {
    this.questionEl.textContent = question;
  }

  showOptions(options: string[], onClickHandler: (index: number) => void): void {
    this.clearOptions();
    options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      btn.onclick = () => onClickHandler(index);
      this.optionsEl.appendChild(btn);
    });
  }

  clearOptions(): void {
    this.optionsEl.innerHTML = "";
  }

  disableOptions(): void {
    this.optionsEl
      .querySelectorAll<HTMLButtonElement>(".option-btn")
      .forEach((btn) => btn.disabled = true);
  }

  showNextBtn(): void {
    this.nextBtn.style.display = "inline-block";
  }

  hideNextBtn(): void {
    this.nextBtn.style.display = "none";
  }

  showScore(score: number, total: number): void {
    this.scoreEl.textContent = `あなたのスコアは ${score} / ${total} です`;
  }

  showEndMessage(msg: string): void {
    this.questionEl.textContent = msg;
  }
}

// ---------------------------
// クイズロジック
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const ui = new QuizUI();

  const getCurrentQuestion = (): QuizItem => quizData[currentQuestion];

  const loadQuestion = (): void => {
    const q = getCurrentQuestion();
    ui.showQuestion(q.question);
    ui.showOptions(q.options, checkAnswer);
    ui.hideNextBtn();
  };

  const checkAnswer = (selected: number): void => {
    const q = getCurrentQuestion();
    if (selected === q.answer) {
      alert("正解！");
      score++;
    } else {
      alert(`不正解… 正解は "${q.options[q.answer]}" です`);
    }

    ui.disableOptions();
    ui.showNextBtn();
  };

  // 初期表示
  loadQuestion();
});
function loadQuestion() {
  throw new Error('Function not implemented.');
}

