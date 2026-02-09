"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_notice_dismissed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

export function CookieNotice() {
  const shouldShow = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  };

  if (!shouldShow) return null;

  return (
    <div className="cookie-notice">
      <p className="cookie-notice__text">
        当サイトではCookieを使用してアクセス解析を行っています。詳しくは
        <Link href="/privacy" className="cookie-notice__link">
          プライバシーポリシー
        </Link>
        をご覧ください。
      </p>
      <button
        className="cookie-notice__close"
        onClick={handleDismiss}
        type="button"
      >
        閉じる
      </button>
    </div>
  );
}
