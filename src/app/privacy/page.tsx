import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "イケダンラボのプライバシーポリシー・運営者情報・個人情報の取り扱いについて",
};

export default function PrivacyPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikedanlab.com";

  return (
    <div className="container legal-page">
      <h1 className="legal-page__title">プライバシーポリシー</h1>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">運営者情報</h2>
        <table className="legal-page__table">
          <tbody>
            <tr>
              <th>サイト名</th>
              <td>{siteName}</td>
            </tr>
            <tr>
              <th>サイトURL</th>
              <td>
                <a href={siteUrl}>{siteUrl}</a>
              </td>
            </tr>
            <tr>
              <th>運営者</th>
              <td>{siteName} 編集部</td>
            </tr>
            <tr>
              <th>お問い合わせ</th>
              <td>
                <Link href="/contact">お問い合わせフォーム</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">個人情報の取り扱いについて</h2>
        <p>
          当サイトでは、お問い合わせの際にお名前やメールアドレス等の個人情報をご入力いただく場合がございます。取得した個人情報は、お問い合わせへの回答や必要な情報のご連絡のみに利用し、それ以外の目的では利用いたしません。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">
          アクセス解析ツール（Google Analytics）について
        </h2>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Google
          Analytics」を使用しています。Google
          Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。Google
          Analyticsの利用規約およびプライバシーポリシーについては以下をご覧ください。
        </p>
        <ul className="legal-page__list">
          <li>
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics 利用規約
            </a>
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google プライバシーポリシー
            </a>
          </li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">
          アフィリエイトプログラムについて
        </h2>
        <p>
          当サイトでは、今後アフィリエイトプログラム（A8.net、もしもアフィリエイト等）に参加し、記事内にアフィリエイト広告（提携リンク）を掲載する場合があります。リンク先で商品の購入やサービスの申し込みが行われた場合、当サイトに報酬が支払われることがあります。
        </p>
        <p>
          アフィリエイト広告を掲載する際は、記事内およびサイト上にその旨を明示いたします。商品やサービスの紹介にあたっては、正確かつ公正な情報提供を心がけます。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">Cookieについて</h2>
        <p>
          当サイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用しています。Cookieとは、Webサイトがユーザーのコンピュータに保存する小さなテキストファイルです。
        </p>
        <p>
          Cookieの使用を望まない場合は、ブラウザの設定からCookieを無効にすることができます。ただし、Cookieを無効にした場合、当サイトの一部機能が正しく動作しない可能性があります。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">免責事項</h2>
        <p>
          当サイトに掲載される情報の正確性については万全を期しておりますが、その内容を保証するものではありません。詳しくは
          <Link href="/disclaimer">免責事項ページ</Link>
          をご覧ください。
        </p>
      </section>

      <p className="legal-page__date">制定日: 2026年2月8日</p>
    </div>
  );
}
