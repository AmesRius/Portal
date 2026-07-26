
/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
const STORAGE_KEY = 'plancraft_docs_v1';
let currentDocId = null;
let currentDoc   = null;
let activeFilter = 'all';

/* ═══════════════════════════════════════════
   STORAGE HELPERS
═══════════════════════════════════════════ */
function loadDocs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveDocs(docs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}
function saveCurrentDoc() {
  if (!currentDoc) return;
  const docs = loadDocs();
  const idx  = docs.findIndex(d => d.id === currentDoc.id);
  if (idx >= 0) docs[idx] = currentDoc;
  else docs.push(currentDoc);
  saveDocs(docs);
}
function deleteDoc(id) {
  const docs = loadDocs().filter(d => d.id !== id);
  saveDocs(docs);
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ═══════════════════════════════════════════
   VIEW ROUTER
═══════════════════════════════════════════ */
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  window.scrollTo(0, 0);

  if (name === 'templates') renderTemplateGrid();
  if (name === 'mydocs')    renderMyDocs();
  if (name === 'landing')   renderLandingTemplates();
}
function goHome() { showView('landing'); }

/* ═══════════════════════════════════════════
   LANDING
═══════════════════════════════════════════ */
function renderLandingTemplates() {
  const grid = document.getElementById('landing-tmpl-grid');
  const show = window.PLANCRAFT_TEMPLATES.slice(0, 8);
  grid.innerHTML = show.map(t => `
    <div class="tmpl-card" onclick="startFromTemplate('${t.id}')">
      <div class="tmpl-card-icon">${t.icon}</div>
      <div class="tmpl-card-cat">${t.categoryLabel}</div>
      <div class="tmpl-card-name">${t.name}</div>
      <div class="tmpl-card-desc">${t.description}</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════
   TEMPLATE BROWSER
═══════════════════════════════════════════ */
const CATEGORIES = [
  { id: 'all',       label: '✦ すべて' },
  { id: 'business',  label: '🏢 ビジネス' },
  { id: 'service',   label: '🌐 サービス' },
  { id: 'marketing', label: '📣 マーケティング' },
  { id: 'hr',        label: '👥 採用・HR' },
  { id: 'store',     label: '🍽️ 店舗' },
  { id: 'internal',  label: '💡 社内提案' },
  { id: 'student',   label: '🎒 学生・学校' },
  { id: 'event',     label: '🎪 イベント・企画' },
  { id: 'product',   label: '🛍️ 商品・クリエイティブ' },
  { id: 'community', label: '🌍 地域・社会・NPO' },
  { id: 'freelance', label: '💻 フリーランス・副業' },
];

function renderTemplateGrid() {
  // Category filter buttons
  const cf = document.getElementById('cat-filters');
  cf.innerHTML = CATEGORIES.map(c => `
    <button class="cat-btn ${activeFilter === c.id ? 'active' : ''}"
            onclick="setFilter('${c.id}')">${c.label}</button>
  `).join('');

  // Grid
  const q   = (document.getElementById('tmpl-search-input')?.value || '').toLowerCase();
  const all = window.PLANCRAFT_TEMPLATES;
  const filtered = all.filter(t => {
    const matchCat  = activeFilter === 'all' || t.category === activeFilter;
    const matchText = !q || t.name.includes(q) || t.description.includes(q) || t.categoryLabel.includes(q);
    return matchCat && matchText;
  });

  const grid = document.getElementById('tmpl-grid-main');
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text3)">
      テンプレートが見つかりませんでした</div>`;
    return;
  }
  grid.innerHTML = filtered.map(t => `
    <div class="tmpl-card" onclick="startFromTemplate('${t.id}')">
      <div class="tmpl-card-icon">${t.icon}</div>
      <div class="tmpl-card-cat">${t.categoryLabel}</div>
      <div class="tmpl-card-name">${t.name}</div>
      <div class="tmpl-card-desc">${t.description}</div>
      <div class="tmpl-card-sections">📋 ${t.sections.length} セクション</div>
    </div>
  `).join('');
}
function setFilter(cat) { activeFilter = cat; renderTemplateGrid(); }
function filterTemplates() { renderTemplateGrid(); }

