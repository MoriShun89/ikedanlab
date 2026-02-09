import Link from "next/link";

export function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";
  const affiliateActive =
    process.env.NEXT_PUBLIC_AFFILIATE_ACTIVE === "true";
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container container--wide">
        <p className="footer__prompt">
          {">"} {siteName} v1.0
        </p>
        <ul className="footer__links">
          <li>
            <Link href="/">~/home</Link>
          </li>
          <li>
            <Link href="/privacy">~/privacy</Link>
          </li>
          <li>
            <Link href="/disclaimer">~/disclaimer</Link>
          </li>
          <li>
            <Link href="/contact">~/contact</Link>
          </li>
        </ul>
        <p className="footer__copyright">
          &copy; {year} {siteName}. All rights reserved.
        </p>
        {affiliateActive && (
          <p className="footer__affiliate-note">
            # 当サイトはアフィリエイトプログラムに参加しています。
          </p>
        )}
      </div>
    </footer>
  );
}
