document.addEventListener('DOMContentLoaded', () => {
  const csvFileInput = document.getElementById('csvFileInput');
  const fieldsContainer = document.getElementById('fields-container');
  const generateBtn = document.getElementById('generate-btn');
  const outputCode = document.getElementById('output-code');
  
  // 設定入力要素
  const siteTitleInput = document.getElementById('site-title');
  const colorPrimary = document.getElementById('color-primary');
  const colorBg = document.getElementById('color-bg');
  const colorText = document.getElementById('color-text');

  // プレビュー用要素
  const previewWindow = document.getElementById('preview-window');
  const previewTitle = document.getElementById('preview-title');

  let parsedFields = [];
  let parsedDatabase = [];

  // --- プレビューのリアルタイム更新 ---
  function updatePreview() {
    previewTitle.textContent = siteTitleInput.value || 'マイデータベース';
    previewWindow.style.setProperty('--prev-primary', colorPrimary.value);
    previewWindow.style.setProperty('--prev-bg', colorBg.value);
    previewWindow.style.setProperty('--prev-text', colorText.value);
  }

  // 入力値が変わるたびにプレビューを更新
  siteTitleInput.addEventListener('input', updatePreview);
  colorPrimary.addEventListener('input', updatePreview);
  colorBg.addEventListener('input', updatePreview);
  colorText.addEventListener('input', updatePreview);

  // --- CSV読み込み処理 ---
  csvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      parseCSVToArray(event.target.result);
    };
    reader.readAsText(file);
  });

  function parseCSVToArray(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return;

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    parsedFields = headers;

    const dataList = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const rowData = {};
      headers.forEach((header, index) => rowData[header] = values[index] || '');
      dataList.push(rowData);
    }
    parsedDatabase = dataList;

    fieldsContainer.innerHTML = '';
    parsedFields.forEach(field => {
      const badge = document.createElement('span');
      badge.className = 'field-badge';
      badge.textContent = field;
      fieldsContainer.appendChild(badge);
    });

    generateBtn.disabled = false;
    generateBtn.innerText = 'コードを生成する';
  }

  // --- コード生成処理 ---
  generateBtn.addEventListener('click', () => {
    if (parsedFields.length === 0 || parsedDatabase.length === 0) return;

    const title = siteTitleInput.value || 'My Database';
    const colors = {
      primary: colorPrimary.value,
      bg: colorBg.value,
      text: colorText.value
    };

    const generatedCode = buildTemplate(title, colors, parsedFields, parsedDatabase);
    outputCode.value = generatedCode;
  });

  // --- テンプレート生成 ---
  function buildTemplate(title, colors, fields, database) {
    const thElements = fields.map(f => `<th class="sortable" data-field="${f}">${f} <span class="sort-icon">↕️</span></th>`).join('\n            ');
    const filterElements = fields.map(f => `<th><select class="column-filter" data-field="${f}"><option value="">全て</option></select></th>`).join('\n            ');

    const jsonDatabase = JSON.stringify(database, null, 2);
    const jsonFields = JSON.stringify(fields);

    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    /* ジェネレーターで設定したカラー変数 */
    :root {
      --custom-primary: ${colors.primary};
      --custom-bg: ${colors.bg};
      --custom-text: ${colors.text};
    }

    body { font-family: "Helvetica Neue", Arial, sans-serif; padding: 20px; background: var(--custom-bg); color: var(--custom-text); margin: 0; }
    .container { max-width: 1200px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333; }
    h1 { text-align: center; margin-bottom: 20px; }
    
    .toolbar { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px; }
    input[type="text"] { padding: 10px 15px; width: 300px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
    
    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; min-width: 800px; }
    th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
    
    th { background-color: var(--custom-primary); color: white; }
    th.sortable { cursor: pointer; user-select: none; opacity: 0.95; }
    th.sortable:hover { opacity: 1; filter: brightness(1.1); }
    .sort-icon { font-size: 0.8em; margin-left: 5px; opacity: 0.7; }
    
    .filter-row th { background-color: #ecf0f1; padding: 8px; border-bottom: 2px solid #bdc3c7; color: #333; }
    select.column-filter { width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; }
    
    .no-data { text-align: center; padding: 40px; color: #7f8c8d; font-size: 16px; }
    tr:hover td { background-color: #f9fbfd; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    
    <div class="toolbar">
      <input type="text" id="searchInput" placeholder="全体のキーワードで検索...">
    </div>

    <div class="table-wrapper">
      <table id="dataTable">
        <thead>
          <tr>
            ${thElements}
          </tr>
          <tr class="filter-row">
            ${filterElements}
          </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
      </table>
    </div>
  </div>

  <script>
    const database = ${jsonDatabase};
    const fields = ${jsonFields};
    let currentSort = { field: null, asc: true };

    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const columnFilters = document.querySelectorAll('.column-filter');
    const sortHeaders = document.querySelectorAll('.sortable');

    function initFilters() {
      columnFilters.forEach(select => {
        const field = select.dataset.field;
        const uniqueValues = [...new Set(database.map(item => item[field]))].filter(v => v).sort();
        uniqueValues.forEach(val => {
          const option = document.createElement('option');
          option.value = val; option.textContent = val; select.appendChild(option);
        });
      });
    }

    function applyFiltersAndSort() {
      const keyword = searchInput.value.toLowerCase();
      let filteredData = database.filter(row => fields.some(f => String(row[f] || '').toLowerCase().includes(keyword)));

      columnFilters.forEach(select => {
        if (select.value) filteredData = filteredData.filter(row => String(row[select.dataset.field]) === select.value);
      });

      if (currentSort.field) {
        filteredData.sort((a, b) => {
          const valA = String(a[currentSort.field] || ''); const valB = String(b[currentSort.field] || '');
          if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '') {
            return currentSort.asc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
          }
          if (valA < valB) return currentSort.asc ? -1 : 1;
          if (valA > valB) return currentSort.asc ? 1 : -1;
          return 0;
        });
      }
      renderTable(filteredData);
    }

    function renderTable(data) {
      tableBody.innerHTML = '';
      if (data.length === 0) { tableBody.innerHTML = '<tr><td colspan="' + fields.length + '" class="no-data">データが見つかりません</td></tr>'; return; }
      data.forEach(row => {
        const tr = document.createElement('tr');
        fields.forEach(f => { const td = document.createElement('td'); td.textContent = row[f] || ''; tr.appendChild(td); });
        tableBody.appendChild(tr);
      });
    }

    searchInput.addEventListener('input', applyFiltersAndSort);
    columnFilters.forEach(s => s.addEventListener('change', applyFiltersAndSort));
    sortHeaders.forEach(th => {
      th.addEventListener('click', () => {
        const f = th.dataset.field;
        currentSort.asc = currentSort.field === f ? !currentSort.asc : true;
        currentSort.field = f;
        sortHeaders.forEach(h => h.querySelector('.sort-icon').textContent = '↕️');
        th.querySelector('.sort-icon').textContent = currentSort.asc ? '🔽' : '🔼';
        applyFiltersAndSort();
      });
    });

    initFilters(); applyFiltersAndSort();
  <\/script>
</body>
</html>`;
  }
});