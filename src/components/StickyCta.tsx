"use client";

import { useState, useEffect } from "react";
import type { AffiliateLink } from "@/lib/microcms";

type Props = {
  link: AffiliateLink;
};

export function StickyCta({ link }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setVisible(progress >= 0.3 && progress <= 0.9);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-cta">
      <div className="sticky-cta__inner">
        <span className="sticky-cta__label">{link.serviceName}</span>
        <a
          href={link.url}
          className="sticky-cta__button"
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
        >
          {link.buttonText || "詳しく見る"}
          <span className="sticky-cta__arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
