export function PrDisclosure() {
  const isActive = process.env.NEXT_PUBLIC_AFFILIATE_ACTIVE === "true";
  if (!isActive) return null;

  return (
    <div className="pr-disclosure">
      <p className="pr-disclosure__text">
        当サイトはアフィリエイト広告を利用しています
      </p>
    </div>
  );
}
