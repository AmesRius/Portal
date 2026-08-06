# 表データからCSV作成ツール

> ExcelやGoogleスプレッドシートの表データをペーストするだけで、即座にCSVファイルにパースしてダウンロードできる実用的なブラウザツールです 。

[デモURL](https://www.google.com/search?q=https://...) | [リポジトリURL](https://www.google.com/search?q=https://github.com/...)

---

## 🚀 主な機能 (Features)

* **コピペで簡単変換:** スプレッドシートからコピーしたタブ区切りの表データをテキストエリアに貼り付けるだけで、CSV変換処理を行えます 。
* **自動エスケープ処理:** セル内のデータにカンマ（`,`）、改行（`\n`）、ダブルクォーテーション（`"`）が含まれる場合でも、自動的にダブルクォーテーションで囲むなど適切なエスケープ処理を実行します 。
* **柔軟なエンコード設定:** 出力時の文字コードとして、汎用的な「UTF-8 (BOM付き)」に加え、日本のExcel環境で文字化けを防ぐための「Shift_JIS」を選択可能です 。
* **ヘッダー設定オプション:** 1行目のデータをヘッダーとして扱うかどうかのチェックボックス（UI）を備えています 。

---

## 🛠 技術スタック (Tech Stack)

* **フロントエンド:** HTML5, CSS3, Vanilla JavaScript 
* **文字コード変換:** [Encoding.js](https://www.google.com/search?q=https://github.com/polygonplanet/encoding.js) (CDN経由で読み込み、Shift_JISへの変換処理に使用) 
* **アーキテクチャ:** CSS変数を活用したモダンなスタイリングと、`Blob` オブジェクトを用いたブラウザ内でのファイル生成ロジックを採用しています 。

---

## 📦 セットアップ・使い方 (Getting Started / Usage)

1. 本リポジトリをクローンするか、`index.html` をダウンロードします。
2. お使いのWebブラウザで `index.html` を開きます。
3. ExcelやGoogleスプレッドシート上で対象の表をコピー（`Ctrl+C`）し、ツールのテキストエリアに貼り付け（`Ctrl+V`）ます 。
4. プルダウンメニューから適切な文字コード（UTF-8 または Shift_JIS）を選択します 。
5. 「CSVファイルをダウンロード」ボタンをクリックすると、`exported_data.csv` というファイル名でダウンロードが実行されます 。

---

## 📁 ディレクトリ構造 (Project Structure)

```text
.
├── index.html  # UI、スタイリング、CSVパース処理、ファイルダウンロードロジックを含む単一ファイル 
└── README.md   # 本ドキュメント

```

---

## 👤 作者 (Author)

**[ユーザー名]**

* GitHub: [@ユーザー名](https://www.google.com/search?q=https://github.com/...)

## 📄 ライセンス (License)

This project is licensed under the [MIT License](https://www.google.com/search?q=https://...).