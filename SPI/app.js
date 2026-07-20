// ===================== グローバルリセット機能のバインド =====================
const resetBtn = id('global_reset_btn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // 1. 画面内のすべての数値入力・テキスト入力を取得して空にする
    const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
    inputs.forEach(input => {
      // 支払い回数などの input[step="1"] や disabled なものは除外したい場合は条件を変更してください
      input.value = '';
    });

    // 2. 入力イベントを人工的に発生させて、各コンポーネントの calc() 処理を走らせる
    // これにより、出力先のテキストが自動的に「―」や初期状態に戻ります
    inputs.forEach(input => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    // 💡 単位のセレクトボックスも初期状態（日 など）に戻したい場合は以下を設定
    const unitSelect = id('buntan_unit');
    if (unitSelect) {
      unitSelect.value = '時間'; // または '日'
      unitSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

// ===================== ユーティリティ =====================
const num = v => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};
const fmt = (v, d = 2) => {
  if (v === null || Number.isNaN(v)) return "―";
  const r = Math.round(v * 10 ** d) / 10 ** d;
  return r.toLocaleString('ja-JP', { maximumFractionDigits: d });
};
const fact = x => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; };
const gcdFn = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
const lcmFn = (a, b) => (a === 0 || b === 0) ? 0 : Math.abs(a * b) / gcdFn(a, b);

const UNITS = {
  distance: { options: [['m', 'm'], ['km', 'km']], factor: { m: 1, km: 1000 } },
  time: { options: [['秒', '秒'], ['分', '分'], ['時間', '時間']], factor: { '秒': 1, '分': 60, '時間': 3600 } },
  speed: { options: [['m/秒', 'm/秒'], ['m/分', 'm/分'], ['km/時', 'km/時']], factor: { 'm/秒': 1, 'm/分': 1 / 60, 'km/時': 1000 / 3600 } },
  mass: { options: [['g', 'g'], ['kg', 'kg']], factor: { g: 1, kg: 1000 } },
};
function unitSelect(id, kind, defaultUnit) {
  const u = UNITS[kind];
  const def = defaultUnit || u.options[0][0];
  return `<select id="${id}">${u.options.map(([v, l]) => `<option value="${v}" ${v === def ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
}

// ===================== 各単元定義 =====================
const TOOLS = [
  // 1. 推論
  {
    id: 'suiron', label: '推論', glyph: '推',
    render: () => `
      <div class="card">
        <p class="card-title">平均から個々の値・合計を逆算</p>
        <p class="card-hint">例題:「男子学生の3教科の平均点はいくつか」「合計〇点、うち3人分は分かっている。残り1人の点数は？」</p>
        <div class="field-row"><label>合計</label><div class="inputs"><input type="number" id="sr_total" placeholder="300"></div></div>
        <div class="field-row"><label>個数(人数・回数など)</label><div class="inputs"><input type="number" id="sr_count" placeholder="4"></div></div>
        <div class="out-row"><span class="out-label">平均</span><span class="out-val" id="sr_avg_out">―</span></div>
        <div class="field-row" style="margin-top:14px"><label>既知の値(カンマ区切り)</label><div class="inputs"><input type="text" class="wide" id="sr_known" placeholder="70,80,90" style="width:150px"></div></div>
        <div class="out-row"><span class="out-label">残り1個の値</span><span class="out-val" id="sr_remain_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">人口密度</p>
        <p class="card-hint">例題:「A市の人口密度はB市の何倍か」</p>
        <div class="field-row"><label>人口</label><div class="inputs"><input type="number" id="sr_pop" placeholder="45000"><span class="unit-label">人</span></div></div>
        <div class="field-row"><label>面積</label><div class="inputs"><input type="number" id="sr_area" placeholder="30"><span class="unit-label">km²</span></div></div>
        <div class="out-row"><span class="out-label">人口密度</span><span class="out-val" id="sr_density_out">―</span></div>
      </div>
      <p class="divider-hint">「順序」「対戦」「位置関係」「発言の正誤」は表・図で書き出して解くのが基本のため電卓化していません。条件を記号化し、矛盾しない組み合わせを絞り込みましょう。</p>
    `,
    bind: () => {
      const t = id('sr_total'), c = id('sr_count'), k = id('sr_known');
      const calc = () => {
        const tv = num(t.value), cv = num(c.value);
        setText('sr_avg_out', (tv !== null && cv !== null && cv !== 0) ? fmt(tv / cv, 2) : '―');
        const knownVals = k.value.split(',').map(s => num(s.trim())).filter(v => v !== null);
        if (tv !== null && knownVals.length > 0) {
          setText('sr_remain_out', fmt(tv - knownVals.reduce((a, b) => a + b, 0), 2));
        } else setText('sr_remain_out', '―');
      };
      [t, c, k].forEach(el => el.addEventListener('input', calc));

      const p = id('sr_pop'), a = id('sr_area');
      const calcD = () => {
        const pv = num(p.value), av = num(a.value);
        setText('sr_density_out', (pv !== null && av !== null && av !== 0) ? `${fmt(pv / av, 2)} 人/km²` : '―');
      };
      [p, a].forEach(el => el.addEventListener('input', calcD));
    }
  },
  // 2. 場合の数
  {
    id: 'baritsu', label: '場合の数', glyph: '数',
    render: () => `
      <div class="card">
        <p class="card-title">順列 nPr・組み合わせ nCr・円順列</p>
        <p class="card-hint">例題:「1〜6の6つのうち3つで3桁の整数」「5人から2人選ぶ」</p>
        <div class="field-row"><label>全体の数 n</label><div class="inputs"><input type="number" id="n_val" placeholder="6" step="1"><span class="unit-label">個</span></div></div>
        <div class="field-row"><label>選ぶ数 r</label><div class="inputs"><input type="number" id="r_val" placeholder="3" step="1"><span class="unit-label">個</span></div></div>
        <div class="out-row"><span class="out-label">順列 nPr(並べる)</span><span class="out-val" id="perm_out">―</span></div>
        <div class="out-row"><span class="out-label">組み合わせ nCr(選ぶ)</span><span class="out-val" id="comb_out">―</span></div>
        <div class="out-row"><span class="out-label">重複組み合わせ nHr</span><span class="out-val" id="hr_out">―</span></div>
        <div class="out-row"><span class="out-label">円順列(r=n時)</span><span class="out-val" id="circle_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">重複順列(同じ数字を繰り返し使える)</p>
        <p class="card-hint">例題:「同じカードを何回も使って良い場合、整数は全部で何通り？」</p>
        <div class="field-row"><label>使える数字の種類</label><div class="inputs"><input type="number" id="rp_n" placeholder="6" step="1"></div></div>
        <div class="field-row"><label>桁数</label><div class="inputs"><input type="number" id="rp_r" placeholder="3" step="1"></div></div>
        <div class="field-row"><label>0を先頭に使えない場合</label>
          <div class="inputs"><select id="rp_zero"><option value="no">関係ない</option><option value="yes">0を含み先頭不可</option></select></div>
        </div>
        <div class="out-row"><span class="out-label">重複順列 n^r</span><span class="out-val" id="rp_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">サイコロ2個の目の和・積(数え上げ)</p>
        <p class="card-hint">例題:「2つのサイコロを振り、出た目の和が8になるのは何通りか」</p>
        <div class="field-row"><label>狙う和</label><div class="inputs"><input type="number" id="dice_sum" placeholder="8" step="1"></div></div>
        <div class="out-row"><span class="out-label">その和になる通り数(36通り中)</span><span class="out-val" id="dice_sum_out">―</span></div>
        <div class="field-row" style="margin-top:12px"><label>狙う積の倍数</label><div class="inputs"><input type="number" id="dice_mul" placeholder="5" step="1"></div></div>
        <div class="out-row"><span class="out-label">積がその倍数になる通り数</span><span class="out-val" id="dice_mul_out">―</span></div>
      </div>
      <p class="divider-hint">「並べる・列」→順列 nPr／「選ぶ・組」→組み合わせ nCr／輪になる→円順列(n-1)!／繰り返し可→重複順列 n^r</p>
    `,
    bind: () => {
      const n = id('n_val'), r = id('r_val');
      const calc = () => {
        const nv = num(n.value), rv = num(r.value);
        if (nv === null || rv === null || nv < 0 || rv < 0 || !Number.isInteger(nv) || !Number.isInteger(rv) || rv > nv || nv > 170) {
          const msg = nv > 170 ? '数が大きすぎます' : '―';
          ['perm_out', 'comb_out', 'hr_out', 'circle_out'].forEach(k => setText(k, msg));
          return;
        }
        const perm = fact(nv) / fact(nv - rv);
        const comb = perm / fact(rv);
        const hr = fact(nv + rv - 1) / (fact(rv) * fact(nv - 1));
        setText('perm_out', fmt(perm, 0) + ' 通り');
        setText('comb_out', fmt(comb, 0) + ' 通り');
        setText('hr_out', fmt(hr, 0) + ' 通り');
        setText('circle_out', nv >= 1 ? fmt(fact(nv - 1), 0) + ' 通り' : '―');
      };
      [n, r].forEach(el => el.addEventListener('input', calc));

      const rpn = id('rp_n'), rpr = id('rp_r'), rpz = id('rp_zero');
      const calcRP = () => {
        const nv = num(rpn.value), rv = num(rpr.value);
        if (nv === null || rv === null || nv <= 0 || rv <= 0 || !Number.isInteger(nv) || !Number.isInteger(rv)) { setText('rp_out', '―'); return; }
        let total = Math.pow(nv, rv);
        if (rpz.value === 'yes') total = (nv - 1) * Math.pow(nv, rv - 1);
        setText('rp_out', fmt(total, 0) + ' 通り');
      };
      [rpn, rpr, rpz].forEach(el => el.addEventListener('input', calcRP));

      const ds = id('dice_sum'), dm = id('dice_mul');
      const calcDice = () => {
        const sv = num(ds.value);
        if (sv === null || !Number.isInteger(sv)) setText('dice_sum_out', '―');
        else {
          let count = 0;
          for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === sv) count++;
          setText('dice_sum_out', `${count} 通り (${fmt(count / 36 * 100, 2)}%)`);
        }
        const mv = num(dm.value);
        if (mv === null || !Number.isInteger(mv) || mv <= 0) setText('dice_mul_out', '―');
        else {
          let count = 0;
          for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if ((i * j) % mv === 0) count++;
          setText('dice_mul_out', `${count} 通り (${fmt(count / 36 * 100, 2)}%)`);
        }
      };
      [ds, dm].forEach(el => el.addEventListener('input', calcDice));
    }
  },
  // 3. 割合
  {
    id: 'wariai', label: '割合', glyph: '割',
    render: () => `
      <div class="card">
        <p class="card-title">基本の割合(○は△の何%か)</p>
        <div class="field-row"><label>部分の値(○)</label><div class="inputs"><input type="number" id="w_part" placeholder="30"></div></div>
        <div class="field-row"><label>全体の値(△)</label><div class="inputs"><input type="number" id="w_whole" placeholder="150"></div></div>
        <div class="out-row"><span class="out-label">割合</span><span class="out-val" id="w_pct_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">値上げ/値下げ後の売上変化率</p>
        <p class="card-hint">例題:「チケット料金を30%値上げしたら販売枚数が20%減少。売上高は何%増加したか」</p>
        <div class="field-row"><label>価格の変化率</label><div class="inputs"><input type="number" id="w_price_chg" placeholder="30"><span class="unit-label">%</span></div></div>
        <div class="field-row"><label>販売数量の変化率</label><div class="inputs"><input type="number" id="w_qty_chg" placeholder="-20"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">売上高の変化率</span><span class="out-val" id="w_sales_out">―</span></div>
      </div>
      <p class="divider-hint">公式: 割合(%)=部分÷全体×100 ／ 売上変化率=(1+価格変化率)×(1+数量変化率)-1</p>
    `,
    bind: () => {
      const p = id('w_part'), w = id('w_whole');
      const calc1 = () => {
        const pv = num(p.value), wv = num(w.value);
        setText('w_pct_out', (pv !== null && wv !== null && wv !== 0) ? `${fmt(pv / wv * 100, 2)} %` : '―');
      };
      [p, w].forEach(el => el.addEventListener('input', calc1));

      const pc = id('w_price_chg'), qc = id('w_qty_chg');
      const calc2 = () => {
        const pv = num(pc.value), qv = num(qc.value);
        if (pv === null || qv === null) { setText('w_sales_out', '―'); return; }
        const rate = (1 + pv / 100) * (1 + qv / 100) - 1;
        setText('w_sales_out', `${rate >= 0 ? '+' : ''}${fmt(rate * 100, 2)} %`);
      };
      [pc, qc].forEach(el => el.addEventListener('input', calc2));
    }
  },
  // 4. 確率
  {
    id: 'kakuritsu', label: '確率', glyph: '確',
    render: () => `
      <div class="card">
        <p class="card-title">単純な確率(該当数÷全体数)</p>
        <p class="card-hint">例題:「サイコロで4以上の目が出る確率」</p>
        <div class="field-row"><label>該当する場合の数</label><div class="inputs"><input type="number" id="gaitou" placeholder="3"><span class="unit-label">通り</span></div></div>
        <div class="field-row"><label>全体の場合の数</label><div class="inputs"><input type="number" id="zentai" placeholder="6"><span class="unit-label">通り</span></div></div>
        <div class="out-row"><span class="out-label">確率</span><span class="out-val" id="p_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">独立事象・余事象・少なくとも1つ</p>
        <p class="card-hint">例題:「サイコロ2つで少なくとも一方が3以上の確率」</p>
        <div class="field-row"><label>事象Aの確率</label><div class="inputs"><input type="number" id="pa" placeholder="50"><span class="unit-label">%</span></div></div>
        <div class="field-row"><label>事象Bの確率(任意)</label><div class="inputs"><input type="number" id="pb" placeholder="30"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">AかつB(独立)</span><span class="out-val" id="pab_out">―</span></div>
        <div class="out-row"><span class="out-label">AまたはB</span><span class="out-val" id="paorb_out">―</span></div>
        <div class="out-row"><span class="out-label">Aの余事象</span><span class="out-val" id="pnota_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">くじ引き(非復元)の連続的中</p>
        <p class="card-hint">例題:「当たり3本のくじ10本から2本連続で引いて両方当たる確率」</p>
        <div class="field-row"><label>当たりの本数</label><div class="inputs"><input type="number" id="lot_hit" placeholder="3" step="1"><span class="unit-label">本</span></div></div>
        <div class="field-row"><label>くじの総本数</label><div class="inputs"><input type="number" id="lot_total" placeholder="10" step="1"><span class="unit-label">本</span></div></div>
        <div class="field-row"><label>連続で引く回数</label><div class="inputs"><input type="number" id="lot_draws" placeholder="2" step="1"><span class="unit-label">回</span></div></div>
        <div class="out-row"><span class="out-label">全部当たる確率</span><span class="out-val" id="lot_out">―</span></div>
      </div>
      <p class="divider-hint">公式: P(A∩B)=P(A)×P(B)(独立時) ／ P(A∪B)=P(A)+P(B)-P(A∩B) ／「少なくとも1つ」=1-余事象</p>
    `,
    bind: () => {
      const g = id('gaitou'), z = id('zentai');
      const calc1 = () => {
        const gv = num(g.value), zv = num(z.value);
        setText('p_out', (gv !== null && zv !== null && zv !== 0) ? `${fmt(gv / zv * 100, 2)}% (${gv}/${zv})` : '―');
      };
      [g, z].forEach(el => el.addEventListener('input', calc1));

      const pa = id('pa'), pb = id('pb');
      const calc2 = () => {
        const av = num(pa.value), bv = num(pb.value);
        setText('pnota_out', av === null ? '―' : `${fmt(100 - av, 2)} %`);
        if (av === null || bv === null) { setText('pab_out', '―'); setText('paorb_out', '―'); return; }
        const a = av / 100, b = bv / 100, ab = a * b;
        setText('pab_out', `${fmt(ab * 100, 2)} %`);
        setText('paorb_out', `${fmt((a + b - ab) * 100, 2)} %`);
      };
      [pa, pb].forEach(el => el.addEventListener('input', calc2));

      const lh = id('lot_hit'), lt = id('lot_total'), ld = id('lot_draws');
      const calc3 = () => {
        const hv = num(lh.value), tv = num(lt.value), dv = num(ld.value);
        if (hv === null || tv === null || dv === null || dv < 1 || !Number.isInteger(dv) || hv > tv || dv > tv) { setText('lot_out', '―'); return; }
        let p = 1;
        for (let i = 0; i < dv; i++) p *= (hv - i) / (tv - i);
        setText('lot_out', `${fmt(p * 100, 3)} %`);
      };
      [lh, lt, ld].forEach(el => el.addEventListener('input', calc3));
    }
  },
  // 5. 金額計算
  {
    id: 'kingaku', label: '金額計算', glyph: '¥',
    render: () => `
      <div class="card">
        <p class="card-title">基本: 原価→定価→売価</p>
        <div class="field-row"><label>原価</label><div class="inputs"><input type="number" id="genka" placeholder="1200"><span class="unit-label">円</span></div></div>
        <div class="field-row"><label>利益率(原価に上乗せ)</label><div class="inputs"><input type="number" id="rieki_ritsu" placeholder="50"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">定価</span><span class="out-val" id="teika_out">―</span></div>
        <div class="field-row" style="margin-top:8px"><label>値引率(定価から)</label><div class="inputs"><input type="number" id="nebiki_ritsu" placeholder="30"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">売価</span><span class="out-val" id="baika_out">―</span></div>
        <div class="out-row"><span class="out-label">実際の利益額</span><span class="out-val" id="rieki_out">―</span></div>
        <div class="out-row"><span class="out-label">実際の利益率(原価比)</span><span class="out-val" id="rieki_pct_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">逆算: 定価から原価・値引率を求める</p>
        <p class="card-hint">例題:「原価の3割の利益を見込んで定価5200円にした。原価は？」</p>
        <div class="field-row"><label>定価</label><div class="inputs"><input type="number" id="rev_teika" placeholder="5200"><span class="unit-label">円</span></div></div>
        <div class="field-row"><label>利益率(原価に対して)</label><div class="inputs"><input type="number" id="rev_ritsu1" placeholder="30"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">逆算した原価</span><span class="out-val" id="rev_genka_out">―</span></div>
        <div class="field-row" style="margin-top:10px"><label>値引後に得たい利益率</label><div class="inputs"><input type="number" id="rev_ritsu2" placeholder="28"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">必要な値引率</span><span class="out-val" id="rev_nebiki_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">複数個仕入れ・一部値引き販売</p>
        <p class="card-hint">例題:「原価100円を200個仕入れ、50個1割引、残り150個2割引で利益合計13000円。定価は？」</p>
        <div class="field-row"><label>原価(1個)</label><div class="inputs"><input type="number" id="m_genka" placeholder="100"><span class="unit-label">円</span></div></div>
        <div class="field-row"><label>仕入れ個数</label><div class="inputs"><input type="number" id="m_total" placeholder="200"><span class="unit-label">個</span></div></div>
        <div class="field-row"><label>1つ目 個数/値引率</label>
          <div class="inputs"><input type="number" id="m_n1" placeholder="個数" style="width:64px"><input type="number" id="m_d1" placeholder="%" style="width:56px"></div>
        </div>
        <div class="field-row"><label>2つ目 個数/値引率</label>
          <div class="inputs"><input type="number" id="m_n2" placeholder="個数" style="width:64px"><input type="number" id="m_d2" placeholder="%" style="width:56px"></div>
        </div>
        <div class="field-row"><label>目標の総利益</label><div class="inputs"><input type="number" id="m_target_profit" placeholder="13000"><span class="unit-label">円</span></div></div>
        <div class="out-row"><span class="out-label">逆算した定価</span><span class="out-val" id="m_teika_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">段階的な時間割引(ネットカフェ型)</p>
        <p class="card-hint">例題:「2時間以上利用で最初1時間5%、2-3時間目10%、4時間目以降20%引き。7時間の合計は」</p>
        <div class="field-row"><label>基本単価(1時間)</label><div class="inputs"><input type="number" id="dc_base" placeholder="1000"><span class="unit-label">円</span></div></div>
        <div class="field-row"><label>利用時間数</label><div class="inputs"><input type="number" id="dc_hours" placeholder="7" step="1"><span class="unit-label">時間</span></div></div>
        <div class="field-row"><label>各時間の割引率(%、カンマ区切り)</label><div class="inputs"><input type="text" class="wide" id="dc_rates" placeholder="5,10,10,20,20,20,20" style="width:170px"></div></div>
        <div class="out-row"><span class="out-label">合計利用料金</span><span class="out-val" id="dc_out">―</span></div>
      </div>
      <p class="divider-hint">公式: 定価=原価×(1+利益率) / 売価=定価×(1-値引率) / 利益=売価-原価</p>
    `,
    bind: () => {
      const g = id('genka'), rr = id('rieki_ritsu'), nr = id('nebiki_ritsu');
      const calc = () => {
        const genka = num(g.value), r = num(rr.value), n = num(nr.value);
        let teika = null, baika = null, rieki = null, riekiPct = null;
        if (genka !== null && r !== null) teika = genka * (1 + r / 100);
        if (teika !== null && n !== null) baika = teika * (1 - n / 100);
        else if (teika !== null) baika = teika;
        if (baika !== null && genka !== null) { rieki = baika - genka; riekiPct = genka !== 0 ? (rieki / genka) * 100 : null; }
        setText('teika_out', teika !== null ? fmt(teika, 1) + ' 円' : '―');
        setText('baika_out', baika !== null ? fmt(baika, 1) + ' 円' : '―');
        setText('rieki_out', rieki !== null ? fmt(rieki, 1) + ' 円' : '―');
        setText('rieki_pct_out', riekiPct !== null ? fmt(riekiPct, 1) + ' %' : '―');
      };
      [g, rr, nr].forEach(el => el.addEventListener('input', calc));

      const rt = id('rev_teika'), r1 = id('rev_ritsu1'), r2 = id('rev_ritsu2');
      const calcRev = () => {
        const tv = num(rt.value), r1v = num(r1.value), r2v = num(r2.value);
        let genka = null;
        if (tv !== null && r1v !== null) { genka = tv / (1 + r1v / 100); setText('rev_genka_out', `${fmt(genka, 2)} 円`); }
        else setText('rev_genka_out', '―');
        if (genka !== null && r2v !== null && tv !== null) {
          const targetBaika = genka * (1 + r2v / 100);
          setText('rev_nebiki_out', `${fmt((1 - targetBaika / tv) * 100, 2)} %`);
        } else setText('rev_nebiki_out', '―');
      };
      [rt, r1, r2].forEach(el => el.addEventListener('input', calcRev));

      const mg = id('m_genka'), mt = id('m_total'), mn1 = id('m_n1'), md1 = id('m_d1'), mn2 = id('m_n2'), md2 = id('m_d2'), mtp = id('m_target_profit');
      const calcM = () => {
        const gv = num(mg.value), tv = num(mt.value), n1v = num(mn1.value), d1v = num(md1.value), n2v = num(mn2.value), d2v = num(md2.value), tpv = num(mtp.value);
        if ([gv, tv, n1v, d1v, n2v, d2v, tpv].some(v => v === null)) { setText('m_teika_out', '―'); return; }
        const coeff = (1 - d1v / 100) * n1v + (1 - d2v / 100) * n2v;
        if (coeff === 0) { setText('m_teika_out', '―'); return; }
        setText('m_teika_out', `${fmt((tpv + gv * tv) / coeff, 2)} 円`);
      };
      [mg, mt, mn1, md1, mn2, md2, mtp].forEach(el => el.addEventListener('input', calcM));

      const dcb = id('dc_base'), dch = id('dc_hours'), dcr = id('dc_rates');
      const calcDC = () => {
        const base = num(dcb.value), hours = num(dch.value);
        if (base === null || hours === null || !Number.isInteger(hours) || hours < 1) { setText('dc_out', '―'); return; }
        const rates = dcr.value.split(',').map(s => num(s.trim()));
        let total = 0;
        for (let i = 0; i < hours; i++) {
          const rate = (rates[i] !== undefined && rates[i] !== null) ? rates[i] : 0;
          total += base * (1 - rate / 100);
        }
        setText('dc_out', `${fmt(total, 1)} 円`);
      };
      [dcb, dch, dcr].forEach(el => el.addEventListener('input', calcDC));
    }
  },
// 6. 分担計算
  {
    id: 'buntan', label: '分担計算', glyph: '分',
    render: () => `
      <!-- 単位選択の追加 -->
      <div class="card" style="margin-bottom: 12px; padding: 12px;">
        <div class="field-row" style="margin-bottom: 0;">
          <label>計算に使用する単位</label>
          <div class="inputs">
            <select id="buntan_unit" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
              <option value="日" selected>日 (days)</option>
              <option value="時間">時間 (hours)</option>
              <option value="分">分 (minutes)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <p class="card-title">仕事算: 複数人(最大4人)で終える<span class="unit-text">日数</span></p>
        <p class="card-hint">例題:「Xは6<span class="unit-text">日</span>、Yは10<span class="unit-text">日</span>かかる仕事を2人でやると何<span class="unit-text">日</span>か」空欄は無視</p>
        <div class="field-row"><label>Aが1人で終える<span class="unit-text">日数</span></label><div class="inputs"><input type="number" id="a_days" placeholder="6"><span class="unit-label">日</span></div></div>
        <div class="field-row"><label>Bが1人で終える<span class="unit-text">日数</span></label><div class="inputs"><input type="number" id="b_days" placeholder="10"><span class="unit-label">日</span></div></div>
        <div class="field-row"><label>Cが1人で終える<span class="unit-text">日数</span>(任意)</label><div class="inputs"><input type="number" id="c_days" placeholder="15"><span class="unit-label">日</span></div></div>
        <div class="field-row"><label>Dが1人で終える<span class="unit-text">日数</span>(任意)</label><div class="inputs"><input type="number" id="d_days" placeholder=""><span class="unit-label">日</span></div></div>
        <div class="out-row"><span class="out-label">各自の1<span class="unit-text-rate">日</span>の仕事量</span><span class="out-val small" id="rates_out">―</span></div>
        <div class="out-row"><span class="out-label">全員でかかる<span class="unit-text">日数</span></span><span class="out-val" id="together_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">途中交代・分担型</p>
        <p class="card-hint">例題:「アヤ1人30<span class="unit-text">日</span>、アヤとエビ2人で18<span class="unit-text">日</span>。アヤが1人で始め途中エビに交代、合計33<span class="unit-text">日</span>で終了。アヤは何<span class="unit-text">日</span>？」</p>
        <div class="field-row"><label>1人目が1人でやる<span class="unit-text">日数</span></label><div class="inputs"><input type="number" id="sw_a_alone" placeholder="30"><span class="unit-label">日</span></div></div>
        <div class="field-row"><label>2人一緒だと何<span class="unit-text">日</span></label><div class="inputs"><input type="number" id="sw_together" placeholder="18"><span class="unit-label">日</span></div></div>
        <div class="field-row"><label>実際にかかった合計<span class="unit-text">日数</span></label><div class="inputs"><input type="number" id="sw_total" placeholder="33"><span class="unit-label">日</span></div></div>
        <div class="out-row"><span class="out-label">1人目(前半)が作業した<span class="unit-text">日数</span></span><span class="out-val" id="sw_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">分割払い</p>
        <div class="field-row"><label>支払い総額</label><div class="inputs"><input type="number" id="dp_total" placeholder="120000"><span class="unit-label">円</span></div></div>
        <div class="field-row"><label>分割回数</label><div class="inputs"><input type="number" id="dp_n" placeholder="12" step="1"><span class="unit-label">回</span></div></div>
        <div class="field-row"><label>すでに支払った回数</label><div class="inputs"><input type="number" id="dp_paid" placeholder="5" step="1"><span class="unit-label">回</span></div></div>
        <div class="out-row"><span class="out-label">1回あたりの支払額</span><span class="out-val" id="dp_perpay_out">―</span></div>
        <div class="out-row"><span class="out-label">既払い額</span><span class="out-val" id="dp_paidamt_out">―</span></div>
        <div class="out-row"><span class="out-label">残額</span><span class="out-val" id="dp_remain_out">―</span></div>
      </div>
      <p class="divider-hint" id="buntan_formula_hint">仕事算公式: 1÷(各自の1日の仕事量の合計)=共同日数 ／ 途中交代は連立方程式で解く</p>
    `,
    bind: () => {
      const uSelect = id('buntan_unit');
      const a = id('a_days'), b = id('b_days'), c = id('c_days'), d = id('d_days');
      const swa = id('sw_a_alone'), swt = id('sw_together'), swtot = id('sw_total');
      const dt = id('dp_total'), dn = id('dp_n'), dp = id('dp_paid');

      // 単位表記の更新処理
      const updateUnitLabels = () => {
        const unit = uSelect.value; // 「日」「時間」「分」
        
        // 語尾やラベル用（日数 -> 時間数 / 分数）
        const unitText = unit === '日' ? '日数' : unit === '時間' ? '時間' : '分';
        // 単一文字用（1日 -> 1時間 / 1分）
        const unitTextRate = unit;

        // 静的テキストの一括置換（レンダリングされたDOM要素内の対象クラスを書き換え）
        document.querySelectorAll('.card .unit-label').forEach(el => {
          if (el.textContent !== '円' && el.textContent !== '回') el.textContent = unit;
        });
        document.querySelectorAll('.card .unit-text').forEach(el => el.textContent = unitText);
        document.querySelectorAll('.card .unit-text-rate').forEach(el => el.textContent = unitTextRate);
        
        // 公式ヒント部分の更新
        const formulaHint = id('buntan_formula_hint');
        if (formulaHint) {
          formulaHint.textContent = `仕事算公式: 1÷(各自の1${unit}の仕事量の合計)=共同${unitText} ／ 途中交代は連立方程式で解く`;
        }

        // 単位が変わったら再計算
        calc();
        calcSw();
      };

      const calc = () => {
        const unit = uSelect.value;
        const vals = [num(a.value), num(b.value), num(c.value), num(d.value)].filter(v => v !== null && v > 0);
        if (vals.length < 1) { setText('rates_out', '―'); setText('together_out', '―'); return; }
        const rates = vals.map(v => 1 / v);
        setText('rates_out', vals.map(v => `1/${fmt(v, 0)}`).join(' , '));
        const sumRate = rates.reduce((s, r) => s + r, 0);
        setText('together_out', sumRate !== 0 ? `${fmt(1 / sumRate)} ${unit}` : '―');
      };
      [a, b, c, d].forEach(el => el.addEventListener('input', calc));

      const calcSw = () => {
        const unit = uSelect.value;
        const av = num(swa.value), tv = num(swt.value), totv = num(swtot.value);
        if (av === null || tv === null || totv === null || av === 0 || tv === 0) { setText('sw_out', '―'); return; }
        const rateB = 1 / tv - 1 / av;
        if (rateB <= 0) { setText('sw_out', '入力条件を見見直してください'); return; }
        const rateA = 1 / av;
        const denom = rateA - rateB;
        if (denom === 0) { setText('sw_out', '―'); return; }
        setText('sw_out', `${fmt((1 - totv * rateB) / denom, 2)} ${unit}`);
      };
      [swa, swt, swtot].forEach(el => el.addEventListener('input', calcSw));

      const calcDP = () => {
        const tv = num(dt.value), nv = num(dn.value), pv = num(dp.value);
        if (tv === null || nv === null || nv === 0) { setText('dp_perpay_out', '―'); setText('dp_paidamt_out', '―'); setText('dp_remain_out', '―'); return; }
        const per = tv / nv;
        setText('dp_perpay_out', `${fmt(per, 1)} 円`);
        if (pv !== null) {
          const paidAmt = per * pv;
          setText('dp_paidamt_out', `${fmt(paidAmt, 1)} 円 (${fmt(pv / nv * 100, 1)}%)`);
          setText('dp_remain_out', `${fmt(tv - paidAmt, 1)} 円`);
        } else { setText('dp_paidamt_out', '―'); setText('dp_remain_out', '―'); }
      };
      [dt, dn, dp].forEach(el => el.addEventListener('input', calcDP));

      // セレクトボックスの変更イベントを登録
      uSelect.addEventListener('change', updateUnitLabels);
    }
  },
  // 7. 速度算
  {
    id: 'hayasa', label: '速度算', glyph: '速',
    render: () => `
      <div class="card">
        <p class="card-title">速さ = 距離 ÷ 時間</p>
        <p class="card-hint">3つのうち2つ入力で残りを自動計算(単位自由選択)</p>
        <div class="field-row"><label>距離</label><div class="inputs"><input type="number" id="kyori" placeholder="12">${unitSelect('kyori_unit', 'distance', 'km')}</div></div>
        <div class="field-row"><label>時間</label><div class="inputs"><input type="number" id="jikan" placeholder="90">${unitSelect('jikan_unit', 'time', '分')}</div></div>
        <div class="field-row"><label>速さ</label><div class="inputs"><input type="number" id="hayasa" placeholder="8">${unitSelect('hayasa_unit', 'speed', 'km/時')}</div></div>
        <div class="out-row"><span class="out-label">計算結果</span><span class="out-val small" id="hayasa_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">往復の平均速度</p>
        <p class="card-hint">例題:「往路6km/時、T駅で2時間買い物、復路10km/時、往復4時間。平均時速は？」</p>
        <div class="field-row"><label>往路の速さ</label><div class="inputs"><input type="number" id="rt_v1" placeholder="6">${unitSelect('rt_v1_unit', 'speed', 'km/時')}</div></div>
        <div class="field-row"><label>復路の速さ</label><div class="inputs"><input type="number" id="rt_v2" placeholder="10">${unitSelect('rt_v2_unit', 'speed', 'km/時')}</div></div>
        <div class="out-row"><span class="out-label">滞在時間なしの平均速度</span><span class="out-val" id="rt_out">―</span></div>
        <p class="card-hint" style="margin-top:10px">滞在時間がある場合は下で直接計算↓</p>
        <div class="field-row"><label>移動のみの合計時間</label><div class="inputs"><input type="number" id="rt_movetime" placeholder="2">${unitSelect('rt_movetime_unit', 'time', '時間')}</div></div>
        <div class="out-row"><span class="out-label">片道距離</span><span class="out-val" id="rt_dist_out">―</span></div>
        <div class="out-row"><span class="out-label">往復の平均速度</span><span class="out-val" id="rt_avg2_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">旅人算(出会い・追いつき)</p>
        <div class="field-row"><label>2人の距離差</label><div class="inputs"><input type="number" id="tabi_kyori" placeholder="10">${unitSelect('tabi_kyori_unit', 'distance', 'km')}</div></div>
        <div class="field-row"><label>速さA</label><div class="inputs"><input type="number" id="tabi_a" placeholder="5">${unitSelect('tabi_a_unit', 'speed', 'km/時')}</div></div>
        <div class="field-row"><label>速さB</label><div class="inputs"><input type="number" id="tabi_b" placeholder="3">${unitSelect('tabi_b_unit', 'speed', 'km/時')}</div></div>
        <div class="radio-row">
          <label class="radio-opt"><input type="radio" name="tabi_mode" value="deai" checked> 出会う</label>
          <label class="radio-opt"><input type="radio" name="tabi_mode" value="oitsuki"> 追いつく</label>
        </div>
        <div class="out-row"><span class="out-label">かかる時間</span><span class="out-val" id="tabi_out">―</span></div>
      </div>
      <p class="divider-hint">単位換算: 秒速×3.6=時速(km/h) ／ 分速×60=時速(km/h)</p>
    `,
    bind: () => {
      const k = id('kyori'), j = id('jikan'), h = id('hayasa');
      const ku = id('kyori_unit'), ju = id('jikan_unit'), hu = id('hayasa_unit');
      const calc3 = () => {
        const kv = num(k.value), jv = num(j.value), hv = num(h.value);
        const filled = [kv, jv, hv].filter(v => v !== null).length;
        if (filled < 2) { setText('hayasa_out', '―'); return; }
        const kBase = kv !== null ? kv * UNITS.distance.factor[ku.value] : null;
        const jBase = jv !== null ? jv * UNITS.time.factor[ju.value] : null;
        const hBase = hv !== null ? hv * UNITS.speed.factor[hu.value] : null;
        if (kBase === null && jBase !== null && hBase !== null) {
          const resultM = jBase * hBase;
          setText('hayasa_out', `距離 = ${fmt(resultM)} m (${fmt(resultM / 1000, 3)} km)`);
        } else if (jBase === null && kBase !== null && hBase !== null) {
          if (hBase === 0) { setText('hayasa_out', '―'); return; }
          const resultSec = kBase / hBase;
          setText('hayasa_out', `時間 = ${fmt(resultSec)} 秒 (${fmt(resultSec / 60, 2)} 分)`);
        } else if (hBase === null && kBase !== null && jBase !== null) {
          if (jBase === 0) { setText('hayasa_out', '―'); return; }
          const resultMS = kBase / jBase;
          setText('hayasa_out', `速さ = ${fmt(resultMS)} m/秒 (${fmt(resultMS * 3.6, 2)} km/時)`);
        } else setText('hayasa_out', `距離=速さ×時間 が成立しています`);
      };
      [k, j, h, ku, ju, hu].forEach(el => el.addEventListener('input', calc3));

      const v1 = id('rt_v1'), v2 = id('rt_v2'), v1u = id('rt_v1_unit'), v2u = id('rt_v2_unit');
      const calcRT = () => {
        const v1v = num(v1.value), v2v = num(v2.value);
        if (v1v === null || v2v === null) { setText('rt_out', '―'); return; }
        const v1base = v1v * UNITS.speed.factor[v1u.value];
        const v2base = v2v * UNITS.speed.factor[v2u.value];
        if (v1base + v2base === 0) { setText('rt_out', '―'); return; }
        setText('rt_out', `${fmt(2 * v1base * v2base / (v1base + v2base) * 3.6, 3)} km/時`);
      };
      [v1, v2, v1u, v2u].forEach(el => el.addEventListener('input', calcRT));

      const rtmt = id('rt_movetime'), rtmtu = id('rt_movetime_unit');
      const calcRT2 = () => {
        const v1v = num(v1.value), v2v = num(v2.value), mtv = num(rtmt.value);
        if (v1v === null || v2v === null || mtv === null) { setText('rt_dist_out', '―'); setText('rt_avg2_out', '―'); return; }
        const v1base = v1v * UNITS.speed.factor[v1u.value];
        const v2base = v2v * UNITS.speed.factor[v2u.value];
        const mtBase = mtv * UNITS.time.factor[rtmtu.value];
        if (v1base === 0 || v2base === 0) { setText('rt_dist_out', '―'); setText('rt_avg2_out', '―'); return; }
        const dd = mtBase / (1 / v1base + 1 / v2base);
        setText('rt_dist_out', `${fmt(dd / 1000, 3)} km`);
        setText('rt_avg2_out', mtBase !== 0 ? `${fmt((2 * dd / mtBase) * 3.6, 3)} km/時` : '―');
      };
      [v1, v2, v1u, v2u, rtmt, rtmtu].forEach(el => el.addEventListener('input', calcRT2));

      const tk = id('tabi_kyori'), ta = id('tabi_a'), tb = id('tabi_b');
      const tku = id('tabi_kyori_unit'), tau = id('tabi_a_unit'), tbu = id('tabi_b_unit');
      const calcTabi = () => {
        const dist = num(tk.value), a = num(ta.value), b = num(tb.value);
        const mode = document.querySelector('input[name="tabi_mode"]:checked').value;
        if (dist === null || a === null || b === null) { setText('tabi_out', '―'); return; }
        const distBase = dist * UNITS.distance.factor[tku.value];
        const aBase = a * UNITS.speed.factor[tau.value];
        const bBase = b * UNITS.speed.factor[tbu.value];
        const speed = mode === 'deai' ? (aBase + bBase) : Math.abs(aBase - bBase);
        if (speed === 0) { setText('tabi_out', '追いつけません'); return; }
        const sec = distBase / speed;
        setText('tabi_out', `${fmt(sec / 3600, 3)} 時間 (${fmt(sec / 60, 1)} 分)`);
      };
      [tk, ta, tb, tku, tau, tbu].forEach(el => el.addEventListener('input', calcTabi));
      document.querySelectorAll('input[name="tabi_mode"]').forEach(el => el.addEventListener('change', calcTabi));
    }
  },
  // 8. 集合
  {
    id: 'shugo', label: '集合', glyph: '合',
    render: () => `
      <div class="card">
        <p class="card-title">2つの集合(ベン図)</p>
        <p class="card-hint">例題:「留学生300人中、英語200人、日本語120人、両方50人。片方だけ話せる人数は」</p>
        <div class="field-row"><label>全体の人数</label><div class="inputs"><input type="number" id="s_zentai" placeholder="300"><span class="unit-label">人</span></div></div>
        <div class="field-row"><label>Aに該当(A全体)</label><div class="inputs"><input type="number" id="s_a" placeholder="200"><span class="unit-label">人</span></div></div>
        <div class="field-row"><label>Bに該当(B全体)</label><div class="inputs"><input type="number" id="s_b" placeholder="120"><span class="unit-label">人</span></div></div>
        <div class="field-row"><label>AとB両方</label><div class="inputs"><input type="number" id="s_ab" placeholder="50"><span class="unit-label">人</span></div></div>
        <div class="out-row"><span class="out-label">AまたはB(A∪B)</span><span class="out-val" id="s_or_out">―</span></div>
        <div class="out-row"><span class="out-label">どちらも該当しない</span><span class="out-val" id="s_none_out">―</span></div>
        <div class="out-row"><span class="out-label">Aのみ</span><span class="out-val" id="s_aonly_out">―</span></div>
        <div class="out-row"><span class="out-label">Bのみ</span><span class="out-val" id="s_bonly_out">―</span></div>
        <div class="out-row"><span class="out-label">片方だけ該当</span><span class="out-val" id="s_either_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">3つの集合(各領域が既知の場合)</p>
        <div class="field-row"><label>Aのみ</label><div class="inputs"><input type="number" id="s3_a" placeholder="10"></div></div>
        <div class="field-row"><label>Bのみ</label><div class="inputs"><input type="number" id="s3_b" placeholder="15"></div></div>
        <div class="field-row"><label>Cのみ</label><div class="inputs"><input type="number" id="s3_c" placeholder="20"></div></div>
        <div class="field-row"><label>AとBのみ</label><div class="inputs"><input type="number" id="s3_ab" placeholder="5"></div></div>
        <div class="field-row"><label>BとCのみ</label><div class="inputs"><input type="number" id="s3_bc" placeholder="5"></div></div>
        <div class="field-row"><label>AとCのみ</label><div class="inputs"><input type="number" id="s3_ac" placeholder="5"></div></div>
        <div class="field-row"><label>A・B・C全部</label><div class="inputs"><input type="number" id="s3_abc" placeholder="3"></div></div>
        <div class="out-row"><span class="out-label">A∪B∪C の合計</span><span class="out-val" id="s3_out">―</span></div>
      </div>
      <p class="divider-hint">公式: A∪B=A+B-A∩B ／ 片方だけ=(A-A∩B)+(B-A∩B) ／ どちらも満たさない=全体-A∪B</p>
    `,
    bind: () => {
      const z = id('s_zentai'), a = id('s_a'), b = id('s_b'), ab = id('s_ab');
      const calc = () => {
        const zv = num(z.value), av = num(a.value), bv = num(b.value), abv = num(ab.value);
        if ([av, bv, abv].some(v => v === null)) {
          ['s_or_out', 's_none_out', 's_aonly_out', 's_bonly_out', 's_either_out'].forEach(k => setText(k, '―'));
          return;
        }
        const orv = av + bv - abv;
        setText('s_or_out', `${fmt(orv, 0)} 人`);
        setText('s_aonly_out', `${fmt(av - abv, 0)} 人`);
        setText('s_bonly_out', `${fmt(bv - abv, 0)} 人`);
        setText('s_either_out', `${fmt((av - abv) + (bv - abv), 0)} 人`);
        setText('s_none_out', zv !== null ? `${fmt(zv - orv, 0)} 人` : '全体人数を入力');
      };
      [z, a, b, ab].forEach(el => el.addEventListener('input', calc));

      const ids3 = ['s3_a', 's3_b', 's3_c', 's3_ab', 's3_bc', 's3_ac', 's3_abc'].map(x => id(x));
      const calc3 = () => {
        const vals = ids3.map(el => num(el.value));
        if (vals.some(v => v === null)) { setText('s3_out', '―'); return; }
        setText('s3_out', `${fmt(vals.reduce((s, v) => s + v, 0), 0)} 人`);
      };
      ids3.forEach(el => el.addEventListener('input', calc3));
    }
  },
  // 9. 表の読み取り
  {
    id: 'hyou', label: '表の読取', glyph: '表',
    render: () => `
      <div class="card">
        <p class="card-title">複数科目・複数人の平均点</p>
        <p class="card-hint">例題:「男子学生の3教科の平均点」</p>
        <div class="field-row"><label>点数リスト(カンマ区切り)</label><div class="inputs"><input type="text" class="wide" id="tb_scores" placeholder="80,90,70,85,60" style="width:170px"></div></div>
        <div class="out-row"><span class="out-label">合計</span><span class="out-val" id="tb_sum_out">―</span></div>
        <div class="out-row"><span class="out-label">平均</span><span class="out-val" id="tb_avg_out">―</span></div>
        <div class="out-row"><span class="out-label">最大値・最小値</span><span class="out-val small" id="tb_minmax_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">増加率・減少率</p>
        <div class="field-row"><label>前年(前月)の値</label><div class="inputs"><input type="number" id="ir_before" placeholder="500"></div></div>
        <div class="field-row"><label>今年(今月)の値</label><div class="inputs"><input type="number" id="ir_after" placeholder="620"></div></div>
        <div class="out-row"><span class="out-label">増減率</span><span class="out-val" id="ir_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">構成比(内訳の割合)</p>
        <div class="field-row"><label>各項目の値(カンマ区切り)</label><div class="inputs"><input type="text" class="wide" id="cp_vals" placeholder="120,80,50,50" style="width:170px"></div></div>
        <div class="out-row"><span class="out-label">合計</span><span class="out-val" id="cp_sum_out">―</span></div>
        <div class="out-row"><span class="out-label">各項目の構成比</span><span class="out-val small" id="cp_pct_out">―</span></div>
      </div>
      <p class="divider-hint">公式: 増加率(%)=(今年-前年)÷前年×100 ／ 構成比=各項目÷合計×100</p>
    `,
    bind: () => {
      const sc = id('tb_scores');
      const calcScores = () => {
        const vals = sc.value.split(',').map(s => num(s.trim())).filter(v => v !== null);
        if (vals.length === 0) { ['tb_sum_out', 'tb_avg_out', 'tb_minmax_out'].forEach(k => setText(k, '―')); return; }
        const sum = vals.reduce((a, b) => a + b, 0);
        setText('tb_sum_out', fmt(sum, 2));
        setText('tb_avg_out', fmt(sum / vals.length, 2));
        setText('tb_minmax_out', `最大 ${fmt(Math.max(...vals), 2)} / 最小 ${fmt(Math.min(...vals), 2)}`);
      };
      sc.addEventListener('input', calcScores);

      const ib = id('ir_before'), ia = id('ir_after');
      const calcIR = () => {
        const bv = num(ib.value), av = num(ia.value);
        if (bv === null || av === null || bv === 0) { setText('ir_out', '―'); return; }
        const rate = (av - bv) / bv * 100;
        setText('ir_out', `${rate >= 0 ? '+' : ''}${fmt(rate, 2)} %`);
      };
      [ib, ia].forEach(el => el.addEventListener('input', calcIR));

      const cv = id('cp_vals');
      const calcCP = () => {
        const vals = cv.value.split(',').map(s => num(s.trim())).filter(v => v !== null);
        if (vals.length === 0) { setText('cp_sum_out', '―'); setText('cp_pct_out', '―'); return; }
        const sum = vals.reduce((a, b) => a + b, 0);
        setText('cp_sum_out', fmt(sum, 2));
        setText('cp_pct_out', sum !== 0 ? vals.map((v, i) => `項目${i + 1}: ${fmt(v / sum * 100, 1)}%`).join('\n') : '―');
      };
      cv.addEventListener('input', calcCP);
    }
  },
  // 10. 特殊計算
  {
    id: 'tokushu', label: '特殊計算', glyph: '殊',
    render: () => `
      <div class="card">
        <p class="card-title">食塩水の濃度</p>
        <div class="field-row"><label>食塩水の量</label><div class="inputs"><input type="number" id="zenryo" placeholder="200">${unitSelect('zenryo_unit', 'mass', 'g')}</div></div>
        <div class="field-row"><label>濃度</label><div class="inputs"><input type="number" id="noudo_pct" placeholder="8"><span class="unit-label">%</span></div></div>
        <div class="out-row"><span class="out-label">食塩の量</span><span class="out-val" id="shokuen_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">2つの食塩水を混ぜる</p>
        <div class="field-row"><label>食塩水A 量/濃度</label>
          <div class="inputs"><input type="number" id="a_ryo" placeholder="量" style="width:56px">${unitSelect('a_ryo_unit', 'mass', 'g')}<input type="number" id="a_pct" placeholder="%" style="width:48px"></div>
        </div>
        <div class="field-row"><label>食塩水B 量/濃度</label>
          <div class="inputs"><input type="number" id="b_ryo" placeholder="量" style="width:56px">${unitSelect('b_ryo_unit', 'mass', 'g')}<input type="number" id="b_pct" placeholder="%" style="width:48px"></div>
        </div>
        <div class="out-row"><span class="out-label">混合後の量</span><span class="out-val" id="mix_ryo_out">―</span></div>
        <div class="out-row"><span class="out-label">混合後の濃度</span><span class="out-val" id="mix_pct_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">水槽算(2つの管で満水にする)</p>
        <p class="card-hint">例題:「太い管23分、細い管30分。最初7分は細い管、その後太い管。全部で何分」</p>
        <div class="field-row"><label>管1が満水にかかる時間</label><div class="inputs"><input type="number" id="tk_t1" placeholder="23">${unitSelect('tk_t1_unit', 'time', '分')}</div></div>
        <div class="field-row"><label>管2が満水にかかる時間</label><div class="inputs"><input type="number" id="tk_t2" placeholder="30">${unitSelect('tk_t2_unit', 'time', '分')}</div></div>
        <div class="field-row"><label>最初に管2を使う時間</label><div class="inputs"><input type="number" id="tk_first" placeholder="7">${unitSelect('tk_first_unit', 'time', '分')}</div></div>
        <div class="out-row"><span class="out-label">残りを管1で満たす時間</span><span class="out-val" id="tk_rest_out">―</span></div>
        <div class="out-row"><span class="out-label">合計時間</span><span class="out-val" id="tk_total_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">比の計算(A:B = C:?)</p>
        <div class="field-row"><label>比 A:B</label>
          <div class="inputs"><input type="number" id="ratio_a" placeholder="A" style="width:56px"><span>:</span><input type="number" id="ratio_b" placeholder="B" style="width:56px"></div>
        </div>
        <div class="field-row"><label>実際の数量(Aに対応)</label><div class="inputs"><input type="number" id="ratio_real_a" placeholder="30"></div></div>
        <div class="out-row"><span class="out-label">Bに対応する実際の数量</span><span class="out-val" id="ratio_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">年齢算</p>
        <div class="field-row"><label>現在の年齢差</label><div class="inputs"><input type="number" id="age_diff" placeholder="25"><span class="unit-label">歳</span></div></div>
        <div class="field-row"><label>目標の倍率(年上÷年下)</label><div class="inputs"><input type="number" id="age_ratio" placeholder="2" step="0.1"><span class="unit-label">倍</span></div></div>
        <div class="out-row"><span class="out-label">年下がその倍率になる年齢</span><span class="out-val" id="age_out">―</span></div>
      </div>
      <p class="divider-hint">公式: 食塩量=食塩水×濃度 ／ 混合濃度=(食塩量A+食塩量B)÷(量A+量B) ／ 水槽算は仕事算と同じ考え方</p>
    `,
    bind: () => {
      const z = id('zenryo'), np = id('noudo_pct'), zu = id('zenryo_unit');
      const calc1 = () => {
        const zv = num(z.value), nv = num(np.value);
        if (zv === null || nv === null) { setText('shokuen_out', '―'); return; }
        setText('shokuen_out', `${fmt(zv * UNITS.mass.factor[zu.value] * nv / 100, 2)} g`);
      };
      [z, np, zu].forEach(el => el.addEventListener('input', calc1));

      const ar = id('a_ryo'), ap = id('a_pct'), br = id('b_ryo'), bp = id('b_pct');
      const aru = id('a_ryo_unit'), bru = id('b_ryo_unit');
      const calc2 = () => {
        const arv = num(ar.value), apv = num(ap.value), brv = num(br.value), bpv = num(bp.value);
        if ([arv, apv, brv, bpv].some(v => v === null)) { setText('mix_ryo_out', '―'); setText('mix_pct_out', '―'); return; }
        const arG = arv * UNITS.mass.factor[aru.value];
        const brG = brv * UNITS.mass.factor[bru.value];
        const totalRyo = arG + brG;
        const totalSalt = arG * apv / 100 + brG * bpv / 100;
        setText('mix_ryo_out', `${fmt(totalRyo, 1)} g`);
        setText('mix_pct_out', totalRyo !== 0 ? `${fmt(totalSalt / totalRyo * 100, 2)} %` : '―');
      };
      [ar, ap, br, bp, aru, bru].forEach(el => el.addEventListener('input', calc2));

      const t1 = id('tk_t1'), t2 = id('tk_t2'), tf = id('tk_first');
      const t1u = id('tk_t1_unit'), t2u = id('tk_t2_unit'), tfu = id('tk_first_unit');
      const calcTank = () => {
        const t1v = num(t1.value), t2v = num(t2.value), tfv = num(tf.value);
        if (t1v === null || t2v === null || tfv === null) { setText('tk_rest_out', '―'); setText('tk_total_out', '―'); return; }
        const t1base = t1v * UNITS.time.factor[t1u.value];
        const t2base = t2v * UNITS.time.factor[t2u.value];
        const tfBase = tfv * UNITS.time.factor[tfu.value];
        const doneByT2 = (1 / t2base) * tfBase;
        const remaining = 1 - doneByT2;
        if (remaining < 0) { setText('tk_rest_out', '満水超過'); setText('tk_total_out', '満水超過'); return; }
        const restTime = remaining / (1 / t1base);
        setText('tk_rest_out', `${fmt(restTime / 60, 2)} 分`);
        setText('tk_total_out', `${fmt((tfBase + restTime) / 60, 2)} 分`);
      };
      [t1, t2, tf, t1u, t2u, tfu].forEach(el => el.addEventListener('input', calcTank));

      const ra = id('ratio_a'), rb = id('ratio_b'), rreal = id('ratio_real_a');
      const calcRatio = () => {
        const av = num(ra.value), bv = num(rb.value), realv = num(rreal.value);
        setText('ratio_out', (av !== null && bv !== null && realv !== null && av !== 0) ? fmt(realv / av * bv, 2) : '―');
      };
      [ra, rb, rreal].forEach(el => el.addEventListener('input', calcRatio));

      const ad = id('age_diff'), aratio = id('age_ratio');
      const calcAge = () => {
        const dv = num(ad.value), rv = num(aratio.value);
        if (dv === null || rv === null || rv <= 1) { setText('age_out', '―'); return; }
        setText('age_out', `${fmt(dv / (rv - 1), 2)} 歳`);
      };
      [ad, aratio].forEach(el => el.addEventListener('input', calcAge));
    }
  },
  // 11. C・P電卓
  {
    id: 'cp', label: 'C・P電卓', glyph: 'C',
    render: () => `
      <div class="card">
        <p class="card-title">nCr・nPr・n! を個別に計算</p>
        <div class="field-row"><label>n(全体の数)</label><div class="inputs"><input type="number" id="cp_n" placeholder="8" step="1"></div></div>
        <div class="field-row"><label>r(選ぶ・並べる数)</label><div class="inputs"><input type="number" id="cp_r" placeholder="3" step="1"></div></div>
        <div class="out-row"><span class="out-label">n!(階乗)</span><span class="out-val" id="cp_fact_out">―</span></div>
        <div class="out-row"><span class="out-label">r!(階乗)</span><span class="out-val" id="cp_factr_out">―</span></div>
        <div class="out-row"><span class="out-label">(n-r)!(階乗)</span><span class="out-val" id="cp_factnr_out">―</span></div>
        <div class="out-row"><span class="out-label">nPr</span><span class="out-val" id="cp_perm_out">―</span></div>
        <div class="out-row"><span class="out-label">nCr</span><span class="out-val" id="cp_comb_out">―</span></div>
        <div class="out-row"><span class="out-label">計算過程</span><span class="out-val small" id="cp_process_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">階乗だけを計算</p>
        <div class="field-row"><label>n!</label><div class="inputs"><input type="number" id="fact_only_n" placeholder="7" step="1"></div></div>
        <div class="out-row"><span class="out-label">結果</span><span class="out-val" id="fact_only_out">―</span></div>
      </div>
      <p class="divider-hint">公式: nPr = n!/(n-r)! ／ nCr = n!/(r!(n-r)!) = nPr/r! ／ nCr は nC(n-r) と同じ値</p>
    `,
    bind: () => {
      const n = id('cp_n'), r = id('cp_r');
      const calc = () => {
        const nv = num(n.value), rv = num(r.value);
        if (nv === null || rv === null || nv < 0 || rv < 0 || !Number.isInteger(nv) || !Number.isInteger(rv) || rv > nv || nv > 170) {
          const msg = nv > 170 ? '数が大きすぎます' : '―';
          ['cp_fact_out', 'cp_factr_out', 'cp_factnr_out', 'cp_perm_out', 'cp_comb_out'].forEach(k => setText(k, msg));
          setText('cp_process_out', '―');
          return;
        }
        const nf = fact(nv), rf = fact(rv), nrf = fact(nv - rv);
        const perm = nf / nrf, comb = perm / rf;
        setText('cp_fact_out', fmt(nf, 0));
        setText('cp_factr_out', fmt(rf, 0));
        setText('cp_factnr_out', fmt(nrf, 0));
        setText('cp_perm_out', fmt(perm, 0));
        setText('cp_comb_out', fmt(comb, 0));
        setText('cp_process_out', `${nv}C${rv} = ${nv}!/(${rv}!×${nv - rv}!) = ${fmt(comb, 0)}`);
      };
      [n, r].forEach(el => el.addEventListener('input', calc));

      const fn = id('fact_only_n');
      const calcFact = () => {
        const nv = num(fn.value);
        if (nv === null || nv < 0 || !Number.isInteger(nv) || nv > 170) { setText('fact_only_out', nv > 170 ? '数が大きすぎます' : '―'); return; }
        setText('fact_only_out', fmt(fact(nv), 0));
      };
      fn.addEventListener('input', calcFact);
    }
  },
  // 12. 分数計算
  {
    id: 'bunsu', label: '分数計算', glyph: '⁄',
    render: () => `
      <div class="card">
        <p class="card-title">分数の四則演算(自動で約分)</p>
        <div class="field-row"><label>分数1</label>
          <div class="inputs"><input type="number" id="f1_n" placeholder="分子" style="width:56px"><span>/</span><input type="number" id="f1_d" placeholder="分母" style="width:56px"></div>
        </div>
        <div class="field-row"><label>演算</label>
          <div class="inputs"><select id="f_op"><option value="add">+ 足し算</option><option value="sub">− 引き算</option><option value="mul">× 掛け算</option><option value="div">÷ 割り算</option></select></div>
        </div>
        <div class="field-row"><label>分数2</label>
          <div class="inputs"><input type="number" id="f2_n" placeholder="分子" style="width:56px"><span>/</span><input type="number" id="f2_d" placeholder="分母" style="width:56px"></div>
        </div>
        <div class="out-row"><span class="out-label">計算過程</span><span class="out-val small" id="f_process_out">―</span></div>
        <div class="out-row"><span class="out-label">結果(既約分数)</span><span class="out-val" id="f_result_out">―</span></div>
        <div class="out-row"><span class="out-label">結果(小数)</span><span class="out-val" id="f_decimal_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">約分</p>
        <div class="field-row"><label>分数</label>
          <div class="inputs"><input type="number" id="r_n" placeholder="分子" style="width:56px"><span>/</span><input type="number" id="r_d" placeholder="分母" style="width:56px"></div>
        </div>
        <div class="out-row"><span class="out-label">最大公約数(GCD)</span><span class="out-val" id="r_gcd_out">―</span></div>
        <div class="out-row"><span class="out-label">約分後</span><span class="out-val" id="r_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">通分(複数の分数の分母をそろえる)</p>
        <p class="card-hint">仕事算の「1/3+1/4」のような計算に。カンマ区切りで入力</p>
        <div class="field-row"><label>分数リスト</label><div class="inputs"><input type="text" class="wide" id="tsu_list" placeholder="1/3,1/4,1/6" style="width:150px"></div></div>
        <div class="out-row"><span class="out-label">最小公倍数(LCM)</span><span class="out-val" id="tsu_lcm_out">―</span></div>
        <div class="out-row"><span class="out-label">通分後の分数</span><span class="out-val small" id="tsu_out">―</span></div>
        <div class="out-row"><span class="out-label">それらの和(既約分数)</span><span class="out-val" id="tsu_sum_out">―</span></div>
      </div>
      <div class="card">
        <p class="card-title">最大公約数(GCD)・最小公倍数(LCM)</p>
        <div class="field-row"><label>数値1</label><div class="inputs"><input type="number" id="gl_a" placeholder="12" step="1"></div></div>
        <div class="field-row"><label>数値2</label><div class="inputs"><input type="number" id="gl_b" placeholder="18" step="1"></div></div>
        <div class="out-row"><span class="out-label">最大公約数(GCD)</span><span class="out-val" id="gl_gcd_out">―</span></div>
        <div class="out-row"><span class="out-label">最小公倍数(LCM)</span><span class="out-val" id="gl_lcm_out">―</span></div>
      </div>
      <p class="divider-hint">仕事算・分割払い・確率などで頻出する分数計算をここでまとめて処理できます</p>
    `,
    bind: () => {
      const f1n = id('f1_n'), f1d = id('f1_d'), fop = id('f_op'), f2n = id('f2_n'), f2d = id('f2_d');
      const calcF = () => {
        const n1 = num(f1n.value), d1 = num(f1d.value), n2 = num(f2n.value), d2 = num(f2d.value);
        if ([n1, d1, n2, d2].some(v => v === null) || d1 === 0 || d2 === 0) {
          ['f_process_out', 'f_result_out', 'f_decimal_out'].forEach(k => setText(k, '―'));
          return;
        }
        let rn, rd, opSym;
        switch (fop.value) {
          case 'add': rn = n1 * d2 + n2 * d1; rd = d1 * d2; opSym = '+'; break;
          case 'sub': rn = n1 * d2 - n2 * d1; rd = d1 * d2; opSym = '−'; break;
          case 'mul': rn = n1 * n2; rd = d1 * d2; opSym = '×'; break;
          case 'div': rn = n1 * d2; rd = d1 * n2; opSym = '÷'; break;
        }
        if (rd === 0) { ['f_process_out', 'f_result_out', 'f_decimal_out'].forEach(k => setText(k, '―(0除算)')); return; }
        const g = gcdFn(rn, rd) || 1;
        let simpN = rn / g, simpD = rd / g;
        if (simpD < 0) { simpN = -simpN; simpD = -simpD; }
        setText('f_process_out', `${n1}/${d1} ${opSym} ${n2}/${d2} = ${rn}/${rd}`);
        setText('f_result_out', `${simpN}/${simpD}`);
        setText('f_decimal_out', fmt(simpN / simpD, 4));
      };
      [f1n, f1d, fop, f2n, f2d].forEach(el => el.addEventListener('input', calcF));

      const rn = id('r_n'), rd = id('r_d');
      const calcR = () => {
        const nv = num(rn.value), dv = num(rd.value);
        if (nv === null || dv === null || dv === 0) { setText('r_gcd_out', '―'); setText('r_out', '―'); return; }
        const g = gcdFn(nv, dv) || 1;
        setText('r_gcd_out', fmt(g, 0));
        let simpN = nv / g, simpD = dv / g;
        if (simpD < 0) { simpN = -simpN; simpD = -simpD; }
        setText('r_out', `${simpN}/${simpD}`);
      };
      [rn, rd].forEach(el => el.addEventListener('input', calcR));

      const tsuList = id('tsu_list');
      const calcTsu = () => {
        const parts = tsuList.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const fracs = [];
        for (const p of parts) {
          const m = p.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
          if (!m) continue;
          const nn = parseInt(m[1], 10), dd = parseInt(m[2], 10);
          if (dd !== 0) fracs.push([nn, dd]);
        }
        if (fracs.length === 0) { ['tsu_lcm_out', 'tsu_out', 'tsu_sum_out'].forEach(k => setText(k, '―')); return; }
        let lcmAll = fracs[0][1];
        for (let i = 1; i < fracs.length; i++) lcmAll = lcmFn(lcmAll, fracs[i][1]);
        setText('tsu_lcm_out', fmt(lcmAll, 0));
        setText('tsu_out', fracs.map(([nn, dd]) => `${nn * (lcmAll / dd)}/${lcmAll}`).join('\n'));
        let sumN = 0;
        fracs.forEach(([nn, dd]) => { sumN += nn * (lcmAll / dd); });
        const g = gcdFn(sumN, lcmAll) || 1;
        setText('tsu_sum_out', `${sumN / g}/${lcmAll / g} (${fmt((sumN / g) / (lcmAll / g), 4)})`);
      };
      tsuList.addEventListener('input', calcTsu);

      const gla = id('gl_a'), glb = id('gl_b');
      const calcGL = () => {
        const av = num(gla.value), bv = num(glb.value);
        if (av === null || bv === null || !Number.isInteger(av) || !Number.isInteger(bv)) { setText('gl_gcd_out', '―'); setText('gl_lcm_out', '―'); return; }
        setText('gl_gcd_out', fmt(gcdFn(av, bv), 0));
        setText('gl_lcm_out', fmt(lcmFn(av, bv), 0));
      };
      [gla, glb].forEach(el => el.addEventListener('input', calcGL));
    }
  },
  // 13. 公式集
  {
    id: 'koushiki', label: '公式集', glyph: '§',
    render: () => `
      <div class="card">
        <p class="card-title">損益算・割合</p>
        ${formulaRow('定価', '= 原価 ×(1 + 利益率)')}
        ${formulaRow('売価', '= 定価 ×(1 − 値引率)')}
        ${formulaRow('利益', '= 売価 − 原価')}
        ${formulaRow('割合(%)', '= 部分 ÷ 全体 × 100')}
        ${formulaRow('n%増', '= 元の値 ×(1+ n/100)')}
        ${formulaRow('n%減', '= 元の値 ×(1− n/100)')}
        ${formulaRow('売上変化率', '=(1+価格変化率)×(1+数量変化率)−1')}
      </div>
      <div class="card">
        <p class="card-title">速度算</p>
        ${formulaRow('速さ', '= 距離 ÷ 時間')}
        ${formulaRow('距離', '= 速さ × 時間')}
        ${formulaRow('時間', '= 距離 ÷ 速さ')}
        ${formulaRow('出会い算', 'かかる時間 = 距離 ÷(速さA+速さB)')}
        ${formulaRow('追いつき算', 'かかる時間 = 距離差 ÷|速さA−速さB|')}
        ${formulaRow('往復平均速度', '= 2×v1×v2 ÷(v1+v2)(調和平均)')}
        ${formulaRow('単位換算', '秒速×3.6=時速(km/h)／分速×60=時速')}
      </div>
      <div class="card">
        <p class="card-title">仕事算・分担計算</p>
        ${formulaRow('1人の1日の仕事量', '= 1 ÷ かかる日数')}
        ${formulaRow('共同でかかる日数', '= 1 ÷(Aの仕事量+Bの仕事量+…)')}
        ${formulaRow('分割払い1回分', '= 支払総額 ÷ 分割回数')}
      </div>
      <div class="card">
        <p class="card-title">濃度算</p>
        ${formulaRow('食塩の量', '= 食塩水の量 × 濃度')}
        ${formulaRow('濃度', '= 食塩の量 ÷ 食塩水の量 × 100')}
        ${formulaRow('混合後の濃度', '=(食塩量A+食塩量B)÷(量A+量B)')}
        ${formulaRow('水を加える/蒸発', '食塩の量は変化しない')}
      </div>
      <div class="card">
        <p class="card-title">場合の数・確率</p>
        ${formulaRow('階乗', 'n! = n×(n−1)×…×2×1')}
        ${formulaRow('順列 nPr', '= n! ÷(n−r)!')}
        ${formulaRow('組み合わせ nCr', '= n! ÷(r!×(n−r)!)')}
        ${formulaRow('円順列', '=(n−1)!')}
        ${formulaRow('重複順列', '= n^r')}
        ${formulaRow('確率', '= 該当する場合の数 ÷ 全体の場合の数')}
        ${formulaRow('積の法則(独立)', 'P(A∩B) = P(A) × P(B)')}
        ${formulaRow('和の法則', 'P(A∪B) = P(A) + P(B) − P(A∩B)')}
        ${formulaRow('余事象', 'P(Aが起こらない) = 1 − P(A)')}
        ${formulaRow('少なくとも1つ', '= 1 − 全部起こらない確率')}
      </div>
      <div class="card">
        <p class="card-title">集合</p>
        ${formulaRow('和集合', 'A∪B = A + B − A∩B')}
        ${formulaRow('どちらも満たさない', '= 全体 − A∪B')}
        ${formulaRow('片方だけ', '=(A−A∩B)+(B−A∩B)')}
      </div>
      <div class="card">
        <p class="card-title">その他(比・年齢算・平均)</p>
        ${formulaRow('比例配分', 'A:B=C:D → D = C × B/A')}
        ${formulaRow('年齢差算', '年齢差は常に一定(何年後も変わらない)')}
        ${formulaRow('平均', '= 合計 ÷ 個数')}
        ${formulaRow('人口密度', '= 人口 ÷ 面積')}
      </div>
    `,
    bind: () => {}
  }
];

function formulaRow(name, eq) {
  return `<div class="formula-row"><span class="formula-name">${name}</span><span class="formula-eq">${eq}</span></div>`;
}

// ===================== DOM ヘルパー =====================
function id(x) { return document.getElementById(x); }
function setText(elId, text) { const el = document.getElementById(elId); if (el) el.textContent = text; }

// ===================== レンダリング & ナビゲーション =====================
const mainContent = document.getElementById('mainContent');
const unitStrip = document.getElementById('unitStrip');
const bottomNav = document.getElementById('bottomNav');

let currentId = TOOLS[0].id;

function renderAll() {
  // メインパネルを全部作る(初回のみ)
  TOOLS.forEach(tool => {
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = 'panel-' + tool.id;
    panel.innerHTML = tool.render();
    mainContent.appendChild(panel);
  });

  // ユニットストリップ(チップ)
  TOOLS.forEach((tool, idx) => {
    const chip = document.createElement('button');
    chip.className = 'unit-chip';
    chip.dataset.id = tool.id;
    chip.innerHTML = `<span class="num">${String(idx + 1).padStart(2, '0')}</span><span>${tool.label}</span>`;
    chip.addEventListener('click', () => selectTool(tool.id));
    unitStrip.appendChild(chip);
  });

  // ボトムナビ
  TOOLS.forEach(tool => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.dataset.id = tool.id;
    btn.innerHTML = `<span class="glyph">${tool.glyph}</span><span>${tool.label}</span>`;
    btn.addEventListener('click', () => selectTool(tool.id));
    bottomNav.appendChild(btn);
  });
}

function selectTool(toolId) {
  currentId = toolId;
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + toolId));
  document.querySelectorAll('.unit-chip').forEach(c => c.classList.toggle('active', c.dataset.id === toolId));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.id === toolId));

  const tool = TOOLS.find(t => t.id === toolId);
  if (tool && !tool._bound) {
    tool.bind();
    tool._bound = true;
  }

  // チップを表示範囲にスクロール
  const activeChip = document.querySelector(`.unit-chip[data-id="${toolId}"]`);
  if (activeChip) activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  const activeNav = document.querySelector(`.nav-btn[data-id="${toolId}"]`);
  if (activeNav) activeNav.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

  window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
}

renderAll();
selectTool(TOOLS[0].id);
