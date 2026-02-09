export function AuthorBox() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";

  return (
    <div className="author-box">
      <div className="author-box__icon" aria-hidden="true">
        {siteName.charAt(0)}
      </div>
      <div className="author-box__info">
        <p className="author-box__name">{siteName} 編集部</p>
        <div className="author-box__credentials">
          <span className="author-box__credential">体験に基づくレビュー</span>
          <span className="author-box__credential">忖度なしの評価</span>
        </div>
        <p className="author-box__bio">
          20代・30代の男性に向けて、スキンケア・脱毛・AGA治療などの美容情報を実体験ベースで発信しています。
        </p>
      </div>
    </div>
  );
}
