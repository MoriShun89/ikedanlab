/**
 * インラインCTA付きテスト記事を3件投入するスクリプト
 * 実行: node scripts/seed-articles-v2.mjs
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;
const BASE = `https://${DOMAIN}.microcms.io/api/v1`;

async function post(endpoint, body) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${endpoint} failed (${res.status}): ${text}`);
  }
  return res.json();
}

// ============================================
// インラインCTA用ヘルパー
// ============================================

function bodyCta(label, text, url) {
  return `<div class="body-cta"><span class="body-cta__label">${label}</span><a href="${url}" target="_blank" rel="noopener noreferrer nofollow sponsored">${text}</a></div>`;
}

// ============================================
// 記事データ
// ============================================

const articles = [
  {
    // スキンケア — テーブル内リンク + セクション途中のインラインCTA
    title: "ニキビ跡を消したい男性へ｜原因別おすすめスキンケアと美容医療まとめ",
    slug: "acne-scar-care-men",
    categories: ["skincare"],
    description:
      "ニキビ跡のタイプ別（赤み・色素沈着・クレーター）に、セルフケアと美容医療それぞれのアプローチを解説します。",
    body: `
<h2>ニキビ跡の3タイプを知ることが最初の一歩</h2>
<p>「ニキビ跡」とひとくくりにされがちですが、実はタイプによって対処法がまったく違います。まず自分がどのタイプか確認しましょう。</p>

<table>
<thead>
<tr><th>タイプ</th><th>見た目</th><th>セルフケア</th><th>美容医療</th></tr>
</thead>
<tbody>
<tr><td>赤み（炎症後紅斑）</td><td>赤〜ピンクのシミ</td><td>ビタミンC美容液</td><td>IPL光治療</td></tr>
<tr><td>色素沈着</td><td>茶色いシミ</td><td>トラネキサム酸</td><td>ピーリング</td></tr>
<tr><td>クレーター</td><td>凹み・凸凹</td><td>レチノール</td><td>ダーマペン・フラクショナルレーザー</td></tr>
</tbody>
</table>

<p>赤みと色素沈着はセルフケアで改善できるケースが多いです。クレーターは残念ながらセルフケアだけでは限界があり、美容医療を視野に入れる必要があります。</p>

<h2>セルフケアでできること</h2>

<h3>赤み・色素沈着には「ビタミンC美容液」が鉄板</h3>
<p>ビタミンC（アスコルビン酸）には抗炎症作用と美白作用があり、ニキビ跡の赤みと色素沈着の両方にアプローチできます。</p>
<p>おすすめは<strong>メラノCC プレミアム美容液</strong>。ドラッグストアで1,600円程度と手が出しやすく、ロート製薬が手がける安心感もあります。朝晩の化粧水の後に2〜3滴使うだけ。</p>

${bodyCta("＼ ドラッグストアでも買える ／", "メラノCC プレミアム美容液 をAmazonで見る →", "https://example.com/melano-cc")}

<h3>クレーターには「レチノール」で地道にケア</h3>
<p>レチノール（ビタミンA）は肌のターンオーバーを促進し、浅いクレーターの改善に効果が期待できます。ただし刺激が強いため、<strong>最初は低濃度から始める</strong>のが鉄則。</p>
<p>使い始めの1〜2週間は赤みや皮むけが出ることがあります（レチノイド反応）。これは正常な反応なので、2〜3日に1回のペースから徐々に慣らしましょう。</p>

<h2>セルフケアで限界を感じたら美容医療へ</h2>

<p>半年セルフケアを続けても改善しないクレーターは、美容医療の検討をおすすめします。</p>

<table>
<thead>
<tr><th>施術</th><th>1回あたり</th><th>回数目安</th><th>ダウンタイム</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>ダーマペン4</td><td>15,000〜25,000円</td><td>3〜5回</td><td>2〜3日</td><td><a href="https://example.com/dermapen" target="_blank" rel="nofollow noopener sponsored">料金を見る</a></td></tr>
<tr><td>フラクショナルCO2レーザー</td><td>20,000〜40,000円</td><td>3〜5回</td><td>5〜7日</td><td><a href="https://example.com/fractional" target="_blank" rel="nofollow noopener sponsored">料金を見る</a></td></tr>
<tr><td>ピコフラクショナル</td><td>25,000〜50,000円</td><td>3〜5回</td><td>1〜2日</td><td><a href="https://example.com/pico" target="_blank" rel="nofollow noopener sponsored">料金を見る</a></td></tr>
</tbody>
</table>

<p>コスパとダウンタイムのバランスで考えると、<strong>まずはダーマペンから試す</strong>のが王道ルートです。月1回ペースで通い、3回終わった時点で効果を判断するのがおすすめ。</p>

${bodyCta("＼ 初回トライアル 9,800円 ／", "品川美容外科 ダーマペンの詳細はこちら →", "https://example.com/shinagawa-dermapen")}

<h2>まとめ：タイプ別の最適ルート</h2>
<ul>
<li><strong>赤み・色素沈着</strong> → まずビタミンC美容液を3ヶ月。改善しなければ皮膚科へ</li>
<li><strong>浅いクレーター</strong> → レチノールを半年 + ダーマペン3回が王道</li>
<li><strong>深いクレーター</strong> → フラクショナルレーザーで早めに対処</li>
</ul>
<p>共通して言えるのは「早く始めるほど改善しやすい」ということ。気になっているなら、今日からセルフケアを始めてみてください。</p>
`,
    affiliateLinks: [
      {
        fieldId: "affiliateLink",
        serviceName: "品川美容外科",
        url: "https://example.com/shinagawa",
        buttonText: "無料カウンセリングを予約する",
        badge: "ダーマペン初回 9,800円",
      },
      {
        fieldId: "affiliateLink",
        serviceName: "メラノCC プレミアム美容液",
        url: "https://example.com/melano-cc",
        buttonText: "Amazonで価格を見る",
      },
    ],
  },
  {
    // 脱毛 — テーブル内リンク + 複数のインラインCTA
    title: "ヒゲ脱毛の痛みはどのくらい？麻酔の種類と痛みを抑えるコツを解説",
    slug: "beard-hair-removal-pain",
    categories: ["epilation"],
    description:
      "ヒゲ脱毛の痛みを部位別に解説。麻酔クリーム・笑気麻酔の種類や、痛みを抑えるための選び方のポイントをまとめました。",
    body: `
<h2>医療脱毛の痛みについて</h2>
<p>「輪ゴムで弾かれる程度」とよく表現されますが、部位によって痛みの感じ方に差があるとされています。一般的な部位別の痛みの傾向は以下のとおりです。</p>

<h3>部位別の痛みの傾向</h3>
<table>
<thead>
<tr><th>部位</th><th>痛みレベル</th><th>一般的な傾向</th></tr>
</thead>
<tbody>
<tr><td>鼻下</td><td>★★★★★</td><td>毛が密集しており、痛みを感じやすい部位とされている</td></tr>
<tr><td>あご</td><td>★★★★☆</td><td>鼻下に次いで痛みを感じやすいとされる</td></tr>
<tr><td>あご下</td><td>★★★☆☆</td><td>中程度の痛みとされることが多い</td></tr>
<tr><td>もみあげ</td><td>★★☆☆☆</td><td>比較的痛みが少ないとされる</td></tr>
<tr><td>頬</td><td>★☆☆☆☆</td><td>痛みが少ない部位とされている</td></tr>
</tbody>
</table>

<p>毛が密集していて太い部位ほど痛みが強くなる傾向があります。回数を重ねて毛が減るにつれ、痛みは軽減する傾向にあります。</p>

<h2>麻酔の種類と効果</h2>

<table>
<thead>
<tr><th>麻酔の種類</th><th>費用</th><th>効果</th><th>対応クリニック例</th></tr>
</thead>
<tbody>
<tr><td>麻酔クリーム</td><td>1回 2,000〜3,000円</td><td>塗布部位の感覚が鈍くなる。痛みを50〜70%軽減</td><td><a href="https://example.com/mens-rize" target="_blank" rel="nofollow noopener sponsored">メンズリゼ</a>（無料）</td></tr>
<tr><td>笑気麻酔</td><td>1回 3,000〜4,000円</td><td>全身がぼんやりリラックス。痛みへの恐怖感が薄れる</td><td><a href="https://example.com/gorilla" target="_blank" rel="nofollow noopener sponsored">ゴリラクリニック</a>（4,000円）</td></tr>
<tr><td>麻酔クリーム＋笑気</td><td>1回 5,000〜7,000円</td><td>最強の組み合わせ。ほぼ無痛に近い</td><td><a href="https://example.com/reze" target="_blank" rel="nofollow noopener sponsored">レジーナクリニック</a></td></tr>
</tbody>
</table>

<p>麻酔クリームはコストを抑えつつ痛みを軽減できる選択肢です。笑気麻酔は痛みそのものよりも不安感を軽減する効果があるとされています。カウンセリング時に各クリニックの麻酔オプションを確認しましょう。</p>

${bodyCta("＼ 麻酔クリームが無料 ／", "メンズリゼの料金プランを見る →", "https://example.com/mens-rize")}

<h2>痛みを自分で抑える3つのコツ</h2>

<h3>1. 施術前日にしっかり保湿する</h3>
<p>肌が乾燥していると痛みが増します。前日の夜は化粧水+乳液をいつもより念入りに。</p>

<h3>2. 施術当日はカフェインを控える</h3>
<p>コーヒーやエナジードリンクに含まれるカフェインは、痛覚を敏感にする作用があります。施術の3時間前からは控えるのがベターです。</p>

<h3>3. 蓄熱式（SHR）のクリニックを選ぶ</h3>
<p>レーザーの照射方式には「熱破壊式」と「蓄熱式」の2種類があります。蓄熱式は低出力を連続照射するため、<strong>痛みが熱破壊式の半分以下</strong>と言われています。</p>
<p>ただし、太い毛への効果は熱破壊式の方が高いため、ヒゲが濃い人は最初の数回を蓄熱式で減らしてから熱破壊式に切り替えるハイブリッド方式を採用しているクリニックが理想です。</p>

${bodyCta("＼ 蓄熱式+熱破壊式のハイブリッド ／", "ゴリラクリニック ヒゲ脱毛の詳細を見る →", "https://example.com/gorilla")}

<h2>まとめ</h2>
<p>ヒゲ脱毛の痛みは麻酔や照射方式の選び方で軽減できるとされています。痛みが不安な方は、まずカウンセリングで麻酔オプションについて相談してみてください。</p>
`,
    affiliateLinks: [
      {
        fieldId: "affiliateLink",
        serviceName: "メンズリゼ",
        url: "https://example.com/mens-rize",
        buttonText: "無料カウンセリングを予約する",
        badge: "麻酔クリーム無料",
      },
      {
        fieldId: "affiliateLink",
        serviceName: "ゴリラクリニック",
        url: "https://example.com/gorilla",
        buttonText: "料金プランを見る",
        badge: "ヒゲ脱毛の実績No.1",
      },
    ],
  },
  {
    // AGA — テーブル内リンク + セクション中インラインCTA
    title: "オンラインAGA治療おすすめ5社を比較｜自宅で完結する薄毛治療の始め方",
    slug: "online-aga-clinic-comparison",
    categories: ["aga"],
    description:
      "オンライン完結のAGAクリニック5社を、料金・薬の種類・診察の丁寧さで比較しました。自宅にいながら月3,000円台から始められるAGA治療の全体像を解説します。",
    body: `
<h2>なぜ今オンラインAGA治療が人気なのか</h2>
<p>AGA治療のハードルは「恥ずかしさ」と「面倒さ」です。クリニックの待合室で他の患者と顔を合わせたくない。仕事が忙しくて月1回の通院が難しい。</p>
<p>オンライン診療はこの2つのハードルを完全に取り除きます。<strong>スマホで5分の診察→翌日に薬が届く→自宅で服用</strong>。これだけです。</p>

<h2>オンラインAGAクリニック5社比較</h2>

<table>
<thead>
<tr><th>クリニック名</th><th>フィナステリド</th><th>ミノキシジル内服</th><th>診察料</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td><a href="https://example.com/clinic-fore" target="_blank" rel="nofollow noopener sponsored">クリニックフォア</a></td><td>月3,412円</td><td>月6,919円</td><td>無料</td><td>最短翌日到着。定期縛りなし</td></tr>
<tr><td><a href="https://example.com/dmmclinic" target="_blank" rel="nofollow noopener sponsored">DMMオンラインクリニック</a></td><td>月3,420円</td><td>月5,478円</td><td>無料</td><td>DMMポイント還元あり</td></tr>
<tr><td><a href="https://example.com/agaskin" target="_blank" rel="nofollow noopener sponsored">AGAスキンクリニック</a></td><td>月3,700円</td><td>月7,700円</td><td>無料</td><td>対面院への切替が簡単</td></tr>
<tr><td><a href="https://example.com/banksclinic" target="_blank" rel="nofollow noopener sponsored">B&Hメディカルクリニック</a></td><td>月4,620円</td><td>月6,600円</td><td>無料</td><td>血液検査キット付きプランあり</td></tr>
<tr><td><a href="https://example.com/hairsdoctor" target="_blank" rel="nofollow noopener sponsored">ヘアーズドクター</a></td><td>月3,000円</td><td>月5,000円</td><td>1,650円</td><td>LINEで診察完結</td></tr>
</tbody>
</table>

<p>料金面では<strong>ヘアーズドクターのフィナステリド月3,000円</strong>が最安ですが、診察料が別途かかります。トータルで見ると<a href="https://example.com/clinic-fore" target="_blank" rel="nofollow noopener sponsored">クリニックフォア</a>と<a href="https://example.com/dmmclinic" target="_blank" rel="nofollow noopener sponsored">DMMオンラインクリニック</a>が診察無料かつ薬も安く、バランスが良いです。</p>

${bodyCta("＼ 初月0円キャンペーン中 ／", "クリニックフォアの料金プランを見る →", "https://example.com/clinic-fore")}

<h2>初心者はまず何を処方してもらうべき？</h2>

<h3>最初はフィナステリド単剤でOK</h3>
<p>まだ薄毛が初期段階なら、フィナステリド（抜け毛を防ぐ薬）だけで十分なケースが多いです。月3,000円台で始められるので、まずはこれで3〜6ヶ月様子を見ましょう。</p>

<h3>攻めたい人はミノキシジルを追加</h3>
<p>「もう結構薄くなっている」「早く効果を出したい」という人は、ミノキシジル内服を追加します。フィナ+ミノの併用で月8,000〜12,000円が相場です。</p>

<p>フィナステリド単剤の場合、効果が現れるまで3〜6ヶ月が目安とされています。効果が不十分な場合は、医師と相談のうえミノキシジルの追加を検討するケースが一般的です。</p>

${bodyCta("＼ 診察料無料・定期縛りなし ／", "DMMオンラインクリニックで無料相談する →", "https://example.com/dmmclinic")}

<h2>オンライン診療の流れ</h2>
<p>初めてだと不安かもしれませんが、拍子抜けするほど簡単です。</p>
<ol>
<li><strong>予約</strong>（Web or アプリから。当日予約可のクリニックも多い）</li>
<li><strong>問診票の記入</strong>（既往歴・服用中の薬・気になる部位を入力）</li>
<li><strong>ビデオ通話で診察</strong>（5〜10分。頭部の写真を見せるだけ）</li>
<li><strong>薬が届く</strong>（最短当日発送。翌日にはポストに届く）</li>
<li><strong>毎日服用</strong>（朝1錠飲むだけ。外用薬は夜1回塗布）</li>
</ol>

<h2>副作用について正直に話す</h2>
<p>フィナステリドの副作用として性欲減退・ED が挙げられます。発生頻度は臨床試験で1〜2%。「100人中1〜2人が感じる可能性がある」レベルです。</p>
<p>仮に副作用が出ても、<strong>服用をやめれば元に戻る</strong>のが確認されています。過度に怖がる必要はありませんが、気になる症状が出たらすぐに医師に相談できるのがオンラインクリニックの利点です。</p>

<h2>まとめ</h2>
<p>AGA治療は「気になったときが始めどき」。オンライン診療なら自宅から5分で診察が受けられ、月3,000円台から始められます。悩んでいる時間がもったいないので、まずは無料相談だけでも受けてみてください。</p>
`,
    affiliateLinks: [
      {
        fieldId: "affiliateLink",
        serviceName: "クリニックフォア",
        url: "https://example.com/clinic-fore",
        buttonText: "オンライン無料相談を予約する",
        badge: "初月0円キャンペーン中",
      },
      {
        fieldId: "affiliateLink",
        serviceName: "DMMオンラインクリニック",
        url: "https://example.com/dmmclinic",
        buttonText: "料金プランを確認する",
        badge: "DMMポイント還元あり",
      },
    ],
  },
];

// ============================================
// 実行
// ============================================

async function main() {
  console.log("インラインCTA付き記事の投入を開始します...\n");

  for (const data of articles) {
    const { title, slug, categories, description, body, affiliateLinks } = data;

    try {
      const result = await post("articles", {
        title,
        slug,
        categories,
        description,
        body,
        isPromotion: (affiliateLinks ?? []).length > 0,
        affiliateLinks: affiliateLinks ?? [],
      });
      console.log(`✓ ${title}`);
      console.log(`  ID: ${result.id}\n`);
    } catch (err) {
      console.error(`✗ ${title}`);
      console.error(`  ${err.message}\n`);
    }
  }

  console.log("完了しました。");
}

main();