/* ═══════════════════════════════════════════
   START / LOAD DOCUMENT
═══════════════════════════════════════════ */
function startFromTemplate(templateId) {
  const tmpl = window.PLANCRAFT_TEMPLATES.find(t => t.id === templateId);
  if (!tmpl) return;
  const doc = {
    id:         genId(),
    templateId: tmpl.id,
    templateName: tmpl.name,
    icon:       tmpl.icon,
    title:      tmpl.name,
    createdAt:  Date.now(),
    updatedAt:  Date.now(),
    sections:   tmpl.sections.map(s => ({ ...s, content: '' })),
  };
  currentDocId = doc.id;
  currentDoc   = doc;
  saveCurrentDoc();
  openEditor();
}

function openDocById(id) {
  const docs = loadDocs();
  const doc  = docs.find(d => d.id === id);
  if (!doc) return;
  currentDocId = doc.id;
  currentDoc   = JSON.parse(JSON.stringify(doc));
  openEditor();
}

function openEditor() {
  showView('editor');
  renderEditor();
  updateSectionNav();
  updateProgress();
}

/* ═══════════════════════════════════════════
   EDITOR
═══════════════════════════════════════════ */
function renderEditor() {
  if (!currentDoc) return;
  document.getElementById('ed-doc-title').value  = currentDoc.title || '';
  document.getElementById('ed-tmpl-badge').textContent = currentDoc.templateName || '';

  const cont = document.getElementById('ed-content');
  cont.innerHTML = currentDoc.sections.map((sec, i) => buildSectionBlock(sec, i)).join('') +
    `<button class="ed-add-section" onclick="addSection()">＋ セクションを追加</button>`;
}

function buildSectionBlock(sec, i) {
  const filled = sec.content && sec.content.trim().length > 0;
  return `
  <div class="ed-section-block" id="block-${sec.id}" data-secid="${sec.id}">
    <div class="ed-section-head">
      <span class="ed-section-num">§${String(i+1).padStart(2,'0')}</span>
      <input class="ed-section-title-input" type="text" value="${esc(sec.title)}"
             placeholder="セクション名"
             oninput="updateSectionTitle('${sec.id}', this.value)">
      <div class="ed-section-actions">
        <button class="ed-section-act-btn" title="上へ" onclick="moveSection('${sec.id}',-1)">↑</button>
        <button class="ed-section-act-btn" title="下へ" onclick="moveSection('${sec.id}',1)">↓</button>
        <button class="ed-section-act-btn danger" title="削除" onclick="removeSectionConfirm('${sec.id}')">🗑</button>
      </div>
    </div>
    <textarea class="ed-section-textarea" id="ta-${sec.id}"
              placeholder="${esc(sec.placeholder || 'ここに内容を入力してください...')}"
              oninput="updateSectionContent('${sec.id}', this.value)">${esc(sec.content || '')}</textarea>
    <div class="ed-section-footer">
      <span class="ed-char-count" id="cc-${sec.id}">${(sec.content||'').length} 文字</span>
      ${filled ? '<span class="ed-filled-badge">✓ 入力済み</span>' : ''}
    </div>
  </div>`;
}

function esc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function updateDocTitle(v) {
  if (!currentDoc) return;
  currentDoc.title = v;
  autoSave();
}

function updateSectionTitle(secId, v) {
  const sec = currentDoc.sections.find(s => s.id === secId);
  if (sec) { sec.title = v; updateSectionNav(); autoSave(); }
}

function updateSectionContent(secId, v) {
  const sec = currentDoc.sections.find(s => s.id === secId);
  if (!sec) return;
  sec.content = v;
  const cc = document.getElementById('cc-' + secId);
  if (cc) cc.textContent = v.length + ' 文字';
  // Update filled badge
  const block  = document.getElementById('block-' + secId);
  if (block) {
    const footer = block.querySelector('.ed-section-footer');
    let badge = footer.querySelector('.ed-filled-badge');
    if (v.trim()) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'ed-filled-badge'; footer.appendChild(badge); }
      badge.textContent = '✓ 入力済み';
    } else if (badge) { badge.remove(); }
  }
  updateSectionNav();
  updateProgress();
  autoSave();
}

function updateSectionNav() {
  if (!currentDoc) return;
  const nav = document.getElementById('ed-section-nav');
  nav.innerHTML = currentDoc.sections.map(sec => {
    const filled = sec.content && sec.content.trim().length > 0;
    return `
    <div class="ed-section-nav-item ${filled ? 'filled' : ''}" onclick="scrollToSection('${sec.id}')">
      <span class="ed-section-nav-dot"></span>
      <span>${sec.title || '無題セクション'}</span>
    </div>`;
  }).join('');
}

