import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免責事項",
  description: "イケダンラボの免責事項について",
};

export default function DisclaimerPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";

  return (
    <div className="container legal-page">
      <h1 className="legal-page__title">免責事項</h1>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">広告について</h2>
        <p>
          {siteName}
          （以下「当サイト」）では、今後アフィリエイトプログラムを利用して商品・サービスを紹介する場合があります。記事内のリンクを経由して商品の購入やサービスへの申し込みが行われた場合、当サイトに報酬が支払われることがあります。
        </p>
        <p>
          商品やサービスの紹介にあたっては公正な情報提供を心がけ、報酬の有無が記事の内容や評価に影響を与えることはありません。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">情報の正確性について</h2>
        <p>
          当サイトに掲載されている情報は、掲載時点において可能な限り正確な情報を提供するよう努めておりますが、その内容の正確性、完全性、最新性を保証するものではありません。
        </p>
        <p>
          掲載している商品・サービスの価格、内容、仕様等は予告なく変更される場合があります。最新の情報については、各商品・サービスの公式サイトをご確認ください。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">商品・サービスについて</h2>
        <p>
          当サイトで紹介する商品やサービスの効果・効能には個人差があります。当サイトの情報を参考にして行われた行動の結果について、当サイトは一切の責任を負いません。商品の購入やサービスの利用は、ご自身の判断と責任のもとで行ってください。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">医療情報について</h2>
        <p>
          当サイトではAGA治療や医療脱毛に関する情報を掲載していますが、これらの情報は一般的な情報提供を目的としたものであり、医療アドバイスではありません。
        </p>
        <p>
          治療に関する判断は、必ず医師をはじめとする医療専門家にご相談ください。当サイトの情報に基づいて行われた医療行為の結果について、当サイトは一切の責任を負いません。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">リンク先について</h2>
        <p>
          当サイトから外部サイトへのリンクを設置していますが、リンク先サイトの内容・安全性について当サイトは一切の責任を負いません。リンク先での商品の購入やサービスの利用については、リンク先の利用規約等をご確認のうえ、ご自身の責任で行ってください。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">著作権について</h2>
        <p>
          当サイトに掲載されている文章・画像等のコンテンツの著作権は、当サイトまたは正当な権利を有する第三者に帰属します。無断での転載・複製はお断りいたします。引用については、出典を明記したうえで適切な範囲でお願いいたします。
        </p>
      </section>

      <p className="legal-page__date">
        制定日: 2026年2月8日
        <br />
        <Link href="/privacy">プライバシーポリシーはこちら</Link>
      </p>
    </div>
  );
}
