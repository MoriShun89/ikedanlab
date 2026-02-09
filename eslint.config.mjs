import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Next.js Core Web Vitals ルール（推奨）
  ...nextVitals,

  // TypeScript 用ルール
  ...nextTs,

  // 無視するファイル・ディレクトリ
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "public/**",
    "next-env.d.ts",
  ]),

  // プロジェクト固有のルール上書き
  {
    rules: {
      // 未使用変数は警告（_ プレフィックスは許可）
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // any 型の使用は警告にとどめる
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