function scrollToSection(secId) {
  const el = document.getElementById('block-' + secId);
  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); closeSidebar(); }
}

function updateProgress() {
  if (!currentDoc) return;
  const total  = currentDoc.sections.length;
  const filled = currentDoc.sections.filter(s => s.content && s.content.trim()).length;
  const pct = total ? Math.round(filled / total * 100) : 0;
  document.getElementById('ed-progress-fill').style.width = pct + '%';
  document.getElementById('ed-progress-pct').textContent  = pct + '%';
}

function addSection() {
  if (!currentDoc) return;
  const sec = {
    id:          genId(),
    title:       '新しいセクション',
    type:        'text',
    placeholder: 'ここに内容を入力してください...',
    content:     '',
  };
  currentDoc.sections.push(sec);
  saveCurrentDoc();
  // Rebuild
  const cont = document.getElementById('ed-content');
  const addBtn = cont.querySelector('.ed-add-section');
  const block  = document.createElement('div');
  block.innerHTML = buildSectionBlock(sec, currentDoc.sections.length - 1);
  cont.insertBefore(block.firstElementChild, addBtn);
  updateSectionNav();
  updateProgress();
  scrollToSection(sec.id);
  showToast('セクションを追加しました', 'success');
}

function removeSectionConfirm(secId) {
  const sec = currentDoc.sections.find(s => s.id === secId);
  showModal(
    `「${sec?.title || 'セクション'}」を削除`,
    'このセクションの内容が失われます。削除しますか？',
    'danger',
    '削除する',
    () => removeSection(secId)
  );
}

function removeSection(secId) {
  if (!currentDoc) return;
  currentDoc.sections = currentDoc.sections.filter(s => s.id !== secId);
  const block = document.getElementById('block-' + secId);
  if (block) block.remove();
  updateSectionNav();
  updateProgress();
  saveCurrentDoc();
  showToast('セクションを削除しました', 'info');
}

function moveSection(secId, dir) {
  const arr = currentDoc.sections;
  const i   = arr.findIndex(s => s.id === secId);
  const j   = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  // Re-render content
  const cont = document.getElementById('ed-content');
  const addBtn = cont.querySelector('.ed-add-section');
  // Remove all blocks
  cont.querySelectorAll('.ed-section-block').forEach(b => b.remove());
  // Re-insert in new order
  arr.forEach((sec, idx) => {
    const div = document.createElement('div');
    div.innerHTML = buildSectionBlock(sec, idx);
    cont.insertBefore(div.firstElementChild, addBtn);
  });
  updateSectionNav();
  saveCurrentDoc();
}

let autoSaveTimer = null;
function autoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    currentDoc.updatedAt = Date.now();
    saveCurrentDoc();
  }, 800);
}

function saveDocument() {
  currentDoc.updatedAt = Date.now();
  saveCurrentDoc();
  showToast('保存しました', 'success');
}

/* ═══════════════════════════════════════════
   SIDEBAR (mobile)
═══════════════════════════════════════════ */
function toggleSidebar() {
  const sb  = document.getElementById('ed-sidebar');
  const ov  = document.getElementById('sidebar-overlay');
  const open = sb.classList.contains('open');
  if (open) { sb.classList.remove('open'); ov.classList.remove('open'); }
  else       { sb.classList.add('open');    ov.classList.add('open'); }
}
function closeSidebar() {
  document.getElementById('ed-sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

/* ═══════════════════════════════════════════
   PREVIEW
═══════════════════════════════════════════ */
function goPreview() {
  if (!currentDoc) return;
  saveCurrentDoc();
  renderPreview();
  showView('preview');
}

function renderPreview() {
  const doc = currentDoc;
  if (!doc) return;
  const tmpl = window.PLANCRAFT_TEMPLATES.find(t => t.id === doc.templateId) || {};
  const date = new Date(doc.updatedAt || doc.createdAt).toLocaleDateString('ja-JP', {year:'numeric',month:'long',day:'numeric'});

  const tocHTML = doc.sections.map((s,i) => `
    <div class="doc-toc-item">
      <span class="doc-toc-num">${String(i+1).padStart(2,'0')}</span>
      <span>${s.title}</span>
    </div>`).join('');

  const sectionsHTML = doc.sections.map((s,i) => `
    <div class="doc-section">
      <div class="doc-section-header">
        <span class="doc-section-num">§${String(i+1).padStart(2,'0')}</span>
        <h2 class="doc-section-title">${s.title}</h2>
      </div>
      ${s.content && s.content.trim()
        ? `<div class="doc-section-content">${htmlEsc(s.content)}</div>`
        : `<div class="doc-section-empty">（未入力）</div>`}
    </div>`).join('');

  document.getElementById('prev-main').innerHTML = `
    <div class="doc-paper">
      <div class="doc-cover">
        <div class="doc-cover-category">${tmpl.icon || '📄'} ${tmpl.categoryLabel || 'DOCUMENT'}</div>
        <div class="doc-cover-title">${htmlEsc(doc.title)}</div>
        <div class="doc-cover-meta">
          <span>📅 ${date}</span>
          <span>📋 ${doc.sections.length} セクション</span>
        </div>
      </div>
      <div class="doc-toc">
        <div class="doc-toc-title">目次</div>
        ${tocHTML}
      </div>
      <div class="doc-sections">${sectionsHTML}</div>
    </div>`;
}

function htmlEsc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\n/g,'<br>');
}

