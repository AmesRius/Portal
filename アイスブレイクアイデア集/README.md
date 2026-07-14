# Workshop Idea Database（ワークショップネタ検索システム）

場作りや探究学習におけるファシリテーションの質を高めるための、軽量で高速なワークショップ・アイデア検索システムです。
アイスブレイク、チェックイン、グループワークなどのネタをデータベース化し、目的や条件に合わせてリアルタイムに検索・絞り込みができます。

## 🎯 プロジェクトの目的
* ファシリテーターやTA（ティーチングアシスタント）が、対象者や目的に最適なワークを瞬時に見つけられるようにする。
* スプレッドシートをデータベースとして活用し、非エンジニアでも簡単にネタの追加・運用ができる仕組みを作る。
* サーバーレスかつ維持費ゼロ（Vanilla JS + Google Apps Script）で運用する。

## ✨ 主な機能
* **リアルタイム検索:** キーワード、カテゴリ、人数、時間などの複数条件による即時フィルタリング機能。
* **ランダム＆ソート表示:** 初期表示時のランダム表示（おすすめ提案）および、タイトル順の並び替え機能。
* **レスポンシブデザイン:** PC、タブレット、スマートフォンなど、あらゆるデバイスで最適に表示されるUI。
* **ドキュメント連携:** 各ネタの詳細な進行スクリプト（Googleドキュメント）へのシームレスな遷移機能。

## 🛠️ 技術スタック（システム構成）
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend (API):** Google Apps Script (GAS)
* **Database:** Google Sheets

---

## 🚀 セットアップ手順

### 1. データベース（Google Sheets）の準備
1. Googleスプレッドシートを新規作成し、シート名を `master` にする。
2. 1行目に以下のカラム名（英語小文字）を設定。
   `id`, `title`, `category`, `size`, `time`, `online`, `target`, `items`, `url`, `summary`
3. 2行目以降にデータを入力。表記揺れを防ぐため、カテゴリ等は「データの入力規則（プルダウン）」で制限。

### 2. API（Google Apps Script）の構築
1. スプレッドシートの「拡張機能」>「Apps Script」を開く。
2. 以下の `doGet` 関数を記述し、スプレッドシートのデータをJSON形式で出力する。
```javascript
   function doGet() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('master');
     // ... (JSONパース処理)
     return ContentService.createTextOutput(JSON.stringify(data))
       .setMimeType(ContentService.MimeType.JSON);
   }
```
3. 「デプロイ」>「新しいデプロイ」から「ウェブアプリ」として公開。
* アクセスできるユーザー: **「全員」** に設定。
4. 発行された「ウェブアプリのURL」をコピー。

### 3. フロントエンドの連携

1. 本リポジトリのコードをクローンまたはダウンロード。
2. `main.js` の1行目にある `GAS_API_URL` の値を、先ほどコピーしたウェブアプリのURLに書き換える。
```javascript
const GAS_API_URL = '[https://script.google.com/macros/s/XXXXX/exec](https://script.google.com/macros/s/XXXXX/exec)';

```
3. `index.html` をブラウザで開いて動作を確認。
4. GitHub Pagesにホスティングし公開。

---

## 📂 ファイル構成

```text
📦 workshop-idea-database
 ┣ 📜 index.html    # メインの検索・一覧画面（UI）
 ┣ 📜 style.css     # デザイン・レスポンシブ・アニメーション設定
 ┣ 📜 main.js       # データ取得（Fetch）、検索・ソートロジック
 ┗ 📜 template.md   # 詳細資料（Googleドキュメント）作成用のMarkdownひな形
```

## 📝 運用ルール（詳細資料の作成）

スプレッドシートの `url` カラムには、各ワークの詳細な進行方法をまとめたGoogleドキュメントのリンクを記載します。
詳細資料を作成する際は、品質を担保するために同梱の `template.md` を活用し、以下の項目を網羅してください。

* ワークの目的・ねらい
* 全体のタイムテーブル
* 進行のステップと台本（スクリプト）
* ファシリテーターの注意点・コツ（TIPS）

## 🤝 貢献・データ追加

新しいワークショップのネタを思いついた場合は、管理用のスプレッドシートに直接行を追加してください。フロントエンドの更新は不要で、リロードするだけで自動的にサイトに反映されます。