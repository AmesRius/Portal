// State management
    let currentMode = 'unbundle'; // 'unbundle' or 'bundle'
    let activeTab = 'html'; // 'html', 'css', 'js', 'preview'
    
    let processedData = {
      html: '',
      css: '',
      js: ''
    };

    // UI elements
    const sourceInput = document.getElementById('sourceInput');
    const outputCodeArea = document.getElementById('outputCodeArea');
    const htmlFileNameInput = document.getElementById('htmlFileName');
    const cssFileNameInput = document.getElementById('cssFileName');
    const jsFileNameInput = document.getElementById('jsFileName');
    const autoFormatCheck = document.getElementById('autoFormatCheck');

    // CodeMirror Editors
    let sourceEditor, outputEditor;

    window.addEventListener('DOMContentLoaded', () => {
      // Initialize CodeMirror for source
      sourceEditor = CodeMirror.fromTextArea(sourceInput, {
        mode: 'htmlmixed',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: true
      });

      // Initialize CodeMirror for output
      outputEditor = CodeMirror.fromTextArea(outputCodeArea, {
        mode: 'htmlmixed',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true
      });

      sourceEditor.on('change', () => {
        processCode();
      });

      // File Name change listeners
      [htmlFileNameInput, cssFileNameInput, jsFileNameInput, autoFormatCheck].forEach(el => {
        el.addEventListener('input', () => {
          updateTabNames();
          processCode();
        });
      });

      // Drag and drop setup
      const dropZone = document.querySelector('main');
      dropZone.addEventListener('dragover', (e) => e.preventDefault());
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          const reader = new FileReader();
          reader.onload = (evt) => {
            sourceEditor.setValue(evt.target.result);
            showToast('ファイルを読み込みました');
          };
          reader.readAsText(file);
        }
      });

      loadSampleCode();
    });

    function setMode(mode) {
      currentMode = mode;
      const unbundleBtn = document.getElementById('modeUnbundleBtn');
      const bundleBtn = document.getElementById('modeBundleBtn');
      const inputLabel = document.getElementById('inputLabel');
      const unbundleOptions = document.getElementById('unbundleOptions');

      if (mode === 'unbundle') {
        unbundleBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium transition bg-indigo-600 text-white shadow";
        bundleBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white transition";
        inputLabel.innerText = "入力: 統合HTMLコード";
        unbundleOptions.style.display = 'flex';
      } else {
        bundleBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium transition bg-indigo-600 text-white shadow";
        unbundleBtn.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white transition";
        inputLabel.innerText = "入力: 統合したいコード (自動検出)";
        unbundleOptions.style.display = 'none';
      }
      processCode();
    }

    function updateTabNames() {
      document.getElementById('tabHtmlName').innerText = htmlFileNameInput.value || 'index.html';
      document.getElementById('tabCssName').innerText = cssFileNameInput.value || 'style.css';
      document.getElementById('tabJsName').innerText = jsFileNameInput.value || 'script.js';
    }

    // Core Processing Logic
    function processCode() {
      const rawCode = sourceEditor.getValue();
      if (!rawCode.trim()) {
        processedData = { html: '', css: '', js: '' };
        updateOutputDisplay();
        return;
      }

      const htmlFileName = htmlFileNameInput.value.trim() || 'index.html';
      const cssFileName = cssFileNameInput.value.trim() || 'style.css';
      const jsFileName = jsFileNameInput.value.trim() || 'script.js';

      if (currentMode === 'unbundle') {
        // DOMParser to safely parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawCode, 'text/html');

        let extractedCss = '';
        let extractedJs = '';

        // Extract <style> contents
        const styleTags = doc.querySelectorAll('style');
        styleTags.forEach(style => {
          extractedCss += style.textContent + '';
          style.remove();
        });

        // Extract inline <script> contents (ignoring script with src)
        const scriptTags = doc.querySelectorAll('script');
        scriptTags.forEach(script => {
          if (!script.hasAttribute('src')) {
            extractedJs += script.textContent + '';
            script.remove();
          }
        });

        // Inject <link> for CSS if CSS exists
        if (extractedCss.trim()) {
          const link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssFileName;
          doc.head.appendChild(link);
        }

        // Inject <script> for JS if JS exists
        if (extractedJs.trim()) {
          const script = doc.createElement('script');
          script.src = jsFileName;
          doc.body.appendChild(script);
        }

        let finalHtml = doc.documentElement.outerHTML;
        if (rawCode.toLowerCase().includes('<!doctype html>')) {
          finalHtml = '<!DOCTYPE html>' + finalHtml;
        }

        if (autoFormatCheck.checked) {
          extractedCss = formatCSS(extractedCss);
          extractedJs = formatJS(extractedJs);
          finalHtml = formatHTML(finalHtml);
        }

        processedData = {
          html: finalHtml,
          css: extractedCss.trim(),
          js: extractedJs.trim()
        };

      } else {
        // Bundler Mode: Combines everything into single HTML
        let combinedHtml = rawCode;
        processedData = {
          html: combinedHtml,
          css: '',
          js: ''
        };
      }

      updateOutputDisplay();
    }

    function switchTab(tab) {
      activeTab = tab;
      const tabs = {
        html: document.getElementById('tabHtml'),
        css: document.getElementById('tabCss'),
        js: document.getElementById('tabJs'),
        preview: document.getElementById('tabPreview')
      };

      Object.keys(tabs).forEach(t => {
        if (t === tab) {
          tabs[t].className = "px-3 py-1 rounded text-xs font-semibold bg-indigo-600 text-white shadow";
        } else {
          tabs[t].className = "px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-white";
        }
      });

      const codeContainer = document.getElementById('codeViewContainer');
      const iframeContainer = document.getElementById('iframeViewContainer');

      if (tab === 'preview') {
        codeContainer.classList.add('hidden');
        iframeContainer.classList.remove('hidden');
        iframeContainer.classList.add('flex');
        renderPreview();
      } else {
        iframeContainer.classList.add('hidden');
        iframeContainer.classList.remove('flex');
        codeContainer.classList.remove('hidden');
        updateOutputDisplay();
      }
    }

    function updateOutputDisplay() {
      if (activeTab === 'preview') {
        renderPreview();
        return;
      }

      const indicator = document.getElementById('activeFileIndicator');
      let modeName = 'htmlmixed';

      if (activeTab === 'html') {
        indicator.innerText = htmlFileNameInput.value || 'index.html';
        outputEditor.setValue(processedData.html);
        modeName = 'htmlmixed';
      } else if (activeTab === 'css') {
        indicator.innerText = cssFileNameInput.value || 'style.css';
        outputEditor.setValue(processedData.css);
        modeName = 'css';
      } else if (activeTab === 'js') {
        indicator.innerText = jsFileNameInput.value || 'script.js';
        outputEditor.setValue(processedData.js);
        modeName = 'javascript';
      }

      outputEditor.setOption('mode', modeName);
    }

    function renderPreview() {
      const iframe = document.getElementById('previewIframe');
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Construct inline doc for preview
      let combined = processedData.html;

      // Inject CSS & JS inline for rendering
      if (processedData.css) {
        combined = combined.replace('</head>', `<style>${processedData.css}</style></head>`);
      }
      if (processedData.js) {
        combined = combined.replace('</body>', `<script>${processedData.js}<\/script></body>`);
      }

      iframeDoc.open();
      iframeDoc.write(combined);
      iframeDoc.close();
    }

    // Single-click Batch Individual Files Download
    async function downloadFilesSeparately() {
      const htmlName = htmlFileNameInput.value.trim() || 'index.html';
      const cssName = cssFileNameInput.value.trim() || 'style.css';
      const jsName = jsFileNameInput.value.trim() || 'script.js';

      const files = [];

      if (processedData.html) files.push({ name: htmlName, content: processedData.html, type: 'text/html' });
      if (processedData.css) files.push({ name: cssName, content: processedData.css, type: 'text/css' });
      if (processedData.js) files.push({ name: jsName, content: processedData.js, type: 'text/javascript' });

      if (files.length === 0) {
        showToast('保存するコンテンツがありません');
        return;
      }

      // Try File System Access API (Modern browsers)
      if ('showDirectoryPicker' in window) {
        try {
          const dirHandle = await window.showDirectoryPicker();
          for (const file of files) {
            const fileHandle = await dirHandle.getFileHandle(file.name, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(file.content);
            await writable.close();
          }
          showToast(`フォルダに ${files.length} ファイルを直に保存しました！`);
          return;
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.warn('File System Access API failed, falling back to multi-download', err);
          } else {
            return; // User canceled
          }
        }
      }

      // Fallback: Trigger standard sequential downloads
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setTimeout(() => {
          triggerSingleDownload(file.name, file.content, file.type);
        }, i * 300);
      }
      showToast(`${files.length} 個のファイルを個別にダウンロードしました`);
    }

    function triggerSingleDownload(filename, text, mimeType) {
      const blob = new Blob([text], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // ZIP Download Function
    function downloadZip() {
      const zip = new JSZip();
      const htmlName = htmlFileNameInput.value.trim() || 'index.html';
      const cssName = cssFileNameInput.value.trim() || 'style.css';
      const jsName = jsFileNameInput.value.trim() || 'script.js';

      if (processedData.html) zip.file(htmlName, processedData.html);
      if (processedData.css) zip.file(cssName, processedData.css);
      if (processedData.js) zip.file(jsName, processedData.js);

      zip.generateAsync({ type: 'blob' }).then((content) => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'unbundled_site.zip';
        a.click();
        URL.revokeObjectURL(url);
        showToast('ZIPを保存しました！');
      });
    }

    function copyCurrentTabCode() {
      let textToCopy = '';
      if (activeTab === 'html') textToCopy = processedData.html;
      if (activeTab === 'css') textToCopy = processedData.css;
      if (activeTab === 'js') textToCopy = processedData.js;

      if (!textToCopy) {
        showToast('コピーするコードがありません');
        return;
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('クリップボードにコピーしました');
      });
    }

    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          sourceEditor.setValue(e.target.result);
          showToast('ファイルを読み込みました');
        };
        reader.readAsText(file);
      }
    }

    function clearAll() {
      sourceEditor.setValue('');
      processedData = { html: '', css: '', js: '' };
      updateOutputDisplay();
      showToast('クリアしました');
    }

    function loadSampleCode() {
      const sample = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Sample Card App</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-[content]: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: #1e293b;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      text-align: center;
      max-width: 320px;
    }
    .btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #4f46e5;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Hello Unbundler!</h2>
    <p>このサンプルコードは、HTMLの中にCSSとJSが一体化されています。</p>
    <button class="btn" id="clickBtn">クリックしてね</button>
  </div>

  <script>
    document.getElementById('clickBtn').addEventListener('click', () => {
      alert('JavaScriptが正しく動作しています！');
    });
  <\/script>
</body>
</html>`;

      sourceEditor.setValue(sample);
      showToast('サンプルコードを読み込みました');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMsg').innerText = msg;
      toast.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
      }, 2500);
    }

    // Basic Formatters
    function formatCSS(css) {
      return css.replace(/\s*\{\s*/g, ' {  ')
                .replace(/;\s*/g, ';  ')
                .replace(/\s*\}\s*/g, '}')
                .replace(/ /g, '');
    }

    function formatJS(js) {
      return js.trim();
    }

    function formatHTML(html) {
      return html.trim();
    }