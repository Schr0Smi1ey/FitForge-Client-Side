import js from "@eslint/js";
// "globals" is a CommonJS package, so it can only be imported via its default
// export. The named `{ node }` import that used to be here made ESLint fail to
// load this file at all — before it linted a single source file — which is why
// `npm run lint` errored out rather than reporting lint problems.
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    // Generated / vendored output, none of it ours to lint. .vite/deps holds
    // Vite's pre-bundled, minified dependency cache and alone accounted for the
    // overwhelming majority of reported problems.
    ignores: [
      "dist",
      ".vite",
      ".firebase",
      "build",
      "coverage",
      "node_modules",
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        node: true,
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // This project doesn't use PropTypes anywhere; leaving the rule on would
      // report every component prop as a violation and drown real findings.
      "react/prop-types": "off",
      // React 17+ JSX transform means `import React` is unnecessary but harmless,
      // and the codebase still has it in places.
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^React$", argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Config and tooling files run in Node, not the browser.
    files: [
      "*.config.js",
      "vite.config.js",
      "tailwind.config.js",
      "postcss.config.js",
      "eslint.config.js",
    ],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: "module",
    },
  },
  {
    // Vitest exposes describe/it/expect as globals (test.globals = true).
    files: ["**/*.{test,spec}.{js,jsx}", "src/test/**"],
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
    },
  },
];
