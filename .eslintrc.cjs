module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': 'off', //코드에서 console 객체를 사용하면 제거하도록 유도
    'react/react-in-jsx-scope': 'off', // JSX를 사용할 때 React가 import되어 있는지 확인하는 규칙
    'import/no-extraneous-dependencies': 0, // 외부 패키지 사용 가능
    'no-alert': 'off', // alert 끄기
  },
  ignorePatterns: ['.eslintrc.cjs', 'tailwind.config.js', 'postcss.config.js'],
};
