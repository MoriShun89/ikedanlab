import Link from "next/link";
import { CATEGORIES } from "@/lib/microcms";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo">
          {siteName}
        </Link>
        <nav className="header__nav-desktop">
          <ul className="header__nav">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link href={`/articles?category=${cat.id}`}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu categories={CATEGORIES} />
      </div>
    </header>
  );
}
