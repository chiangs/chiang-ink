import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Ignore generated and build output
  {
    ignores: [
      "build/**",
      ".react-router/**",
      "node_modules/**",
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React hooks rules
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // set-state-in-effect fires on valid patterns: initialising from
      // localStorage, responding to route changes, mount-once guards.
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Project-wide overrides
  {
    rules: {
      // Allow `any` where TypeScript genuinely can't infer (e.g. D3 generics)
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars — warn, allow _-prefixed intentional ignores
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
