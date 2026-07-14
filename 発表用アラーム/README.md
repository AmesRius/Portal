# 発表用LTタイマー (Presentation LT Timer)

> 5分間のライトニングトーク（LT）やピッチに最適化された、ブラウザで動くシンプルでスマートなプレゼン用タイマー。

外部の音声ファイルやローカルサーバーを一切必要とせず、ブラウザを開くだけで即座にプレゼンテーションの時間管理ができる軽量アプリケーションです。

---

## 🚀 主な機能 (Features)

* **LTに最適化された通知音**: Web Audio APIを利用し、ブラウザ上で直接ビープ音を生成します。
  * **3分経過時（残り2分）**: 高音のビープ音（880Hz）で通知。
  * **5分終了時（タイムアップ）**: 通常のビープ音（440Hz）で終了を通知。
* **視覚的な警告アラート**: 残り時間が1分（60秒）を切ると、タイマーの表示が自動的に赤色に変化し、発表者にまとめのタイミングを直感的に伝えます。
* **ワンクリック一発起動**: 「5分タイマーを開始 (3分で通知)」ボタンを押すだけで、タイマーのリセットとスタートが同時に行われ、スムーズに発表を開始できます。
* **柔軟なコントロール**: 「スタート／一時停止」のトグル機能や「リセット」機能を備えており、発表中のトラブルなどによる一時中断にも対応可能です。

---

## 🛠 技術スタック (Tech Stack)

外部依存はスタイリング用のTailwind CSS（CDN）のみ。単一のHTMLファイルで完結しています。

* **HTML5**
* **Vanilla JavaScript** (ES6+, `setInterval`, DOM操作)
* **[Tailwind CSS](https://tailwindcss.com/)** (CDN経由のスタイリング)
* **Web APIs**: `Web Audio API` (`AudioContext` を用いた動的なビープ音生成)

---

## 📖 セットアップ・使い方 (Getting Started / Usage)

ビルド環境やローカルサーバーは不要です。

1. **起動する**
   リポジトリから `index.html` をダウンロードし、Google Chrome、Safari、Edgeなどのモダンブラウザで開きます。
2. **タイマーを開始する**
   画面中央の「5分タイマーを開始 (3分で通知)」ボタンをクリックすると、即座に5分からのカウントダウンが開始されます。
   > **💡 Tip:** 発表の途中で止めたい場合は「一時停止」ボタンを、最初からやり直したい場合は「リセット」ボタンをクリックしてください。
3. **音量の確認**
   通知音はブラウザのWeb Audio APIを利用して鳴るため、事前にPC本体とブラウザの音量がオンになっていることを確認してください。

---

## 📂 ディレクトリ構造 (Project Structure)

```text
.
├── index.html    # アプリケーション本体（HTML / Tailwind / JSロジックを全て内包）
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
