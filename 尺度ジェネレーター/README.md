# 心理尺度フォーム＆自動採点システム ジェネレーター

> 心理学研究やアンケートでよく用いられる「心理尺度」の質問項目を設定するだけで、Google Formsの自動生成スクリプト（Google Apps Script / GAS）と採点ルールの一括設定用データを即座に出力するツール。

「独立・相互依存的自己理解尺度」や「自己効力感尺度」など、複数の質問項目と反転項目（リバーススコアリング）が混在するアンケートの作成〜採点〜フィードバックの自動化設定を、プログラミング知識ゼロで構築できます。

---

## 🚀 主な機能 (Features)

* **直感的な尺度設計UI**:
  * 尺度名（アンケートタイトル）の自由設定。
  * 質問項目の追加・削除、選択肢のカンマ区切りによる一括設定。
  * 項目ごとの「通常採点」／「反転採点」の切り替え機能。
* **Google Apps Script (GAS) 自動生成**:
  * 入力されたデータに基づき、**「Google Formsを自動生成するコード」**と**「フォーム送信時にスコアを自動計算し、回答者に結果をメール送信するコード」**を含むGASスクリプトをワンクリックで生成。
* **スプレッドシート連携用データ出力**:
  * スクリプトが参照するマスタデータ（質問リストと採点ルール）を、Google Spreadsheetにそのまま貼り付けられるTSV（タブ区切りテキスト）形式で出力。

---

## 🛠 技術スタック (Tech Stack)

外部ライブラリ不要の単一HTMLファイルで動作し、出力されたコードはGoogle Workspace（GAS）上で実行されます。

* **フロントエンド (本ツール)**:
  * HTML5 / CSS3
  * Vanilla JavaScript (DOM操作, コード文字列生成)
* **バックエンド (生成されるコードの実行環境)**:
  * [Google Apps Script (GAS)](https://developers.google.com/apps-script)
  * `FormApp` API (フォーム自動生成)
  * `SpreadsheetApp` API (データ読み書き)
  * `MailApp` API (結果の自動返信メール)

---

## 📖 セットアップ・使い方 (Getting Started / Usage)

本ジェネレーターを利用して、Google Formsによる自動採点システムを構築する手順です。

### Step 1: ジェネレーターでの設定
1. ダウンロードした `index.html` をブラウザで開きます。
2. 「1. 尺度名の設定」でアンケートのタイトルを入力します。
3. 「2. 質問項目の編集」で、質問内容、選択肢（カンマ区切り）、採点ルール（通常/反転）を入力・調整します。
4. 「生成する」ボタンをクリックします。

### Step 2: Google Spreadsheetでの準備
1. 新規の Google Spreadsheet を作成し、シート名を `Questions` に変更します。
2. ジェネレーターで出力された「スプレッドシート用データ」をコピーし、A1セルに貼り付けます。
   > **💡 Tip:** 貼り付け後、必要に応じてスプレッドシートの「データ」メニューから「テキストを列に分割」を選択し、綺麗にセルに割り当ててください。

### Step 3: GASの設定と実行
1. 作成したスプレッドシートのメニューから `拡張機能` > `Apps Script` を開きます。
2. ジェネレーターで出力された「Google Apps Script コード」をエディタに貼り付けて保存します。
3. エディタ上で関数 `createFormFromSheet` を選択し、「実行」ボタンを押します（初回のみ権限の承認が必要です）。
4. 自動的に連携されたGoogle Formsが作成されます。
5. （オプション）フォーム送信時に自動採点・メール送信を機能させるには、GASエディタの「トリガー（時計アイコン）」から、`onFormSubmit` 関数を「フォーム送信時」に実行するよう設定してください。

---

## 📂 ディレクトリ構造 (Project Structure)

```text
.
├── index.html    # ジェネレーター本体（設定UIとGAS生成ロジックを内包）
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