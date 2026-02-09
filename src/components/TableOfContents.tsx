import * as cheerio from "cheerio";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  html: string;
};

export function extractHeadings(html: string): TocItem[] {
  const $ = cheerio.load(html);
  const headings: TocItem[] = [];

  $("h2, h3").each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) return;
    const level = el.type === "tag" && el.name === "h2" ? 2 : 3;
    const id = `heading-${headings.length}`;
    headings.push({ id, text, level });
  });

  return headings;
}

export function addIdsToHeadings(html: string, headings: TocItem[]): string {
  const $ = cheerio.load(html);
  let index = 0;

  $("h2, h3").each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) return;
    if (index < headings.length) {
      $el.attr("id", headings[index].id);
      index++;
    }
  });

  return $("body").html() ?? html;
}

export function TableOfContents({ html }: Props) {
  const headings = extractHeadings(html);

  if (headings.length < 2) return null;

  return (
    <nav className="toc" aria-label="目次">
      <p className="toc__title">INDEX</p>
      <ol className="toc__list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc__item ${h.level === 3 ? "toc__item--sub" : ""}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
