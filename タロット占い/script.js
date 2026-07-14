let tarotData = [];

// JSONデータの読み込み
fetch('tarot_data.json')
    .then(response => response.json())
    .then(data => {
        tarotData = data;
    })
    .catch(error => console.error('データの読み込みに失敗しました:', error));

document.getElementById('draw-btn').addEventListener('click', () => {
    if (tarotData.length === 0) {
        alert("占いデータを読み込んでいます。少々お待ちください。");
        return;
    }

    const mode = parseInt(document.getElementById('mode-select').value);
    drawCards(mode);
});

function drawCards(count) {
    const cardContainer = document.getElementById('card-container');
    const resultContainer = document.getElementById('result-container');
    
    cardContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    // 大アルカナ（0〜21）からランダムに重複なく引く
    let deck = Array.from({length: 22}, (_, i) => i);
    let drawnCards = [];
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const cardId = deck[randomIndex];
        deck.splice(randomIndex, 1);
        
        // 50%の確率で逆位置（true）にする
        const isReversed = Math.random() < 0.5;
        
        drawnCards.push({ id: cardId, isReversed: isReversed });
    }

    const positions = count === 3 ? ["【過去】", "【現在】", "【未来】"] : ["【本日の運勢】"];

    drawnCards.forEach((drawn, index) => {
        const cardInfo = tarotData.find(card => card.id === drawn.id);
        
        // 正位置か逆位置かで、参照するデータを切り替える
        const orientationText = drawn.isReversed ? "逆位置" : "正位置";
        const readingData = drawn.isReversed ? cardInfo.reversed : cardInfo.upright;
        
        // --- 画像エリアの生成 ---
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        
        // 逆位置の場合は 'reversed' クラスを付与
        const imgClass = drawn.isReversed ? 'reversed' : '';
        
        slot.innerHTML = `
            <img src="images/card_${drawn.id}.jpg" alt="${cardInfo.name}" class="${imgClass}">
            <div class="card-label">${positions[index]}<br>(${orientationText})</div>
        `;
        cardContainer.appendChild(slot);

        // --- 結果テキストエリアの生成 ---
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        let meaningText = count === 1 ? readingData.one_oracle : readingData.spread[index];
        
        resultItem.innerHTML = `
            <h3>${positions[index]} ${cardInfo.name} （${orientationText}）</h3>
            <p><strong>キーワード：</strong> ${readingData.keywords}</p>
            <p>${meaningText}</p>
        `;
        resultContainer.appendChild(resultItem);
    });
}