# PlanCraft 📝[cite: 2]

[![Demo](https://img.shields.io/badge/Demo-Live_Preview-ember?style=for-the-badge)]([デモURLをここに入力])
[![Repo](https://img.shields.io/badge/GitHub-Repository-gray?style=for-the-badge)]([リポジトリURLをここに入力])
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]([ライセンスURLをここに入力])

> **アイデアを、一枚の企画書へ。**
ビジネス・サービス・マーケティング・採用など、あらゆるシーンに対応したプロ仕様のテンプレートで企画書をすばやく作成できるWebアプリケーションです。アカウント登録は一切不要で、データはすべてオフライン（ブラウザ）に安全に保存されます。

## ✨ 主な機能（Features）

* **🎯 豊富なテンプレート**: 新規事業計画、Webサービス企画、学生の部活企画、フリーランスの提案書など、11カテゴリ・37種類の目的に合わせたテンプレートを収録しています[cite: 1]。
* **💾 アカウント不要・自動保存**: サーバーとの通信を行わず、入力したデータはリアルタイムでブラウザの `LocalStorage` に自動保存されます[cite: 2, 3]。ページを閉じても作業を再開できます[cite: 2]。
* **✏️ 直感的なドキュメントエディタ**: セクションの追加・削除・並び替え（↑↓）が自由に行えます[cite: 2, 3]。入力進捗（%）や文字数カウント機能により、モチベーションを維持しながら執筆できます[cite: 3]。
* **🖨️ プレビュー＆エクスポート**: 入力した内容は美しくフォーマットされたプレビュー画面で確認でき、そのまま印刷やPDF保存が可能です[cite: 2, 3]。GitHub等で使えるMarkdown形式でのコピーにも対応しています[cite: 3]。
* **📱 レスポンシブ対応**: PCだけでなく、スマートフォンやタブレットからでも快適に閲覧・編集ができるレスポンシブデザインを採用しています[cite: 2, 4]。

## 🛠 技術スタック（Tech Stack）

複雑なフレームワークやビルドツールに依存しない、ピュアで軽量なWeb標準技術のみで構築されています。

* **Frontend**: HTML5, CSS3, Vanilla JavaScript[cite: 2, 3, 4]
* **Storage**: Local Storage API (`plancraft_docs_v1`)[cite: 3]
* **Design & UI**: 
  * カスタムCSS設計（CSS Variablesを活用した白基調＋エンバーオレンジのアクセント）[cite: 4]
  * **Fonts**: Shippori Mincho (見出し), DM Sans (UI), JetBrains Mono (等幅)[cite: 4]

## 🚀 セットアップ・使い方（Getting Started / Usage）

このプロジェクトは静的なファイルのみで構成されているため、ビルド環境やローカルサーバーの構築は不要です。

1. **リポジトリのクローン**
   ```bash
   git clone [リポジトリURLをここに入力]
   cd plancraft

```

2. **アプリの起動**
* ダウンロードしたフォルダ内にある `index.html` をお使いのWebブラウザ（Chrome, Safari, Edgeなど）でダブルクリックして開くだけで、すぐに利用を開始できます。


* *(任意)* 拡張機能の Live Server (VSCode) などを利用してローカルサーバーでホストすることも可能です。


3. **使い方**
* トップページの「テンプレートから始める」をクリックし、用途に合ったテンプレートを選択します。


* エディタ画面で各セクションのプレースホルダーに沿ってテキストを入力します。


* 右上の「👁 プレビュー」ボタンを押し、「🖨 印刷 / PDF保存」または「📋 Markdownコピー」から出力します。





## 📂 ディレクトリ構造（Project Structure）

```text
plancraft/
├── index.html     # アプリケーションのメインHTML (UI構造/各ビューの定義)[cite: 2]
├── style.css      # スタイルシート (CSS変数、レスポンシブ、デザインシステム)[cite: 4]
├── script.js      # アプリケーションロジック (状態管理、DOM操作、ストレージ処理)[cite: 3]
└── templates.js   # テンプレートデータ (11カテゴリ/37種類の企画書定義オブジェクト)[cite: 1]

```

## 📄 ライセンス・作者 (License & Author)

* **Author**: [あなたの名前/ユーザー名](https://www.google.com/search?q=%5B%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA%E3%82%84GitHub%E3%81%AEURL%5D)
* **License**: このプロジェクトは [MIT License](https://www.google.com/search?q=%5B%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%5D) の下で公開されています。

```

```