import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },

  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        process: "readonly", // Explicitly defining process as a global variable
      },
      env: {
        browser: true,
        node: true, // Adding node environment
      },
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  /* { languageOptions: { globals: globals.browser } }, */
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
