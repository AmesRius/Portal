# Markdown File Tree Generator[cite: 2]

> インデントされたテキストやGitHubリポジトリのURLから、美しく見やすいMarkdown形式のディレクトリツリー（`├──` や `└──` を使用した構造）を瞬時に自動生成するブラウザツールです[cite: 2]。

[デモを見る](https://...) | [リポジトリ](https://github.com/...)

---

## ✨ 主な機能 (Features)

* **リアルタイム変換機能**: 左側のテキストエリアにインデント（スペースまたはタブ）付きのテキストを入力すると、即座に右側のパネルへMarkdownのツリー構造として出力されます[cite: 2]。
* **GitHubリポジトリ連携**: GitHubのリポジトリURL（例: `facebook/react`）を入力すると、GitHub API経由で自動的にディレクトリ構造を取得し、ツリー化します[cite: 2]。
* **直感的なUIとリサイズ機能**: 入力パネルと出力パネルの間に配置されたリサイズバー（スプリッター）をドラッグして、好みの幅に画面を調整できます[cite: 2]。
* **集中できる最大化モード**: 入力に集中したい場合、「最大化」ボタンで入力エリアのみを全画面表示に切り替えることが可能です[cite: 2]。
* **優れたエディタ体験**: テキストエリア内での `Tab` キーによるインデント入力に対応しているほか、ワンクリックで結果をクリップボードにコピーできる機能や、すぐに試せるサンプル読み込み機能を備えています[cite: 2]。

---

## 🛠 技術スタック (Tech Stack)

* **フロントエンド**: HTML5, CSS3, Vanilla JavaScript[cite: 2]
* **外部API**: GitHub REST API (リポジトリのファイルツリー取得用)[cite: 2]
* **依存関係なし**: 外部ライブラリ（ReactやVueなど）を一切使用せず、単一のファイルで動作する軽量な設計です[cite: 2]。

---

## 🚀 セットアップ・使い方 (Getting Started)

特別なビルドツールやローカルサーバーの構築は不要です。

1. 本リポジトリをローカルにクローン、または `index.html` をダウンロードします。
2. ダウンロードした `index.html` をお好みのWebブラウザで開きます[cite: 2]。
3. **テキストから生成する場合**: 左側の「入力」パネルに、インデントで階層を表現したテキストを入力します[cite: 2]。
4. **GitHubから生成する場合**: 画面上部の入力欄にGitHub URLを入力し、「GitHubから取得」ボタンをクリックします[cite: 2]。
5. 右側の「出力」パネルに表示された結果を、「コードをコピー」ボタンで取得して README などに貼り付けます[cite: 2]。

---

## 📁 ディレクトリ構造 (Project Structure)

```text
.
├── index.html  # HTMLの構造、CSSスタイル、ツリー変換およびAPI連携のJavaScriptロジックをすべて内包するメインファイル[cite: 2]
└── README.md   # 本ドキュメント

```

---

## 👤 作者 (Author)

**[あなたの名前/ユーザー名]**

* GitHub: [@ユーザー名](https://www.google.com/search?q=https://github.com/...)
* Twitter: [@ユーザー名](https://www.google.com/search?q=https://twitter.com/...)

## 📄 ライセンス (License)

This project is licensed under the [MIT License](https://www.google.com/search?q=https://...).
