document.addEventListener('DOMContentLoaded', () => {
  // --- 要素の取得 ---
  const genreFilter = document.getElementById('genreFilter');
  const questionCard = document.getElementById('questionCard');
  const genreLabel = document.getElementById('genreLabel');
  const questionText = document.getElementById('questionText');
  const nextBtn = document.getElementById('nextBtn');
  const copyBtn = document.getElementById('copyBtn');
  const toast = document.getElementById('toast');

  // --- 状態管理 ---
  let filteredQuestions = [...questionsData]; // json.jsから読み込んだデータを初期化
  let currentQuestion = null;
  let previousQuestionId = null;

  // --- フィルター変更時の処理 ---
  genreFilter.addEventListener('change', (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === 'all') {
      filteredQuestions = [...questionsData];
    } else {
      filteredQuestions = questionsData.filter(q => q.genre === selectedGenre);
    }
    // フィルターを変えたら表示をリセット
    genreLabel.textContent = 'READY';
    questionText.textContent = '下のボタンを押して質問を生成してください';
    copyBtn.disabled = true;
    currentQuestion = null;
    previousQuestionId = null;
  });

  // --- 質問をランダムに取得して表示する関数 ---
  const showNextQuestion = () => {
    if (filteredQuestions.length === 0) {
      questionText.textContent = 'このジャンルの質問がありません。';
      return;
    }

    let randomIndex;
    let selected;

    // データが2件以上ある場合は、直前と同じ質問が出ないようにループで制御
    if (filteredQuestions.length > 1) {
      do {
        randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        selected = filteredQuestions[randomIndex];
      } while (selected.id === previousQuestionId);
    } else {
      selected = filteredQuestions[0];
    }

    currentQuestion = selected;
    previousQuestionId = currentQuestion.id;

    // アニメーションのリセットと適用
    questionCard.classList.remove('fade-in');
    // リペイントを強制してアニメーションを再トリガーする
    void questionCard.offsetWidth;
    questionCard.classList.add('fade-in');

    // 画面の更新
    genreLabel.textContent = currentQuestion.genre;
    questionText.textContent = currentQuestion.question;
    copyBtn.disabled = false;
  };

  // --- 次の質問ボタンの処理 ---
  nextBtn.addEventListener('click', showNextQuestion);

  // --- コピー機能 ---
  copyBtn.addEventListener('click', async () => {
    if (!currentQuestion) return;

    try {
      // クリップボードにテキストをコピー
      await navigator.clipboard.writeText(currentQuestion.question);
      
      // トースト通知を表示
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000); // 2秒後に消える
    } catch (err) {
      console.error('コピーに失敗しました', err);
      alert('コピーに失敗しました。お使いのブラウザが対応していない可能性があります。');
    }
  });
});