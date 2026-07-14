// ↓↓↓ ここにGASで発行したウェブアプリのURLを貼り付けます ↓↓↓
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzELDaUON61rjEmtTdpMr02nY5fupgM_bFhf53t_GuuHDGdduWFvO1h2OQ-hsArj7CD/exec';
let allData = [];

// 配列をランダムにシャッフルする関数（Fisher-Yatesアルゴリズム）
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
  const container = document.getElementById('cardContainer');
  try {
    const response = await fetch(GAS_API_URL);
    const rawData = await response.json();
    
    if (rawData.length === 0) {
      container.innerHTML = '<p>データが登録されていません。</p>';
      return;
    }

    // ★ 取得したデータを初期状態でシャッフルする
    allData = shuffleArray(rawData);
    
    renderCards(allData);
  } catch (error) {
    console.error('エラー:', error);
    container.innerHTML = '<p>データの取得に失敗しました。</p>';
  }
}

function renderCards(data) {
  const container = document.getElementById('cardContainer');
  container.innerHTML = ''; 

  if (data.length === 0) {
    container.innerHTML = '<p>条件に一致するネタが見つかりませんでした。</p>';
    return;
  }

  data.forEach((item, index) => {
    if (!item.title) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${index * 0.05}s`;

    const summaryHtml = item.summary ? `<div class="summary-text">${item.summary}</div>` : '';

    let actionHtml = '';
    if (item.url && item.url.trim() !== '') {
      actionHtml = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">資料を見る</a>`;
    } else {
      actionHtml = `<span class="no-url">資料はありません</span>`;
    }

    card.innerHTML = `
      <h2>${item.title}</h2>
      <div class="tags">
        <span class="tag">${item.category}</span>
        <span class="tag">${item.size}</span>
        <span class="tag">${item.time}</span>
        <span class="tag">${item.online}</span>
      </div>
      <p>対象: ${item.target}</p>
      ${summaryHtml}
      ${actionHtml}
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const keywordVal = document.getElementById('keywordFilter').value.toLowerCase();
  const sortVal = document.getElementById('sortFilter').value;
  const categoryVal = document.getElementById('categoryFilter').value;
  const sizeVal = document.getElementById('sizeFilter').value;
  const timeVal = document.getElementById('timeFilter').value;

  // 1. 絞り込み処理
  let filteredData = allData.filter(item => {
    const matchCategory = categoryVal === "" || item.category === categoryVal;
    const matchSize = sizeVal === "" || item.size === sizeVal;
    const matchTime = timeVal === "" || item.time === timeVal;
    
    const safeTitle = item.title ? item.title.toLowerCase() : "";
    const safeSummary = item.summary ? item.summary.toLowerCase() : "";
    const matchKeyword = keywordVal === "" || 
                         safeTitle.includes(keywordVal) || 
                         safeSummary.includes(keywordVal);

    return matchCategory && matchSize && matchTime && matchKeyword;
  });

  // 2. ソート処理
  if (sortVal === 'asc') {
    // タイトル昇順 (A-Z, あ-ん)
    filteredData.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), 'ja'));
  } else if (sortVal === 'desc') {
    // タイトル降順 (Z-A, ん-あ)
    filteredData.sort((a, b) => String(b.title || "").localeCompare(String(a.title || ""), 'ja'));
  }
  // 'random' の場合は、初期シャッフルされた配列の順序をそのまま維持する

  renderCards(filteredData);
}

document.querySelectorAll('.filters select').forEach(select => {
  select.addEventListener('change', applyFilters);
});

document.getElementById('keywordFilter').addEventListener('input', applyFilters);

document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('keywordFilter').value = "";
  
  document.querySelectorAll('.filters select').forEach(select => {
    // ソートはデフォルト値に戻す
    if (select.id === 'sortFilter') {
      select.value = "random";
    } else {
      select.value = "";
    }
  });

  // ★ リセット時に配列を再シャッフルし、新たなランダム順で表示する
  allData = shuffleArray(allData);
  renderCards(allData);
});