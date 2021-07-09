module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: false
  },
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  plugins: ["@babel"],
  rules: {
    "@babel/new-cap": "error",
    "@babel/no-invalid-this": "error",
    "@babel/no-unused-expressions": "error",
    "@babel/object-curly-spacing": "error",
    "@babel/semi": "error",
  },
};
