import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">
        ページが見つかりませんでした
      </p>
      <Link href="/" className="not-found__link">
        トップへ戻る
      </Link>
    </div>
  );
}
