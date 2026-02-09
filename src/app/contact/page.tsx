import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "イケダンラボへのお問い合わせはこちらから",
};

export default function ContactPage() {
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

  return (
    <div className="container legal-page">
      <h1 className="legal-page__title">お問い合わせ</h1>

      <section className="legal-page__section">
        <p>
          当サイトに関するお問い合わせは、下記フォームよりお願いいたします。内容を確認のうえ、必要に応じてご返信いたします。
        </p>
        <ul className="legal-page__list">
          <li>返信にはお時間をいただく場合がございます</li>
          <li>すべてのお問い合わせに返信できるとは限りません</li>
          <li>
            商品やサービスに関するお問い合わせは、各サービスの提供元へ直接お問い合わせください
          </li>
        </ul>
      </section>

      {formUrl ? (
        <div className="contact-page__form-container">
          <iframe
            src={formUrl}
            className="contact-page__iframe"
            title="お問い合わせフォーム"
          >
            読み込んでいます...
          </iframe>
        </div>
      ) : (
        <section className="legal-page__section">
          <p className="contact-page__placeholder">
            お問い合わせフォームは現在準備中です。お急ぎの場合は、サイト運営者まで直接ご連絡ください。
          </p>
        </section>
      )}
    </div>
  );
}
