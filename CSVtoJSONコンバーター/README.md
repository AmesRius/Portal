# CSV to JSON / JS Converter

> ブラウザ上で完結。CSVやTSVデータを直感的な操作でJSONやJavaScript配列形式に一瞬で変換できる軽量ツール。

探究テーマのデータベース作成や、モックデータの用意など、フロントエンド開発やデータ整理の現場で手軽に使えるコンバーターです。

---

## 🚀 主な機能 (Features)

* **直感的なファイル読み込み**: テキストエリアへの直接貼り付けのほか、CSV/TXTファイルの**ドラッグ＆ドロップ**に対応。
* **リアルタイム変換**: データの入力やオプション設定の変更を検知し、即座にプレビューへ反映。
* **柔軟な出力オプション**:
  * **区切り文字の選択**: カンマ(CSV)、セミコロン、タブ(TSV)に対応。
  * **JS定数形式サポート**: `const THEME_DATABASE = [...]` のようなJavaScriptファイルとしての直接出力に対応（変数名のカスタマイズ可能）。
  * **高度なフォーマット**: 出力結果のインデント整形（Pretty Print）ON/OFF機能。
  * **型の自動解釈**: 文字列の数値や真偽値（`true` / `false`）を自動的に対応するデータ型に変換するオプション。
* **便利なエクスポート**: ワンクリックでのクリップボードコピー、または `.json` / `.js` ファイルとしてのローカル保存機能。

---

## 🛠 技術スタック (Tech Stack)

ビルドツールやパッケージマネージャーは不要で、単一のHTMLファイルで完結するシンプルな構成です。

* **HTML5 / CSS3**
* **Vanilla JavaScript** (ES6+)
* **[Tailwind CSS](https://tailwindcss.com/)** (CDN経由によるスタイリング)
* **Web APIs**: `FileReader API`, `Blob API`, `Clipboard API`

---

## 📖 セットアップ・使い方 (Getting Started / Usage)

本ツールはローカルサーバーを立ち上げる必要がなく、ブラウザだけで動作します。

1. **起動する**
   リポジトリをクローン、またはZIPでダウンロードし、`index.html` をGoogle Chrome等のモダンブラウザで開きます。
2. **データを入力する**
   画面左側のエリアにCSVデータを貼り付けるか、対象のファイルをドラッグ＆ドロップします。
   > **💡 Tip:** 1行目のデータ（ヘッダー）が、JSONやJSオブジェクトのプロパティ名（キー）として使用されます。
3. **オプションを調整する**
   必要に応じて画面右側のオプション（「整形」「JS定数形式で出力」「数値を数値型に変換」など）を切り替えます。
4. **出力・保存する**
   右下の「コピー」ボタンでクリップボードに保存するか、「保存 (.js / .json)」ボタンでファイルとしてダウンロードして活用してください。

---

## 📂 ディレクトリ構造 (Project Structure)

```text
.
├── index.html    # メインのアプリケーション本体（HTML/CSS/ロジックを全て内包）
└── README.md     # 本ドキュメント

```

---

## 🌐 リンク (Links)

* **ライブデモ**: [デモ環境のURLをここに挿入](https://www.google.com/search?q=https://...)
* **リポジトリ**: [リポジトリのURLをここに挿入](https://www.google.com/search?q=https://github.com/...)

---

## 📄 開発者 / ライセンス

* **Author**: [あなたの名前 / ユーザー名](https://www.google.com/search?q=https://github.com/...)
* **License**: This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE) - 詳細は LICENSE ファイルをご覧ください。