import { extractHeadings } from "@/components/TableOfContents";

type Props = {
  html: string;
  readTime: number;
};

export function ArticleLeadBox({ html, readTime }: Props) {
  const headings = extractHeadings(html).filter((h) => h.level === 2);

  if (headings.length < 2) return null;

  return (
    <div className="lead-box">
      <div className="lead-box__header">
        <p className="lead-box__title">この記事でわかること</p>
        <span className="lead-box__readtime">約{readTime}分で読めます</span>
      </div>
      <ul className="lead-box__list">
        {headings.map((h) => (
          <li key={h.id} className="lead-box__item">
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
