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
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-console': 'off', // 코드에서 console 객체를 사용하면 제거하도록 유도
    'react/react-in-jsx-scope': 'off', // JSX를 사용할 때 React가 import되어 있는지 확인하는 규칙
    'import/no-extraneous-dependencies': 0, // 외부 패키지 사용 가능
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-alert': 'off', // alert 끄기
    'no-useless-catch': 'off', // catch에서 error를 사용하지 않을 때 경고 표시

    // TypeScript 관련 규칙
    '@typescript-eslint/no-unused-vars': 'warn', // 사용하지 않는 변수에 대해 경고 표시
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 명시적인 모듈 경계 타입을 요구하는 규칙 비활성화
    '@typescript-eslint/no-explicit-any': 'off', // any 타입 사용을 허용

    // React 관련 규칙
    'react/prop-types': 'off', // prop-types 검사를 비활성화
    'react/jsx-uses-react': 'warn', // React를 사용하지 않는 JSX에 대해 경고 표시
    'react/jsx-uses-vars': 'warn', // JSX에서 사용된 변수에 대해 경고 표시
    'react/react-in-jsx-scope': 'warn', // JSX에서 React를 import하지 않았을 때 경고 표시
    'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 적용
    'react-hooks/exhaustive-deps': 'warn', // useEffect의 의존성 배열 누락에 대해 경고 표시
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
  },
  ignorePatterns: ['.eslintrc.cjs', 'tailwind.config.js', 'postcss.config.js'],
};
