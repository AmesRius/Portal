// PlanCraft — テンプレート定義データ (templates.js)
// 11カテゴリ・37テンプレート

window.PLANCRAFT_TEMPLATES = [

  // ─────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────
  {
    id: 'new-business',
    category: 'business',
    categoryLabel: 'ビジネス',
    icon: '🏢',
    name: '新規事業企画書',
    description: '社内・社外向けの新規事業を立案するための標準的な企画書フォーマット',
    color: '#1a1a2e',
    sections: [
      { id: 's1', title: 'エグゼクティブサマリー', type: 'text', placeholder: '事業の概要・目的・期待効果を3〜5行で簡潔にまとめてください。', content: '' },
      { id: 's2', title: '事業概要', type: 'text', placeholder: '提供するサービス・商品の概要、ビジネスモデルを記述してください。', content: '' },
      { id: 's3', title: '市場環境・課題分析', type: 'text', placeholder: 'ターゲット市場の規模、競合状況、解決すべき課題を記述してください。', content: '' },
      { id: 's4', title: '解決策・バリュープロポジション', type: 'text', placeholder: '自社ならではの解決策と、顧客への価値提供を記述してください。', content: '' },
      { id: 's5', title: 'ターゲット顧客', type: 'text', placeholder: '主要顧客層のペルソナ、ニーズ、獲得チャネルを記述してください。', content: '' },
      { id: 's6', title: '収益モデル', type: 'text', placeholder: '収益の仕組み、価格設定、収益目標を記述してください。', content: '' },
      { id: 's7', title: '実施スケジュール', type: 'text', placeholder: 'フェーズ別の実施計画・マイルストーンを記述してください。', content: '' },
      { id: 's8', title: '必要リソース・予算', type: 'text', placeholder: '人員・設備・資金調達計画を記述してください。', content: '' },
      { id: 's9', title: 'リスクと対応策', type: 'text', placeholder: '想定されるリスクと、その対処方法を記述してください。', content: '' },
    ]
  },

  {
    id: 'startup-plan',
    category: 'business',
    categoryLabel: 'ビジネス',
    icon: '🚀',
    name: 'スタートアップ事業計画',
    description: '起業・スタートアップ向けのリーンな事業計画書',
    color: '#16213e',
    sections: [
      { id: 's1', title: 'ミッション・ビジョン', type: 'text', placeholder: '会社のミッションとビジョンを記述してください。', content: '' },
      { id: 's2', title: 'プロダクト概要', type: 'text', placeholder: '何を作るのか、どんな問題を解決するのかを記述してください。', content: '' },
      { id: 's3', title: '顧客・市場規模（TAM/SAM/SOM）', type: 'text', placeholder: 'ターゲット市場の規模と獲得可能な市場規模を記述してください。', content: '' },
      { id: 's4', title: 'なぜ今か・競合優位性', type: 'text', placeholder: 'このタイミングで始める理由と、競合との差別化を記述してください。', content: '' },
      { id: 's5', title: 'ビジネスモデル', type: 'text', placeholder: 'どのように収益を上げるかを記述してください。', content: '' },
      { id: 's6', title: 'トラクション・実績', type: 'text', placeholder: '現在の進捗・KPI・ユーザー数など実績を記述してください。', content: '' },
      { id: 's7', title: 'チーム', type: 'text', placeholder: '創業メンバーのプロフィールと役割を記述してください。', content: '' },
      { id: 's8', title: '資金調達計画・用途', type: 'text', placeholder: '調達希望額と資金用途を記述してください。', content: '' },
    ]
  },

  {
    id: 'pitch-deck',
    category: 'business',
    categoryLabel: 'ビジネス',
    icon: '📊',
    name: 'VCピッチデック',
    description: '投資家向けピッチ資料の構成。要点を絞ったシャープな構成',
    color: '#0f3460',
    sections: [
      { id: 's1', title: '課題（Problem）', type: 'text', placeholder: '解決する課題の深刻さ・規模を具体的に記述してください。', content: '' },
      { id: 's2', title: '解決策（Solution）', type: 'text', placeholder: '自社プロダクトがどのように課題を解決するかを記述してください。', content: '' },
      { id: 's3', title: '市場機会（Market Opportunity）', type: 'text', placeholder: 'TAM・SAM・SOM と市場の成長性を記述してください。', content: '' },
      { id: 's4', title: 'プロダクト（Product）', type: 'text', placeholder: 'プロダクトの特徴・スクリーンショット・デモへのリンクを記述してください。', content: '' },
      { id: 's5', title: 'ビジネスモデル（Business Model）', type: 'text', placeholder: '収益モデル・単価・LTV・CAC を記述してください。', content: '' },
      { id: 's6', title: 'トラクション（Traction）', type: 'text', placeholder: 'ユーザー数・MRR・成長率などの数値を記述してください。', content: '' },
      { id: 's7', title: '競合（Competition）', type: 'text', placeholder: '競合比較マップ・差別化ポイントを記述してください。', content: '' },
      { id: 's8', title: 'チーム（Team）', type: 'text', placeholder: '創業者・CTOなどキーパーソンの経歴を記述してください。', content: '' },
      { id: 's9', title: '資金調達（The Ask）', type: 'text', placeholder: '調達額・バリュエーション・資金用途を記述してください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // SERVICE
  // ─────────────────────────────────────────
  {
    id: 'web-service',
    category: 'service',
    categoryLabel: 'サービス',
    icon: '🌐',
    name: 'Webサービス企画書',
    description: 'Webサービスの新規立ち上げに必要な企画書テンプレート',
    color: '#1b4332',
    sections: [
      { id: 's1', title: 'サービス概要', type: 'text', placeholder: 'サービス名・コンセプト・ターゲットユーザーを記述してください。', content: '' },
      { id: 's2', title: '解決する課題', type: 'text', placeholder: 'ユーザーが抱える課題とペインポイントを記述してください。', content: '' },
      { id: 's3', title: '主要機能・特徴', type: 'text', placeholder: 'コア機能一覧と各機能の概要を記述してください。', content: '' },
      { id: 's4', title: 'ユーザーフロー', type: 'text', placeholder: 'ユーザーがサービスを使う一連の流れを記述してください。', content: '' },
      { id: 's5', title: '技術スタック', type: 'text', placeholder: 'フロントエンド・バックエンド・インフラの技術選定を記述してください。', content: '' },
      { id: 's6', title: 'マネタイズ計画', type: 'text', placeholder: '収益モデル・料金プランを記述してください。', content: '' },
      { id: 's7', title: '開発ロードマップ', type: 'text', placeholder: 'フェーズ別の機能リリース計画を記述してください。', content: '' },
      { id: 's8', title: 'KPI・成功指標', type: 'text', placeholder: '測定するKPIとその目標値を記述してください。', content: '' },
    ]
  },

  {
    id: 'app-plan',
    category: 'service',
    categoryLabel: 'サービス',
    icon: '📱',
    name: 'アプリ企画書',
    description: 'iOS/Androidアプリの企画・提案向けテンプレート',
    color: '#134e4a',
    sections: [
      { id: 's1', title: 'アプリ概要', type: 'text', placeholder: 'アプリ名・カテゴリ・対応OS・コンセプトを記述してください。', content: '' },
      { id: 's2', title: 'ターゲットユーザー', type: 'text', placeholder: 'メインユーザー層と利用シーンを記述してください。', content: '' },
      { id: 's3', title: 'コア機能', type: 'text', placeholder: 'MVPに含める主要機能を記述してください。', content: '' },
      { id: 's4', title: 'UI/UXコンセプト', type: 'text', placeholder: 'デザイン方針・参考アプリ・UI概要を記述してください。', content: '' },
      { id: 's5', title: '競合分析', type: 'text', placeholder: '主要競合アプリとの比較・差別化ポイントを記述してください。', content: '' },
      { id: 's6', title: 'マネタイズ', type: 'text', placeholder: '課金モデル（無料/有料/サブスク/広告）を記述してください。', content: '' },
      { id: 's7', title: '開発体制・スケジュール', type: 'text', placeholder: '開発チーム構成とリリーススケジュールを記述してください。', content: '' },
    ]
  },

  {
    id: 'saas-plan',
    category: 'service',
    categoryLabel: 'サービス',
    icon: '☁️',
    name: 'SaaS事業計画書',
    description: 'BtoB SaaSプロダクトの事業計画・提案向けテンプレート',
    color: '#1e3a5f',
    sections: [
      { id: 's1', title: 'プロダクト概要', type: 'text', placeholder: 'SaaSのカテゴリ・解決する業務課題を記述してください。', content: '' },
      { id: 's2', title: 'ターゲット企業・ペルソナ', type: 'text', placeholder: '業種・規模・担当者ペルソナを記述してください。', content: '' },
      { id: 's3', title: '機能一覧', type: 'text', placeholder: 'コア機能・オプション機能・将来ロードマップを記述してください。', content: '' },
      { id: 's4', title: '料金プラン', type: 'text', placeholder: 'プランごとの料金・機能制限・想定ARRを記述してください。', content: '' },
      { id: 's5', title: 'セールス・マーケ戦略', type: 'text', placeholder: '獲得チャネル・インサイドセールス・CSM体制を記述してください。', content: '' },
      { id: 's6', title: '財務計画（3ヵ年）', type: 'text', placeholder: 'MRR・ARR目標・チャーンレート・LTV/CAC比を記述してください。', content: '' },
      { id: 's7', title: '競合・市場ポジション', type: 'text', placeholder: '主要競合との比較表・独自ポジションを記述してください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // MARKETING
  // ─────────────────────────────────────────
  {
    id: 'promotion',
    category: 'marketing',
    categoryLabel: 'マーケティング',
    icon: '📣',
    name: 'プロモーション企画書',
    description: '商品・サービスのプロモーション施策を立案するテンプレート',
    color: '#4a0e2d',
    sections: [
      { id: 's1', title: '企画概要・目的', type: 'text', placeholder: 'プロモーションの目的・KGI・ターゲットを記述してください。', content: '' },
      { id: 's2', title: 'ターゲット設定', type: 'text', placeholder: 'メインターゲットのペルソナと行動パターンを記述してください。', content: '' },
      { id: 's3', title: 'プロモーション施策', type: 'text', placeholder: 'Web広告・SNS・PR・OOH など施策の詳細を記述してください。', content: '' },
      { id: 's4', title: 'クリエイティブ方針', type: 'text', placeholder: 'トーン＆マナー・ビジュアル方針・コピーの方向性を記述してください。', content: '' },
      { id: 's5', title: 'スケジュール・予算配分', type: 'text', placeholder: '施策ごとの予算配分とスケジュールを記述してください。', content: '' },
      { id: 's6', title: 'KPI・効果測定', type: 'text', placeholder: '測定指標・計測方法・評価基準を記述してください。', content: '' },
    ]
  },

  {
    id: 'sns-campaign',
    category: 'marketing',
    categoryLabel: 'マーケティング',
    icon: '📸',
    name: 'SNSキャンペーン企画',
    description: 'X/Instagram/TikTok等のSNSキャンペーンを立案するテンプレート',
    color: '#3d1a6e',
    sections: [
      { id: 's1', title: 'キャンペーン概要', type: 'text', placeholder: 'キャンペーン名・目的・実施プラットフォームを記述してください。', content: '' },
      { id: 's2', title: 'ターゲット・インサイト', type: 'text', placeholder: 'ターゲット層のSNS利用習慣・インサイトを記述してください。', content: '' },
      { id: 's3', title: 'キャンペーン施策', type: 'text', placeholder: 'ハッシュタグ・UGC・インフルエンサー等の施策詳細を記述してください。', content: '' },
      { id: 's4', title: 'コンテンツ計画', type: 'text', placeholder: '投稿スケジュール・コンテンツ種別・クリエイティブ要件を記述してください。', content: '' },
      { id: 's5', title: '予算・KPI', type: 'text', placeholder: '予算とインプレッション・エンゲージメント目標を記述してください。', content: '' },
    ]
  },

  {
    id: 'content-strategy',
    category: 'marketing',
    categoryLabel: 'マーケティング',
    icon: '✍️',
    name: 'コンテンツ戦略書',
    description: 'オウンドメディア・コンテンツマーケティングの戦略立案テンプレート',
    color: '#2d4a1e',
    sections: [
      { id: 's1', title: '戦略概要・目的', type: 'text', placeholder: 'コンテンツマーケティングの目的・ゴールを記述してください。', content: '' },
      { id: 's2', title: 'ターゲットペルソナ', type: 'text', placeholder: 'コンテンツを届けるターゲットのペルソナを記述してください。', content: '' },
      { id: 's3', title: 'コンテンツ方針・トーン', type: 'text', placeholder: 'ブランドボイス・トーン＆マナー・NGワードを記述してください。', content: '' },
      { id: 's4', title: 'チャネル戦略', type: 'text', placeholder: 'ブログ・SNS・メルマガ等チャネルごとの役割を記述してください。', content: '' },
      { id: 's5', title: 'コンテンツカレンダー', type: 'text', placeholder: '月別・テーマ別の配信計画を記述してください。', content: '' },
      { id: 's6', title: 'KPI・効果測定', type: 'text', placeholder: 'PV・CV・エンゲージメント等の目標値を記述してください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // HR
  // ─────────────────────────────────────────
  {
    id: 'hiring-plan',
    category: 'hr',
    categoryLabel: '採用・HR',
    icon: '👥',
    name: '採用計画書',
    description: '年間採用計画・採用戦略を立案するためのテンプレート',
    color: '#1a3a4a',
    sections: [
      { id: 's1', title: '採用背景・目的', type: 'text', placeholder: '採用の背景・事業計画との連動・採用目的を記述してください。', content: '' },
      { id: 's2', title: '採用ポジション一覧', type: 'text', placeholder: '採用するポジション・人数・優先度を記述してください。', content: '' },
      { id: 's3', title: '採用ターゲット・ペルソナ', type: 'text', placeholder: '理想の候補者像・スキル要件・カルチャーフィットを記述してください。', content: '' },
      { id: 's4', title: '採用チャネル・手法', type: 'text', placeholder: '求人媒体・エージェント・リファラル・スカウト戦略を記述してください。', content: '' },
      { id: 's5', title: '選考プロセス', type: 'text', placeholder: '書類→面接→内定までのステップと評価基準を記述してください。', content: '' },
      { id: 's6', title: '採用予算・ROI', type: 'text', placeholder: 'チャネル別予算・採用単価目標を記述してください。', content: '' },
      { id: 's7', title: 'スケジュール', type: 'text', placeholder: '採用開始〜入社までの月別スケジュールを記述してください。', content: '' },
    ]
  },

  {
    id: 'training-plan',
    category: 'hr',
    categoryLabel: '採用・HR',
    icon: '🎓',
    name: '研修プログラム企画書',
    description: '社員研修・人材育成プログラムの設計テンプレート',
    color: '#2a1a4a',
    sections: [
      { id: 's1', title: '研修概要・目的', type: 'text', placeholder: '研修の目的・背景・期待する成果を記述してください。', content: '' },
      { id: 's2', title: '対象者・人数', type: 'text', placeholder: '受講対象者の層・人数・受講条件を記述してください。', content: '' },
      { id: 's3', title: 'カリキュラム設計', type: 'text', placeholder: 'セッション別の内容・時間・学習目標を記述してください。', content: '' },
      { id: 's4', title: '実施形式・ツール', type: 'text', placeholder: '集合研修・オンライン・OJTの組み合わせを記述してください。', content: '' },
      { id: 's5', title: '講師・ファシリテーター', type: 'text', placeholder: '内部講師・外部講師の役割分担を記述してください。', content: '' },
      { id: 's6', title: '効果測定・フォロー', type: 'text', placeholder: '研修効果の測定方法・フォローアップ施策を記述してください。', content: '' },
      { id: 's7', title: '予算・スケジュール', type: 'text', placeholder: '予算内訳と実施スケジュールを記述してください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // STORE
  // ─────────────────────────────────────────
  {
    id: 'restaurant-plan',
    category: 'store',
    categoryLabel: '店舗・実店舗',
    icon: '🍽️',
    name: '飲食店開業計画書',
    description: 'レストラン・カフェ等の開業に必要な事業計画テンプレート',
    color: '#4a2a0a',
    sections: [
      { id: 's1', title: '店舗コンセプト', type: 'text', placeholder: '店名・コンセプト・提供する料理・雰囲気を記述してください。', content: '' },
      { id: 's2', title: '立地・物件計画', type: 'text', placeholder: '出店エリア・物件条件・坪数・賃料を記述してください。', content: '' },
      { id: 's3', title: 'ターゲット顧客', type: 'text', placeholder: '想定顧客層・客単価・席数・回転数を記述してください。', content: '' },
      { id: 's4', title: 'メニュー・価格設定', type: 'text', placeholder: 'メニュー構成・原価率・価格帯を記述してください。', content: '' },
      { id: 's5', title: '内装・設備計画', type: 'text', placeholder: '内装コンセプト・厨房設備・初期投資額を記述してください。', content: '' },
      { id: 's6', title: '収支計画', type: 'text', placeholder: '月次売上目標・固定費・損益分岐点を記述してください。', content: '' },
      { id: 's7', title: '集客・マーケティング', type: 'text', placeholder: 'オープン告知・SNS戦略・リピーター施策を記述してください。', content: '' },
      { id: 's8', title: '開業スケジュール', type: 'text', placeholder: '物件契約〜オープンまでのスケジュールを記述してください。', content: '' },
    ]
  },

  {
    id: 'retail-plan',
    category: 'store',
    categoryLabel: '店舗・実店舗',
    icon: '🛒',
    name: '小売店舗企画書',
    description: '小売店・専門店の出店企画・新店舗立案テンプレート',
    color: '#3a1a0a',
    sections: [
      { id: 's1', title: '店舗コンセプト', type: 'text', placeholder: '店名・取り扱い商品・コンセプト・ブランドポジションを記述してください。', content: '' },
      { id: 's2', title: '商圏・立地分析', type: 'text', placeholder: '出店エリアの商圏調査・競合分析・来店動線を記述してください。', content: '' },
      { id: 's3', title: '商品・MD計画', type: 'text', placeholder: '品揃え方針・プライスゾーン・粗利設計を記述してください。', content: '' },
      { id: 's4', title: '店舗設計・VMD', type: 'text', placeholder: 'レイアウト・ディスプレイ・導線設計の方針を記述してください。', content: '' },
      { id: 's5', title: '収支計画', type: 'text', placeholder: '売上目標・固定費・損益分岐点・投資回収計画を記述してください。', content: '' },
      { id: 's6', title: '販促・CRM計画', type: 'text', placeholder: 'チラシ・SNS・ポイント施策・リピーター育成を記述してください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // INTERNAL
  // ─────────────────────────────────────────
  {
    id: 'improvement',
    category: 'internal',
    categoryLabel: '社内提案',
    icon: '💡',
    name: '社内改善提案書',
    description: '業務効率化・社内課題解決のための提案書テンプレート',
    color: '#1a2a1a',
    sections: [
      { id: 's1', title: '提案の背景・問題定義', type: 'text', placeholder: '現状の課題・問題の深刻さ・発生頻度を記述してください。', content: '' },
      { id: 's2', title: '提案内容', type: 'text', placeholder: '具体的な改善案・変更内容を記述してください。', content: '' },
      { id: 's3', title: '期待効果', type: 'text', placeholder: '改善により得られる効果・数値目標を記述してください。', content: '' },
      { id: 's4', title: '実施方法・ステップ', type: 'text', placeholder: '具体的な実施手順・責任者・スケジュールを記述してください。', content: '' },
      { id: 's5', title: '必要コスト・リソース', type: 'text', placeholder: '費用・工数・必要な社内承認を記述してください。', content: '' },
      { id: 's6', title: 'リスク・懸念事項', type: 'text', placeholder: '想定されるリスクと対応策を記述してください。', content: '' },
    ]
  },

  {
    id: 'dx-plan',
    category: 'internal',
    categoryLabel: '社内提案',
    icon: '💻',
    name: 'DX推進企画書',
    description: 'デジタルトランスフォーメーション推進のための企画書テンプレート',
    color: '#0a1a2a',
    sections: [
      { id: 's1', title: 'DX推進の目的・背景', type: 'text', placeholder: 'DX推進が必要な理由・経営課題との連動を記述してください。', content: '' },
      { id: 's2', title: 'As-Is（現状）分析', type: 'text', placeholder: '現行業務プロセス・システム・課題を記述してください。', content: '' },
      { id: 's3', title: 'To-Be（目指す姿）', type: 'text', placeholder: 'DX後の業務フロー・データ活用の姿を記述してください。', content: '' },
      { id: 's4', title: '推進施策・システム導入計画', type: 'text', placeholder: '導入するシステム・ツール・改革施策を記述してください。', content: '' },
      { id: 's5', title: '推進体制・人材', type: 'text', placeholder: 'CDO・推進チーム体制・外部パートナーを記述してください。', content: '' },
      { id: 's6', title: '投資対効果（ROI）', type: 'text', placeholder: '初期投資額・期待ROI・投資回収期間を記述してください。', content: '' },
      { id: 's7', title: 'ロードマップ', type: 'text', placeholder: 'フェーズ別のDX推進ロードマップを記述してください。', content: '' },
    ]
  },

  {
    id: 'cost-reduction',
    category: 'internal',
    categoryLabel: '社内提案',
    icon: '💰',
    name: 'コスト削減提案書',
    description: '経費削減・業務効率化によるコスト最適化の提案書テンプレート',
    color: '#1a1a0a',
    sections: [
      { id: 's1', title: '提案概要・目標削減額', type: 'text', placeholder: '削減対象コスト・目標削減額・期間を記述してください。', content: '' },
      { id: 's2', title: '現状コスト分析', type: 'text', placeholder: '現在のコスト構造・問題箇所の特定を記述してください。', content: '' },
      { id: 's3', title: '削減施策一覧', type: 'text', placeholder: '具体的な削減施策・担当部署・削減見込み額を記述してください。', content: '' },
      { id: 's4', title: '実施スケジュール', type: 'text', placeholder: '施策ごとの実施時期・担当者を記述してください。', content: '' },
      { id: 's5', title: 'リスク・影響評価', type: 'text', placeholder: 'コスト削減による業務・品質への影響を記述してください。', content: '' },
      { id: 's6', title: '効果測定・モニタリング', type: 'text', placeholder: '削減効果の測定方法・レポーティング体制を記述してください。', content: '' },
    ]
  },


  // ─────────────────────────────────────────
  // STUDENT（学生向け）
  // ─────────────────────────────────────────
  {
    id: 'club-activity',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '⚽',
    name: '部活・サークル企画書',
    description: '文化祭・合宿・大会参加・新歓など、部活・サークルの活動企画に使えるテンプレート',
    color: '#0e2a1a',
    sections: [
      { id: 's1', title: '企画タイトル・概要', type: 'text', placeholder: '例）第○○回文化祭ライブ企画 / 春合宿 / 新歓BBQ など、企画の名前と一言説明を書いてください。', content: '' },
      { id: 's2', title: '目的・ねらい', type: 'text', placeholder: 'この企画を通じて何を達成したいか書いてください。\n例）部員の親睦を深める、技術向上、新入部員の確保 など', content: '' },
      { id: 's3', title: '日時・場所', type: 'text', placeholder: '開催日時・会場（または会場候補）を書いてください。\n例）2026年5月3日（土）13:00〜17:00 / ○○体育館', content: '' },
      { id: 's4', title: '参加対象・人数', type: 'text', placeholder: '参加する人（部員全員・学年限定・外部招待なども）と人数の見込みを書いてください。', content: '' },
      { id: 's5', title: 'プログラム・スケジュール', type: 'text', placeholder: '当日のタイムスケジュールや、準備フェーズの流れを書いてください。\n例）13:00 開会 → 13:30 活動① → … → 17:00 解散', content: '' },
      { id: 's6', title: '役割分担', type: 'text', placeholder: '担当ごとに誰が何をするか書いてください。\n例）リーダー: ○○ / 会計: △△ / 広報: □□', content: '' },
      { id: 's7', title: '予算計画', type: 'text', placeholder: '必要な費用の内訳と合計を書いてください。\n例）会場費 ○○円 / 備品 ○○円 / 飲食費 ○○円 → 合計 ○○円（一人当たり ○○円）', content: '' },
      { id: 's8', title: '準備スケジュール・TODO', type: 'text', placeholder: '企画実施までにやること・締め切りを書いてください。\n例）4/1 会場予約完了 / 4/10 参加者確定 / 4/20 物品購入', content: '' },
    ]
  },

  {
    id: 'school-event',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🎪',
    name: '文化祭・学校行事企画書',
    description: '文化祭の出し物・展示・模擬店など学校行事の企画立案に使えるテンプレート',
    color: '#2a0e2a',
    sections: [
      { id: 's1', title: '企画名・出し物の概要', type: 'text', placeholder: '出し物や展示のタイトルと、どんな内容かを簡単に説明してください。\n例）3年A組「お化け屋敷〜廃校の怪〜」', content: '' },
      { id: 's2', title: 'コンセプト・テーマ', type: 'text', placeholder: '企画のコンセプトや世界観を書いてください。\n例）昭和の廃校をテーマにしたリアルホラー体験。来場者に本物の恐怖を届ける。', content: '' },
      { id: 's3', title: 'ターゲット・想定来場者', type: 'text', placeholder: 'どんな人に来てほしいか、何人くらいの来場を見込んでいるかを書いてください。', content: '' },
      { id: 's4', title: '会場レイアウト・準備物', type: 'text', placeholder: '教室のレイアウト案や、必要な材料・道具のリストを書いてください。', content: '' },
      { id: 's5', title: '当日の運営フロー', type: 'text', placeholder: '受付・誘導・進行など、当日の動き方を書いてください。', content: '' },
      { id: 's6', title: '役割分担', type: 'text', placeholder: '準備・当日のそれぞれの担当者を書いてください。\n例）装飾班・受付班・演者班・会計 など', content: '' },
      { id: 's7', title: '予算・資金計画', type: 'text', placeholder: '材料費・消耗品費・その他経費の見積もりと、クラス費からの充当額を書いてください。', content: '' },
      { id: 's8', title: '準備スケジュール', type: 'text', placeholder: '文化祭当日から逆算した準備スケジュールを書いてください。', content: '' },
    ]
  },

  {
    id: 'research-report',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🔬',
    name: '自由研究・探究学習レポート',
    description: '中学〜高校の自由研究・総合的な探究の時間のレポートをまとめるテンプレート',
    color: '#0a1a2e',
    sections: [
      { id: 's1', title: '研究テーマ・タイトル', type: 'text', placeholder: '研究のタイトルを書いてください。\n例）「なぜ夕焼けは赤いのか〜光の散乱と色の関係〜」', content: '' },
      { id: 's2', title: 'このテーマを選んだ理由・動機', type: 'text', placeholder: 'なぜこのテーマに興味を持ったか、きっかけを書いてください。', content: '' },
      { id: 's3', title: '調べる前の予想（仮説）', type: 'text', placeholder: '実験・調査の前に「こうなるのではないか」と思っていたことを書いてください。', content: '' },
      { id: 's4', title: '調査・実験の方法', type: 'text', placeholder: 'どのように調べたか・実験したかを、手順を追って書いてください。', content: '' },
      { id: 's5', title: '結果・データ', type: 'text', placeholder: '実験結果や調べてわかったことを、数値やグラフ、表で整理して書いてください。', content: '' },
      { id: 's6', title: '考察（結果からわかったこと）', type: 'text', placeholder: '結果をもとに、なぜそうなったかを自分なりに考えて書いてください。仮説と比べてどうでしたか？', content: '' },
      { id: 's7', title: 'まとめ・結論', type: 'text', placeholder: '研究全体のまとめと、最終的な結論を書いてください。', content: '' },
      { id: 's8', title: '感想・今後の課題', type: 'text', placeholder: '研究を通じて感じたことや、今後さらに調べてみたいことを書いてください。', content: '' },
      { id: 's9', title: '参考文献・参考サイト', type: 'text', placeholder: '調査に使った本・サイト・資料名を書いてください。', content: '' },
    ]
  },

  {
    id: 'volunteer-plan',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🤝',
    name: 'ボランティア・地域活動企画書',
    description: '学校や地域でのボランティア・奉仕活動の企画立案テンプレート',
    color: '#1a2a0a',
    sections: [
      { id: 's1', title: '活動名・概要', type: 'text', placeholder: '活動のタイトルと、どんな活動かを書いてください。\n例）地域清掃ボランティア「きれいな街プロジェクト」', content: '' },
      { id: 's2', title: '活動の目的・社会的意義', type: 'text', placeholder: 'なぜこの活動をするのか、どんな社会課題を解決したいかを書いてください。', content: '' },
      { id: 's3', title: '活動内容・プログラム', type: 'text', placeholder: '具体的に何をするか書いてください。\n例）公園の清掃・落書き消し・高齢者施設での交流 など', content: '' },
      { id: 's4', title: '活動日時・場所', type: 'text', placeholder: '実施日・時間帯・活動場所を書いてください。', content: '' },
      { id: 's5', title: '参加メンバー・連携先', type: 'text', placeholder: '参加する人数・グループ、地域団体や学校との連携があれば書いてください。', content: '' },
      { id: 's6', title: '役割分担・準備物', type: 'text', placeholder: '誰が何を担当するか、必要な道具・材料を書いてください。', content: '' },
      { id: 's7', title: '予算・費用', type: 'text', placeholder: '必要な費用（材料費など）と調達方法を書いてください。', content: '' },
      { id: 's8', title: '活動の振り返り・目標', type: 'text', placeholder: '活動後にどんな成果・変化を生み出したいか、目標を書いてください。', content: '' },
    ]
  },

  {
    id: 'graduation-thesis',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🎓',
    name: '卒業論文・卒業研究計画書',
    description: '大学・高専の卒業論文・卒業研究の計画立案・概要まとめテンプレート',
    color: '#1a0e2a',
    sections: [
      { id: 's1', title: '研究タイトル（仮）', type: 'text', placeholder: '研究タイトルの候補を書いてください。決まっていなければ「仮」で構いません。', content: '' },
      { id: 's2', title: '研究背景・問題意識', type: 'text', placeholder: 'この研究テーマを選んだ背景・社会的な問題意識・先行研究の流れを書いてください。', content: '' },
      { id: 's3', title: '研究目的・リサーチクエスチョン', type: 'text', placeholder: '「何を明らかにしたいのか」という問いと、研究の目的を書いてください。', content: '' },
      { id: 's4', title: '研究方法・アプローチ', type: 'text', placeholder: '文献調査・実験・アンケート・インタビューなど、どのように研究を進めるか書いてください。', content: '' },
      { id: 's5', title: '先行研究・文献レビュー', type: 'text', placeholder: '関連する先行研究や参考文献と、それらの概要・自分の研究との違いを書いてください。', content: '' },
      { id: 's6', title: '研究スケジュール', type: 'text', placeholder: '月単位のスケジュールを書いてください。\n例）4月：文献収集 / 5月：調査設計 / 7月：データ収集 / 10月：分析 / 1月：執筆完了', content: '' },
      { id: 's7', title: '期待される成果・貢献', type: 'text', placeholder: 'この研究が完成したとき、どんな知見や貢献が生まれるかを書いてください。', content: '' },
      { id: 's8', title: '指導教員へのコメント欄', type: 'text', placeholder: '教員へ確認・相談したいことや、フィードバックを受けたい点を書いてください。', content: '' },
    ]
  },

  {
    id: 'internship-plan',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '💼',
    name: 'インターンシップ・就活準備シート',
    description: '大学生のインターン応募・自己分析・就活準備をまとめるテンプレート',
    color: '#0a1e2a',
    sections: [
      { id: 's1', title: '自己紹介・基本プロフィール', type: 'text', placeholder: '名前・大学・学部・学年、専攻・ゼミ・研究テーマを書いてください。', content: '' },
      { id: 's2', title: '自己分析（強み・弱み・特徴）', type: 'text', placeholder: '自分の強み・弱み・性格の特徴を書いてください。\n例）強み：粘り強さ・論理的思考 / 弱み：慎重すぎて決断が遅い', content: '' },
      { id: 's3', title: 'これまでの経験・実績（ガクチカ）', type: 'text', placeholder: '学生時代に力を入れた活動（部活・アルバイト・研究・ボランティアなど）と、そこから得たものを書いてください。', content: '' },
      { id: 's4', title: '志望業界・企業の条件', type: 'text', placeholder: '興味がある業界・職種と、企業を選ぶ際に重視することを書いてください。', content: '' },
      { id: 's5', title: 'インターン・就職活動の目的', type: 'text', placeholder: 'インターンや就活を通じて何を得たいか・確かめたいかを書いてください。', content: '' },
      { id: 's6', title: '志望動機（企業・職種別）', type: 'text', placeholder: '特定の企業・職種に対する志望動機を書いてください。（複数の企業分をここにまとめてもOK）', content: '' },
      { id: 's7', title: '将来のキャリアビジョン', type: 'text', placeholder: '3年後・10年後にどんな仕事をしていたいか、どんな人物になりたいかを書いてください。', content: '' },
      { id: 's8', title: '準備スケジュール・TODO', type: 'text', placeholder: 'ES提出・面接練習・OB訪問など、就活の進め方を書いてください。', content: '' },
    ]
  },

  {
    id: 'student-business',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🚀',
    name: '学生起業・ビジネスアイデア企画書',
    description: '学生起業家・ビジコン参加・授業内発表向けのビジネスアイデア企画書テンプレート',
    color: '#2a1a0a',
    sections: [
      { id: 's1', title: 'ビジネスアイデアの概要', type: 'text', placeholder: 'どんなサービス・商品を提供するか、一言で説明してください。\n例）「大学生向けの空き時間マッチングアプリ」', content: '' },
      { id: 's2', title: '解決したい課題・問題', type: 'text', placeholder: 'どんな人のどんな不便・困りごとを解決するか書いてください。実体験ベースだとより強い！', content: '' },
      { id: 's3', title: 'ターゲットユーザー', type: 'text', placeholder: 'メインの顧客は誰か（年齢・属性・ライフスタイルなど）を書いてください。', content: '' },
      { id: 's4', title: 'サービス・商品の内容', type: 'text', placeholder: '具体的に何を提供するか、どんな機能・特徴があるかを書いてください。', content: '' },
      { id: 's5', title: '競合・差別化ポイント', type: 'text', placeholder: '似たようなサービスと比べて、何が違うか・なぜ選ばれるかを書いてください。', content: '' },
      { id: 's6', title: 'お金の仕組み（マネタイズ）', type: 'text', placeholder: 'どうやって収益を得るか書いてください。\n例）月額サービス料 / 手数料 / 広告 / 物販 など', content: '' },
      { id: 's7', title: '実現に向けたステップ', type: 'text', placeholder: 'このアイデアを形にするための具体的な次のアクションを書いてください。\n例）プロトタイプ制作 / ユーザーヒアリング10人 / 資金○万円調達', content: '' },
      { id: 's8', title: 'チームメンバーと役割', type: 'text', placeholder: '一緒にやるメンバーと、それぞれの担当を書いてください（一人の場合はその旨も）。', content: '' },
    ]
  },

  {
    id: 'presentation-plan',
    category: 'student',
    categoryLabel: '学生・学校',
    icon: '🎤',
    name: 'プレゼン・発表準備シート',
    description: '授業発表・ゼミ発表・コンテスト向けのプレゼンテーション構成メモテンプレート',
    color: '#0e1a2a',
    sections: [
      { id: 's1', title: '発表タイトル・テーマ', type: 'text', placeholder: '発表のタイトルと、何について話すかを一言で書いてください。', content: '' },
      { id: 's2', title: '発表の目的・伝えたいこと（TAKE AWAY）', type: 'text', placeholder: '聞いた人に「何を持ち帰ってほしいか」を1〜2文で書いてください。\n例）「AIを使えば誰でも簡単に○○できると知ってほしい」', content: '' },
      { id: 's3', title: '発表の流れ（アウトライン）', type: 'text', placeholder: 'スライドの大まかな流れ・章立てを箇条書きで書いてください。\n例）①導入 ②課題提示 ③解決策 ④デモ ⑤まとめ・Q&A', content: '' },
      { id: 's4', title: '導入・つかみ', type: 'text', placeholder: '最初の30秒〜1分で話す内容を書いてください。聴衆の興味を引く問いかけや驚くデータなど。', content: '' },
      { id: 's5', title: 'メインコンテンツ（本論）', type: 'text', placeholder: '伝えたいことの根拠・データ・具体例を書いてください。', content: '' },
      { id: 's6', title: 'まとめ・結論・提案', type: 'text', placeholder: '発表の締めくくりに何を言うか、どんな行動を促すかを書いてください。', content: '' },
      { id: 's7', title: '想定Q&A', type: 'text', placeholder: '発表後に来そうな質問と、その回答を書いておきましょう。', content: '' },
      { id: 's8', title: '参考資料・出典', type: 'text', placeholder: 'スライドや発表で使用するデータ・文献の出典を書いてください。', content: '' },
    ]
  },


  // ─────────────────────────────────────────
  // EVENT（イベント・企画）
  // ─────────────────────────────────────────
  {
    id: 'event-general',
    category: 'event',
    categoryLabel: 'イベント・企画',
    icon: '🎪',
    name: 'イベント企画書（汎用）',
    description: '社内行事・地域イベント・交流会など、あらゆるイベントに使える汎用テンプレート',
    color: '#2a0e1a',
    sections: [
      { id: 's1', title: 'イベント概要・タイトル', type: 'text', placeholder: 'イベント名と一言コンセプトを書いてください。\n例）「秋のお客様感謝祭2026」顧客との絆を深める年1回の感謝イベント', content: '' },
      { id: 's2', title: '開催目的・背景', type: 'text', placeholder: 'なぜこのイベントを開催するのか、背景・目的・期待する成果を書いてください。', content: '' },
      { id: 's3', title: '日時・会場', type: 'text', placeholder: '開催日時・会場名・住所・収容人数・会場費を書いてください。', content: '' },
      { id: 's4', title: 'ターゲット・参加者', type: 'text', placeholder: '参加対象者と想定参加人数、招待方法を書いてください。', content: '' },
      { id: 's5', title: 'プログラム・タイムスケジュール', type: 'text', placeholder: '当日の流れをタイムライン形式で書いてください。\n例）13:00 開場 → 13:30 開会挨拶 → 14:00 メインコンテンツ → 16:00 懇親会 → 17:00 閉会', content: '' },
      { id: 's6', title: '運営体制・役割分担', type: 'text', placeholder: '担当者・スタッフ配置・外部委託先を書いてください。', content: '' },
      { id: 's7', title: '予算計画', type: 'text', placeholder: '会場費・機材・飲食・広報など費目別の予算を書いてください。\n総額と一人当たりコストも記載してください。', content: '' },
      { id: 's8', title: '集客・告知計画', type: 'text', placeholder: '告知方法・集客施策・申込み受付方法を書いてください。', content: '' },
      { id: 's9', title: '当日オペレーション・リスク対応', type: 'text', placeholder: '緊急時対応・雨天時プラン・キャンセルポリシーを書いてください。', content: '' },
    ]
  },

  {
    id: 'seminar-plan',
    category: 'event',
    categoryLabel: 'イベント・企画',
    icon: '🎓',
    name: 'セミナー・ウェビナー企画書',
    description: '社外向け・社内向けのセミナー/勉強会/ウェビナー開催を立案するテンプレート',
    color: '#1a0e2a',
    sections: [
      { id: 's1', title: 'セミナー概要・テーマ', type: 'text', placeholder: 'セミナーのタイトル・テーマ・開催形式（オンライン/オフライン/ハイブリッド）を書いてください。', content: '' },
      { id: 's2', title: '開催目的・KGI', type: 'text', placeholder: '開催目的（見込み客獲得・ブランディング・社内教育など）と成功指標を書いてください。', content: '' },
      { id: 's3', title: 'ターゲット参加者', type: 'text', placeholder: '対象とする参加者像・役職・課題感を書いてください。', content: '' },
      { id: 's4', title: '登壇者・講師', type: 'text', placeholder: '登壇者名・肩書き・担当セッションを書いてください。外部登壇者の交渉状況も記載してください。', content: '' },
      { id: 's5', title: 'プログラム構成', type: 'text', placeholder: 'セッション一覧・各セッションの時間・内容概要を書いてください。', content: '' },
      { id: 's6', title: '集客目標・告知戦略', type: 'text', placeholder: '参加者目標人数・告知チャネル（SNS/メルマガ/PR）・申込みページを書いてください。', content: '' },
      { id: 's7', title: '配信・会場設備', type: 'text', placeholder: '使用ツール（Zoom/配信機材など）・会場設備・テクニカルリハーサル日程を書いてください。', content: '' },
      { id: 's8', title: '予算・収支', type: 'text', placeholder: '費用内訳・参加費設定・収支見込みを書いてください。', content: '' },
    ]
  },

  {
    id: 'exhibition-plan',
    category: 'event',
    categoryLabel: 'イベント・企画',
    icon: '🏛️',
    name: '展示会・見本市出展企画書',
    description: '業界展示会・見本市・フェアへの出展計画を立案するテンプレート',
    color: '#0e1a2a',
    sections: [
      { id: 's1', title: '出展概要・目的', type: 'text', placeholder: '出展する展示会名・開催日・会場・出展目的を書いてください。\n例）目的：新製品のブランド認知向上・リード獲得200件', content: '' },
      { id: 's2', title: 'ターゲット・来場者層', type: 'text', placeholder: '展示会の来場者層と、自社ブースで接触したい顧客像を書いてください。', content: '' },
      { id: 's3', title: 'ブース設計・展示内容', type: 'text', placeholder: 'ブースの面積・レイアウトコンセプト・展示する製品/サービスを書いてください。', content: '' },
      { id: 's4', title: 'デモ・体験コンテンツ', type: 'text', placeholder: '来場者が体験・試用できるコンテンツや、デモンストレーション計画を書いてください。', content: '' },
      { id: 's5', title: '集客・事前PR', type: 'text', placeholder: '招待状送付・SNS告知・プレスリリースなど事前PR施策を書いてください。', content: '' },
      { id: 's6', title: '運営スタッフ・役割分担', type: 'text', placeholder: '当日の配置スタッフ数・役割・シフト計画を書いてください。', content: '' },
      { id: 's7', title: '予算・ROI見込み', type: 'text', placeholder: 'ブース費・装飾費・人件費などの費用と、獲得リード数・商談見込みを書いてください。', content: '' },
      { id: 's8', title: 'フォローアップ計画', type: 'text', placeholder: '展示会後のリードナーチャリング・御礼メール・商談化施策を書いてください。', content: '' },
    ]
  },

  {
    id: 'company-party',
    category: 'event',
    categoryLabel: 'イベント・企画',
    icon: '🎉',
    name: '社内パーティ・懇親会企画書',
    description: '忘年会・新年会・歓送迎会・周年記念パーティなど社内イベントの企画テンプレート',
    color: '#2a1a0e',
    sections: [
      { id: 's1', title: 'イベント名・コンセプト', type: 'text', placeholder: 'イベント名と開催テーマを書いてください。\n例）「2026年 年末感謝パーティ〜今年も一年お疲れ様！〜」', content: '' },
      { id: 's2', title: '日時・会場・参加人数', type: 'text', placeholder: '開催日時・会場（レストラン/ホテル/社内など）・参加予定人数を書いてください。', content: '' },
      { id: 's3', title: 'プログラム・演出', type: 'text', placeholder: '乾杯・食事・余興・表彰・抽選会など当日の流れと演出を書いてください。', content: '' },
      { id: 's4', title: '役割分担・担当者', type: 'text', placeholder: '幹事・受付・司会・余興担当などの役割を書いてください。', content: '' },
      { id: 's5', title: '予算・会費設定', type: 'text', placeholder: '会場費・飲食費・余興費などの予算と、参加者一人当たりの会費を書いてください。', content: '' },
      { id: 's6', title: '準備スケジュール・TODO', type: 'text', placeholder: '会場予約・案内送付・出欠確認・備品手配など準備のTo Doを書いてください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // PRODUCT（商品・クリエイティブ）
  // ─────────────────────────────────────────
  {
    id: 'product-development',
    category: 'product',
    categoryLabel: '商品・クリエイティブ',
    icon: '🛍️',
    name: '新商品開発企画書',
    description: '新製品・新商品の開発から販売戦略までを立案する企画書テンプレート',
    color: '#1a2a0e',
    sections: [
      { id: 's1', title: '企画概要・開発背景', type: 'text', placeholder: '新商品の開発に至った背景・市場ニーズ・社内課題を書いてください。', content: '' },
      { id: 's2', title: '商品コンセプト・ネーミング', type: 'text', placeholder: '商品名（仮）・コンセプト・キャッチコピー・世界観を書いてください。', content: '' },
      { id: 's3', title: 'ターゲット顧客', type: 'text', placeholder: 'メインターゲットのペルソナ（年齢・性別・ライフスタイル・インサイト）を書いてください。', content: '' },
      { id: 's4', title: '商品仕様・機能・デザイン', type: 'text', placeholder: '商品の機能・スペック・素材・カラー・パッケージデザインの方向性を書いてください。', content: '' },
      { id: 's5', title: '競合分析・差別化ポイント', type: 'text', placeholder: '類似商品との比較・自社商品の優位性を書いてください。', content: '' },
      { id: 's6', title: '価格設定・原価構造', type: 'text', placeholder: '販売価格・原価率・粗利目標・価格帯のポジションを書いてください。', content: '' },
      { id: 's7', title: '販売チャネル・流通計画', type: 'text', placeholder: '自社EC・モール・実店舗・卸・海外展開など販売チャネルを書いてください。', content: '' },
      { id: 's8', title: 'プロモーション計画', type: 'text', placeholder: 'ローンチ時の広告・PR・SNS・インフルエンサー施策を書いてください。', content: '' },
      { id: 's9', title: '開発スケジュール・費用', type: 'text', placeholder: '試作〜量産〜販売開始までのスケジュールと開発費用を書いてください。', content: '' },
    ]
  },

  {
    id: 'content-production',
    category: 'product',
    categoryLabel: '商品・クリエイティブ',
    icon: '🎬',
    name: '動画・コンテンツ制作企画書',
    description: 'YouTube・SNS動画・広告動画・番組などの映像コンテンツ制作を立案するテンプレート',
    color: '#2a0e0e',
    sections: [
      { id: 's1', title: 'コンテンツ概要・タイトル', type: 'text', placeholder: '作品タイトル（仮）・コンテンツのジャンル・配信プラットフォームを書いてください。\n例）「YouTube企業チャンネル 社員インタビューシリーズ」', content: '' },
      { id: 's2', title: '制作目的・KPI', type: 'text', placeholder: '制作の目的（認知拡大/採用強化/販促など）と、再生数・エンゲージメント等の目標数値を書いてください。', content: '' },
      { id: 's3', title: 'ターゲット視聴者', type: 'text', placeholder: 'メインの視聴者層・視聴シーン・コンテンツへの期待を書いてください。', content: '' },
      { id: 's4', title: 'コンセプト・世界観・トーン', type: 'text', placeholder: '映像のトーン（明るい/シリアス/エモ系など）・世界観・参考にしたいコンテンツを書いてください。', content: '' },
      { id: 's5', title: '構成・シナリオ概要', type: 'text', placeholder: '全体の構成・各シーンの概要・尺（分数）を書いてください。', content: '' },
      { id: 's6', title: '制作体制・スタッフ', type: 'text', placeholder: 'ディレクター・カメラマン・編集・ナレーターなど制作スタッフを書いてください。外注か内製かも明記してください。', content: '' },
      { id: 's7', title: '撮影スケジュール', type: 'text', placeholder: '撮影日程・ロケ地・出演者・公開予定日を書いてください。', content: '' },
      { id: 's8', title: '予算', type: 'text', placeholder: '制作費の内訳（撮影/編集/出演料/BGM著作権料など）を書いてください。', content: '' },
    ]
  },

  {
    id: 'brand-strategy',
    category: 'product',
    categoryLabel: '商品・クリエイティブ',
    icon: '✨',
    name: 'ブランド戦略・リブランディング企画書',
    description: '新ブランド立ち上げ・既存ブランドのリニューアルを立案するテンプレート',
    color: '#1e0e2a',
    sections: [
      { id: 's1', title: '企画背景・ブランドの現状', type: 'text', placeholder: 'リブランディングが必要な理由、または新ブランド立ち上げの背景を書いてください。', content: '' },
      { id: 's2', title: 'ブランドビジョン・ミッション', type: 'text', placeholder: 'ブランドが目指す姿・社会への約束・存在意義（パーパス）を書いてください。', content: '' },
      { id: 's3', title: 'ターゲット顧客・ペルソナ', type: 'text', placeholder: 'ブランドが最も届けたい顧客像とインサイトを書いてください。', content: '' },
      { id: 's4', title: 'ブランドポジション・差別化', type: 'text', placeholder: '競合ブランドとの比較・自社ブランドの独自ポジションを書いてください。', content: '' },
      { id: 's5', title: 'ブランドアイデンティティ（VI・BI）', type: 'text', placeholder: 'ロゴ・カラー・フォント・トーン&マナーなどビジュアルアイデンティティの方向性を書いてください。', content: '' },
      { id: 's6', title: 'コミュニケーション戦略', type: 'text', placeholder: '各チャネルでのブランドメッセージ・訴求軸・キャンペーンの方向性を書いてください。', content: '' },
      { id: 's7', title: '実施ロードマップ・予算', type: 'text', placeholder: 'フェーズ別の実施内容・スケジュール・予算配分を書いてください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // COMMUNITY（地域・社会・NPO）
  // ─────────────────────────────────────────
  {
    id: 'community-revitalization',
    category: 'community',
    categoryLabel: '地域・社会・NPO',
    icon: '🏘️',
    name: '地域活性化・まちづくり企画書',
    description: '地域の魅力を高め、関係人口・定住人口を増やすための地域活性化企画テンプレート',
    color: '#0e2a1a',
    sections: [
      { id: 's1', title: '地域の現状・課題', type: 'text', placeholder: '対象エリアの人口動態・産業・観光資源の現状と課題を書いてください。\n例）高齢化率40%・空き家率増加・若者流出が加速', content: '' },
      { id: 's2', title: '企画のビジョン・目標', type: 'text', placeholder: '5年後・10年後に実現したい地域の姿と、定量目標を書いてください。', content: '' },
      { id: 's3', title: 'ターゲット・受益者', type: 'text', placeholder: '主なターゲット（移住者・観光客・地元住民・企業など）と、それぞれへの価値提供を書いてください。', content: '' },
      { id: 's4', title: '主要施策・プログラム', type: 'text', placeholder: '具体的な取り組み内容（イベント/施設整備/移住支援/産業創出など）を書いてください。', content: '' },
      { id: 's5', title: '推進体制・ステークホルダー', type: 'text', placeholder: '行政・地域団体・民間企業・NPOなど関係者と各役割を書いてください。', content: '' },
      { id: 's6', title: '資金計画・補助金活用', type: 'text', placeholder: '必要予算・国/都道府県の補助金・クラウドファンディングなど資金調達手段を書いてください。', content: '' },
      { id: 's7', title: 'スケジュール・フェーズ計画', type: 'text', placeholder: '短期/中期/長期のフェーズ別アクションプランを書いてください。', content: '' },
      { id: 's8', title: 'KPI・成果指標', type: 'text', placeholder: '移住者数・観光客数・起業件数など測定するKPIと目標値を書いてください。', content: '' },
    ]
  },

  {
    id: 'npo-project',
    category: 'community',
    categoryLabel: '地域・社会・NPO',
    icon: '🌱',
    name: 'NPO・社会貢献プロジェクト企画書',
    description: 'NPO・NGO・社会起業家向けのプロジェクト立案・助成金申請に使えるテンプレート',
    color: '#0a2a1a',
    sections: [
      { id: 's1', title: '解決する社会課題', type: 'text', placeholder: '取り組む社会課題の概要・深刻さ・なぜ今取り組む必要があるかを書いてください。\n数値データを使うと説得力が増します。', content: '' },
      { id: 's2', title: '団体・プロジェクト概要', type: 'text', placeholder: '団体名・設立背景・ミッション・これまでの実績を書いてください。', content: '' },
      { id: 's3', title: 'プロジェクトの目標・成果指標', type: 'text', placeholder: 'このプロジェクトで達成したいアウトカム（変化）と、測定可能な指標を書いてください。', content: '' },
      { id: 's4', title: '事業内容・活動計画', type: 'text', placeholder: '具体的な活動内容・対象者・実施方法・パートナー機関を書いてください。', content: '' },
      { id: 's5', title: '受益者・対象者', type: 'text', placeholder: '誰に何を届けるか、何人に影響を与えるかを書いてください。', content: '' },
      { id: 's6', title: '予算計画・資金調達', type: 'text', placeholder: '費目別予算・助成金/寄付/会費などの収入源・自己負担割合を書いてください。', content: '' },
      { id: 's7', title: '実施スケジュール', type: 'text', placeholder: '活動の開始〜終了までのスケジュールを書いてください。', content: '' },
      { id: 's8', title: '持続可能性・将来展望', type: 'text', placeholder: 'プロジェクト終了後の継続・拡大計画、自走に向けた収益モデルを書いてください。', content: '' },
    ]
  },

  {
    id: 'sdgs-csr',
    category: 'community',
    categoryLabel: '地域・社会・NPO',
    icon: '♻️',
    name: 'CSR・SDGs取り組み企画書',
    description: '企業のCSR活動・SDGs貢献・サステナビリティ推進を立案するテンプレート',
    color: '#0a1e0a',
    sections: [
      { id: 's1', title: '企画背景・CSR方針', type: 'text', placeholder: '自社のCSR/サステナビリティ方針と、この取り組みを始める背景を書いてください。', content: '' },
      { id: 's2', title: '対応するSDGsゴール', type: 'text', placeholder: '取り組みに関連するSDGsゴール番号とターゲットを明記してください。\n例）Goal 13: 気候変動に具体的な対策を / Goal 8: 働きがいも経済成長も', content: '' },
      { id: 's3', title: '活動内容・施策', type: 'text', placeholder: '具体的な取り組み内容（環境/教育/地域貢献/ダイバーシティなど）を書いてください。', content: '' },
      { id: 's4', title: 'ステークホルダーへの価値', type: 'text', placeholder: '従業員・顧客・地域・株主・社会にどんな価値をもたらすかを書いてください。', content: '' },
      { id: 's5', title: 'KPI・測定指標', type: 'text', placeholder: 'CO2削減量・ダイバーシティ比率・社会貢献時間など定量指標を書いてください。', content: '' },
      { id: 's6', title: '推進体制・予算', type: 'text', placeholder: '担当部署・推進担当者・予算規模を書いてください。', content: '' },
      { id: 's7', title: '情報開示・コミュニケーション計画', type: 'text', placeholder: 'レポート・プレスリリース・Webサイトでの情報開示方針を書いてください。', content: '' },
    ]
  },

  // ─────────────────────────────────────────
  // FREELANCE（フリーランス・副業）
  // ─────────────────────────────────────────
  {
    id: 'freelance-proposal',
    category: 'freelance',
    categoryLabel: 'フリーランス・副業',
    icon: '💻',
    name: 'クライアント向け提案書',
    description: 'フリーランス・個人事業主がクライアントに仕事を提案する際の提案書テンプレート',
    color: '#0e1a2a',
    sections: [
      { id: 's1', title: '提案概要・タイトル', type: 'text', placeholder: '何を提案するか一言で書いてください。\n例）「○○株式会社 Webサイトリニューアル提案」', content: '' },
      { id: 's2', title: 'クライアントの課題・背景', type: 'text', placeholder: 'ヒアリングで把握したクライアントの課題・現状・要望を書いてください。\n「自分の言葉で課題を言語化できる」ことが信頼につながります。', content: '' },
      { id: 's3', title: '提案内容・解決策', type: 'text', placeholder: '課題に対してどんな解決策を提供するかを具体的に書いてください。\n成果物・納品物のイメージも記載してください。', content: '' },
      { id: 's4', title: '自己紹介・実績・強み', type: 'text', placeholder: '自分のプロフィール・関連する実績・この案件に活かせるスキルを書いてください。\nポートフォリオURLがあれば記載してください。', content: '' },
      { id: 's5', title: '進め方・スケジュール', type: 'text', placeholder: 'プロジェクトの進め方・フェーズ別スケジュール・マイルストーンを書いてください。', content: '' },
      { id: 's6', title: '料金・お支払い条件', type: 'text', placeholder: '見積もり金額・内訳・支払い条件（前払い/後払い/月払いなど）を書いてください。', content: '' },
      { id: 's7', title: '契約・免責事項', type: 'text', placeholder: '修正回数・追加費用の発生条件・著作権の帰属・秘密保持などを書いてください。', content: '' },
    ]
  },

  {
    id: 'side-business',
    category: 'freelance',
    categoryLabel: 'フリーランス・副業',
    icon: '🌙',
    name: '副業・個人ビジネス立ち上げ計画書',
    description: '会社員が副業を始める・個人事業主として独立する際の計画書テンプレート',
    color: '#0a0e1e',
    sections: [
      { id: 's1', title: '副業・事業の概要', type: 'text', placeholder: 'どんな副業・個人ビジネスをするかを一言で書いてください。\n例）「Webデザインのフリーランス受託」「ハンドメイドアクセサリーのEC販売」', content: '' },
      { id: 's2', title: '始める理由・動機', type: 'text', placeholder: 'なぜこの副業を選んだか・どんなスキルや経験を活かせるかを書いてください。', content: '' },
      { id: 's3', title: 'ターゲット顧客・販売先', type: 'text', placeholder: '誰に何を売るか、顧客獲得チャネルを書いてください。\n例）SNS・クラウドソーシング・知人紹介・フリマアプリ', content: '' },
      { id: 's4', title: '提供サービス・商品', type: 'text', placeholder: '具体的なサービス内容・商品・価格設定を書いてください。', content: '' },
      { id: 's5', title: '収益目標・月別計画', type: 'text', placeholder: '月次の収益目標・案件数・単価の想定を書いてください。\n例）月3件 × 5万円 = 月15万円を目標に3ヶ月以内に達成', content: '' },
      { id: 's6', title: '時間・リソース管理', type: 'text', placeholder: '本業との兼業ルール・週何時間を副業に充てるか・家族への説明などを書いてください。', content: '' },
      { id: 's7', title: '必要スキル・準備', type: 'text', placeholder: '今すぐ始めるのに必要なスキル習得・ツール・開業届などを書いてください。', content: '' },
      { id: 's8', title: 'リスク・注意点', type: 'text', placeholder: '会社の就業規則・確定申告・競業避止義務など確認すべきリスクを書いてください。', content: '' },
    ]
  },

  {
    id: 'portfolio-plan',
    category: 'freelance',
    categoryLabel: 'フリーランス・副業',
    icon: '🗂️',
    name: 'ポートフォリオ・実績整理シート',
    description: 'フリーランスの営業資料・ポートフォリオサイトの構成を整理するテンプレート',
    color: '#1a0e0e',
    sections: [
      { id: 's1', title: '自己紹介・プロフィール', type: 'text', placeholder: '名前・活動名・対応できる仕事の種類・拠点を書いてください。\n「何ができる人か」を一言で表すキャッチコピーも考えてみましょう。', content: '' },
      { id: 's2', title: 'スキルセット・得意領域', type: 'text', placeholder: '使えるツール・言語・資格・専門分野を書いてください。\n得意×好き×稼げるの重なりを意識してください。', content: '' },
      { id: 's3', title: '実績・制作事例①', type: 'text', placeholder: 'プロジェクト名・概要・担当役割・成果（数値）を書いてください。\n例）○○社サイトリニューアル：PV150%向上・SEO対策担当', content: '' },
      { id: 's4', title: '実績・制作事例②', type: 'text', placeholder: '別の実績を書いてください。業種・規模・役割が異なる案件を選ぶと幅が伝わります。', content: '' },
      { id: 's5', title: '実績・制作事例③', type: 'text', placeholder: 'さらに別の実績を書いてください。数が少なければ自主制作・学習用作品でも構いません。', content: '' },
      { id: 's6', title: 'クライアントの声・推薦文', type: 'text', placeholder: '過去クライアントからのフィードバック・感謝の言葉があれば記載してください（許可が必要です）。', content: '' },
      { id: 's7', title: 'サービスメニュー・料金表', type: 'text', placeholder: '提供サービスの種類・標準価格・納期目安を書いてください。', content: '' },
      { id: 's8', title: '連絡先・SNS・ポートフォリオURL', type: 'text', placeholder: 'メール・SNS・WebサイトURL・活動しているプラットフォームを書いてください。', content: '' },
    ]
  },

];