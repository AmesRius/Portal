# Web Design & Prompt Gallery[cite: 3]

> JSONデータからデザイン図鑑を自動生成する、プロンプトとプレビューのギャラリーサイトです[cite: 3]。AIで生成したデザインとそのプロンプトを管理・展示する用途に最適です[cite: 3]。

[デモを見る](https://...) | [リポジトリ](https://github.com/...)

---

## 🚀 主な機能 (Features)

* **動的なデータ読み込み**: `designs.json` ファイルからデザインデータを非同期で取得し、カード型のギャラリーを自動構築します[cite: 3]。
* **レスポンシブなプレビュー機能**: 1280x720pxのPCサイズを前提としたHTMLソースを `iframe` に展開し、画面幅に合わせて自動的に縮小（スケール）させてカード内に収めます[cite: 3]。
* **プレビューの最適化**: プレビュー用のHTMLへ強制的に `overflow: hidden !important` などのCSSを注入し、不必要なスクロールバーを消去して美しいサムネイルを維持します[cite: 3]。
* **詳細メタデータの表示**: カラー構成、角丸・シェイプ、トーン感、ジャンルといったデザインの細かな属性情報を一覧表示します[cite: 3]。
* **プロンプトのトグル表示**: 「プロンプトを見る」ボタンをクリックすると、アコーディオン形式でデザイン生成時のテキストプロンプトを確認できます[cite: 3]。

---

## 🛠 技術スタック (Tech Stack)

* **HTML5**: セマンティックなマークアップおよび、プレビューを安全に表示するための `iframe (srcdoc)` の利用[cite: 3]。
* **CSS3**: カスタムプロパティ（CSS変数）、CSS Grid、Flexboxを活用したモダンでクリーンなUI設計[cite: 3]。
* **Vanilla JavaScript (ES6+)**: Fetch APIによるデータ取得、非同期処理、DOM操作、およびウィンドウリサイズイベントに連動したiframeの動的スケール調整処理[cite: 3]。
* **依存関係なし**: 外部ライブラリを使用せず、軽量で高速に動作します[cite: 3]。

---

## 📦 セットアップ・使い方 (Getting Started)

1. 本リポジトリをクローン、またはダウンロードして任意のディレクトリに配置します。
2. 同一ディレクトリに、ギャラリーのデータソースとなる `designs.json` ファイルを用意します（必要なキー：`title`, `preview_html`, `details.color`, `details.shape`, `details.tone`, `details.genre`, `prompt`）[cite: 3]。
3. Fetch APIを使用してJSONを読み込むため、ローカルサーバーを立ち上げます[cite: 3]。
   * 例: VSCodeの拡張機能「Live Server」を使用する。
   * 例: ターミナルでディレクトリに移動し、`python3 -m http.server` または `npx serve` を実行する。
4. ブラウザでローカルサーバーのURL（例: `http://localhost:8000/index.html`）にアクセスします。

---

## 📁 ディレクトリ構造 (Project Structure)

```text
.
├── index.html      # ギャラリーのUIとロジックを内包するメインファイル[cite: 3]
├── designs.json    # デザイン情報を格納したデータファイル（自身で作成して配置）[cite: 3]
└── README.md       # 本ドキュメント

```

---

## 👤 作者 (Author)

**[あなたの名前 / ユーザー名]**

* GitHub: [@username](https://www.google.com/search?q=https://github.com/...)
* Twitter: [@username](https://www.google.com/search?q=https://twitter.com/...)
* Portfolio: [https://...](https://www.google.com/search?q=https://...)

## 📄 ライセンス (License)

This project is licensed under the [MIT License](https://www.google.com/search?q=https://...).
