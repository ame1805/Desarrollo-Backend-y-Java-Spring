import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig({
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: pluginReact,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:react/jsx-runtime", // para JSX runtime automático con React 17+
  ],
  rules: {
    // Puedes agregar reglas personalizadas aquí
  },
  settings: {
    react: {
      version: "detect", // Detecta la versión de React automáticamente
    },
  },
});
