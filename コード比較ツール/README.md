# コード差分チェッカー

> 2つのコードの変更点を視覚的に分かりやすく比較できる、Monaco Editor搭載のブラウザベース差分確認ツールです。
> 
> 

[デモURL](https://www.google.com/search?q=https://...) | [リポジトリURL](https://www.google.com/search?q=https://github.com/...)

---

## 🚀 主な機能 (Features)

* **高機能なコード比較:** VS Codeのコアエディタとしても知られる `Monaco Editor` を採用し、直感的なUIでコードの差分をハイライト表示します。


* **サイドバイサイド表示:** 変更前と変更後のコードを左右に並べて比較できる分割表示に対応しています。


* **リアルタイム編集対応:** 左側のエディタ領域（オリジナルコード）は直接編集が可能で、動的に差分をチェックできます。


* **ワンクリックリセット機能:** 「サンプルコードをリセット」ボタンを押すことで、組み込まれたJavaScriptのサンプルテキストをいつでも呼び出せます。



---

## 🛠 技術スタック (Tech Stack)

* **フロントエンド:** HTML5, CSS3, Vanilla JavaScript


* **エディタライブラリ:** [Monaco Editor](https://www.google.com/search?q=https://microsoft.github.io/monaco-editor/) (CDN経由で読み込み)


* **依存関係:** 外部のバックエンドサーバーなどを必要とせず、ブラウザのみで動作します（※CDNを利用するためインターネット接続環境が必要です）。



---

## 📦 セットアップ・使い方 (Getting Started / Usage)

特別なビルド環境やローカルサーバーの構築は不要です。

1. 本リポジトリをローカルにクローンするか、`index.html` ファイルをダウンロードします。
2. ダウンロードした `index.html` をお好みのWebブラウザ（Chrome, Edge, Safariなど）で開きます。
3. 画面上にエディタが表示されたら、左右のパネルに比較したいコードを貼り付けて差分を確認してください。
4. 初期状態に戻したい場合は、画面上部の「サンプルコードをリセット」ボタンをクリックします。



---

## 📁 ディレクトリ構造 (Project Structure)

```text
.
├── index.html  # UI構造、スタイル定義、Monaco Editorの初期化ロジックをすべて内包する単一ファイル
└── README.md   # 本ドキュメント

```

---

## 👤 作者 (Author)

**[ユーザー名]**

* GitHub: [@ユーザー名](https://www.google.com/search?q=https://github.com/...)

## 📄 ライセンス (License)

This project is licensed under the [MIT License](https://www.google.com/search?q=https://...).