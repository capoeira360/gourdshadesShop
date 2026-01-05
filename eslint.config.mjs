import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
        "**/node_modules/**",
        "**/.next/**",
        "**/public/**",
        "**/slider_1-main/**",
        "**/deployment-package/**",
        "**/dist/**",
        "**/out/**"
    ]
  },
  {
      files: ["src/**/*.{ts,tsx}"],
      rules: {
          "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
          "@typescript-eslint/no-explicit-any": "warn",
          "react/no-unescaped-entities": "off",
          "@typescript-eslint/ban-ts-comment": "warn"
      }
  }
];

export default eslintConfig;
