import type { AffiliateLink } from "@/lib/microcms";

type Props = {
  link: AffiliateLink;
};

export function AffiliateBox({ link }: Props) {
  return (
    <div className="affiliate-box">
      {link.badge && (
        <span className="affiliate-box__badge">{link.badge}</span>
      )}
      <p className="affiliate-box__name">{link.serviceName}</p>
      {link.description && (
        <p className="affiliate-box__desc">{link.description}</p>
      )}
      <a
        href={link.url}
        className="affiliate-box__cta"
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
      >
        {link.buttonText || "公式サイトで詳しく見る"}
        <span className="affiliate-box__arrow" aria-hidden="true">→</span>
      </a>
      <p className="affiliate-box__note">PR（提携リンクを含みます）</p>
    </div>
  );
}
