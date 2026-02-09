import Link from "next/link";

export function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";
  const affiliateActive =
    process.env.NEXT_PUBLIC_AFFILIATE_ACTIVE === "true";

  return (
    <footer className="footer">
      <ul className="footer__links">
        <li>
          <Link href="/">トップ</Link>
        </li>
        <li>
          <Link href="/privacy">プライバシーポリシー</Link>
        </li>
        <li>
          <Link href="/disclaimer">免責事項</Link>
        </li>
        <li>
          <Link href="/contact">お問い合わせ</Link>
        </li>
      </ul>
      <p>
        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
      </p>
      {affiliateActive && (
        <p className="footer__affiliate-note">
          ※ 当サイトはアフィリエイトプログラムに参加しています。
        </p>
      )}
    </footer>
  );
}
