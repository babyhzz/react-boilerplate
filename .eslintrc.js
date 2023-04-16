module.exports = {
  root: true, // 当前配置为根配置，将不再从上级文件夹查找配置
  extends: [
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    node: true,
    browser: true,
  },

  globals: {},
  parserOptions: {},
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        json: "never",
      },
    ],
  },
};
