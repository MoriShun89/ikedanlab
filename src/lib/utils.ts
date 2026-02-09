import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

/** ISO日付を「2025年1月15日」形式に変換 */
export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "yyyy年M月d日", { locale: ja });
  } catch {
    return dateStr;
  }
}

/** HTMLからテキストを抽出し、読了時間（分）を算出（日本語: 約500文字/分） */
export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const minutes = Math.ceil(text.length / 500);
  return Math.max(1, minutes);
}