function backToEditor() { showView('editor'); }

function printDoc() {
  window.print();
}

function copyMarkdown() {
  if (!currentDoc) return;
  const tmpl = window.PLANCRAFT_TEMPLATES.find(t => t.id === currentDoc.templateId) || {};
  let md = `# ${currentDoc.title}\n\n`;
  md += `> カテゴリ: ${tmpl.categoryLabel || ''}  \n`;
  md += `> テンプレート: ${currentDoc.templateName || ''}  \n\n`;
  md += '---\n\n';
  currentDoc.sections.forEach((s, i) => {
    md += `## ${i+1}. ${s.title}\n\n`;
    md += (s.content || '（未入力）') + '\n\n';
  });
  navigator.clipboard.writeText(md).then(() => {
    showToast('Markdownをコピーしました', 'success');
  }).catch(() => {
    showToast('コピーに失敗しました', 'info');
  });
}

/* ═══════════════════════════════════════════
   MY DOCS
═══════════════════════════════════════════ */
function renderMyDocs() {
  const docs = loadDocs().sort((a,b) => b.updatedAt - a.updatedAt);
  const grid = document.getElementById('docs-grid');
  document.getElementById('mydocs-count').textContent = docs.length + '件';

  if (docs.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-text">保存済みの企画書がありません</div>
        <button class="btn-primary" onclick="showView('templates')">企画書を作る →</button>
      </div>`;
    return;
  }

  grid.innerHTML = docs.map(d => {
    const filled = d.sections.filter(s => s.content && s.content.trim()).length;
    const total  = d.sections.length;
    const pct    = total ? Math.round(filled / total * 100) : 0;
    const date   = new Date(d.updatedAt).toLocaleDateString('ja-JP', {month:'short', day:'numeric'});
    return `
    <div class="doc-card">
      <div class="doc-card-icon">${d.icon || '📄'}</div>
      <div class="doc-card-tmpl">${d.templateName || ''}</div>
      <div class="doc-card-title">${d.title || '無題'}</div>
      <div class="doc-card-meta">
        <span>📋 ${total} セクション</span>
        <span>🕐 ${date}</span>
      </div>
      <div class="doc-card-progress">
        <div class="doc-card-fill" style="width:${pct}%"></div>
      </div>
      <div class="doc-card-actions">
        <button class="doc-card-act edit" onclick="openDocById('${d.id}')">✏️ 編集</button>
        <button class="doc-card-act del" onclick="deleteDocConfirm('${d.id}')">🗑 削除</button>
      </div>
    </div>`;
  }).join('');
}

function deleteDocConfirm(id) {
  const doc = loadDocs().find(d => d.id === id);
  showModal(
    '企画書を削除',
    `「${doc?.title || '無題'}」を削除します。この操作は取り消せません。`,
    'danger',
    '削除する',
    () => { deleteDoc(id); renderMyDocs(); showToast('削除しました', 'info'); }
  );
}

/* ═══════════════════════════════════════════
   MODAL
═══════════════════════════════════════════ */
let modalCallback = null;
function showModal(title, body, type, btnLabel, callback) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent  = body;
  const btn = document.getElementById('modal-confirm-btn');
  btn.textContent  = btnLabel;
  btn.className    = 'modal-btn ' + type;
  btn.onclick      = () => { closeModal(); callback && callback(); };
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function showToast(msg, type = 'info') {
  const icon  = type === 'success' ? '✓' : 'ℹ';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
renderLandingTemplates();