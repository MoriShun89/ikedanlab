import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link href="/">トップ</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="breadcrumb__item">
            <span className="breadcrumb__separator" aria-hidden="true">
              /
            </span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
