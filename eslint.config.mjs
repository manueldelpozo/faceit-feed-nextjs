import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type"
          ],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "next/**",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal",
              "position": "before"
            }
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          },
          "newlines-between": "never"
        }
      ],
    }
  }
];

export default eslintConfig;
