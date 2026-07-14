// カラムの定義（filterTypeが 'select' ならドロップダウン、'text' なら文字検索になります）
const COLUMNS = [
    { id: 'カテゴリーID', name: 'カテゴリーID', filterType: 'select' },
    { id: '大分類（産業）', name: '大分類', filterType: 'select' },
    { id: '中分類（産業）', name: '中分類', filterType: 'select' },
    { id: '小分類（産業）', name: '小分類', filterType: 'select' },
    { id: '細分類（産業）', name: '細分類', filterType: 'text' },
    { id: '業態名', name: '業態名', filterType: 'text' },
    { id: '概要・説明', name: '概要・説明', filterType: 'text' },
    { id: '対象ユーザー', name: '対象ユーザー', filterType: 'text' },
    { id: '提供形態', name: '提供形態', filterType: 'select' },
    { id: 'B2B/B2C', name: 'B2B/B2C', filterType: 'select' },
    { id: '備考・特記', name: '備考', filterType: 'text' }
];

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    initTableHeaders();
    render(DATABASE);

    // 全体検索のイベントリスナー
    document.getElementById('globalSearch').addEventListener('input', applyFilters);
});

// テーブルヘッダーと各カラムのフィルターを生成
function initTableHeaders() {
    const thead = document.getElementById('tableHead');
    const tr = document.createElement('tr');

    COLUMNS.forEach(col => {
        const th = document.createElement('th');
        th.innerHTML = `<div>${col.name}</div>`;

        if (col.filterType === 'select') {
            // ドロップダウンリストの生成
            const select = document.createElement('select');
            select.className = 'col-filter';
            select.dataset.key = col.id;
            select.innerHTML = '<option value="">全て</option>';

            // データベースから重複のない選択肢を抽出
            const uniqueVals = [...new Set(DATABASE.map(item => item[col.id]))].filter(Boolean);
            uniqueVals.forEach(val => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.textContent = val;
                select.appendChild(opt);
            });
            select.addEventListener('change', applyFilters);
            th.appendChild(select);
        } else {
            // テキスト検索ボックスの生成
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'col-filter';
            input.dataset.key = col.id;
            input.placeholder = '絞り込み...';
            input.addEventListener('input', applyFilters);
            th.appendChild(input);
        }
        tr.appendChild(th);
    });
    thead.appendChild(tr);
}

// フィルター適用ロジック
function applyFilters() {
    const globalKeyword = document.getElementById('globalSearch').value.toLowerCase();
    const filterElements = document.querySelectorAll('.col-filter');

    // 現在入力されている各カラムのフィルター条件を取得
    const activeFilters = Array.from(filterElements).map(el => ({
        key: el.dataset.key,
        value: el.value.toLowerCase(),
        type: el.tagName.toLowerCase() // 'input' か 'select'
    })).filter(f => f.value !== ''); // 空ではない条件だけ残す

    const filtered = DATABASE.filter(item => {
        // 1. 全体キーワード検索のチェック
        if (globalKeyword) {
            const textToSearch = Object.values(item).join(' ').toLowerCase();
            if (!textToSearch.includes(globalKeyword)) return false;
        }

        // 2. 各カラムのフィルターチェック（AND検索）
        for (const filter of activeFilters) {
            const itemVal = (item[filter.key] || '').toString().toLowerCase();
            if (filter.type === 'select') {
                // セレクトボックスは完全一致
                if (itemVal !== filter.value) return false;
            } else {
                // テキストボックスは部分一致
                if (!itemVal.includes(filter.value)) return false;
            }
        }
        return true; // 全ての条件をクリアしたデータを表示
    });

    render(filtered);
}

// 全体の描画
function render(data) {
    document.getElementById('totalCount').textContent = data.length;
    renderTable(data);
    renderAnalytics(data);
}

// テーブルの描画
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${COLUMNS.length}" style="text-align:center;">該当するデータがありません</td></tr>`;
        return;
    }

    data.forEach(item => {
        const tr = document.createElement('tr');
        
        COLUMNS.forEach(col => {
            const td = document.createElement('td');

            td.setAttribute('data-label', col.name);

            let val = item[col.id] || '';

            // B2B/B2Cカラムだけバッジ装飾する
            if (col.id === 'B2B/B2C' && val) {
                let badgeClass = 'badge';
                if(val.includes('B2B')) badgeClass += ' b2b';
                else if(val.includes('B2C')) badgeClass += ' b2c';
                else if(val.includes('B2G')) badgeClass += ' b2g';
                td.innerHTML = `<span class="${badgeClass}">${val}</span>`;
            } else if (col.id === '業態名') {
                td.innerHTML = `<strong>${val}</strong>`;
            } else {
                td.textContent = val;
            }
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
}

// 分析パネルの描画
function renderAnalytics(data) {
    if (data.length === 0) {
        document.getElementById('b2bChart').innerHTML = '';
        document.getElementById('typeChart').innerHTML = '';
        document.getElementById('categoryChart').innerHTML = '';
        return;
    }

    drawBarChart(data, 'B2B/B2C', 'b2bChart', 5);
    drawBarChart(data, '提供形態', 'typeChart', 5);
    drawBarChart(data, '中分類（産業）', 'categoryChart', 5);
}

function drawBarChart(data, key, containerId, limit) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // 集計
    const counts = {};
    data.forEach(item => {
        const val = item[key] || '不明';
        counts[val] = (counts[val] || 0) + 1;
    });

    // ソート
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
    const maxCount = Math.max(...sorted.map(s => s[1]));

    // 描画
    sorted.forEach(([label, count]) => {
        const percentage = (count / maxCount) * 100;
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <div class="bar-label" title="${label}">${label}</div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="bar-count">${count}</div>
        `;
        container.appendChild(row);
    });
}