"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Category = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
};

type Props = {
  categories: readonly Category[];
};

export function MobileMenu({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // 画面遷移時にメニューを閉じる
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="mobile-menu__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
      >
        <span className={`mobile-menu__icon ${isOpen ? "mobile-menu__icon--open" : ""}`} />
      </button>

      {isOpen && (
        <div className="mobile-menu__overlay" onClick={() => setIsOpen(false)}>
          <nav
            className="mobile-menu__nav"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/"
              className="mobile-menu__link"
              onClick={() => setIsOpen(false)}
            >
              トップ
            </Link>
            <Link
              href="/articles"
              className="mobile-menu__link"
              onClick={() => setIsOpen(false)}
            >
              記事一覧
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/articles?category=${cat.id}`}
                className="mobile-menu__link"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
