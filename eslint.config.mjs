import sonarjs from 'eslint-plugin-sonarjs';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const eslintConfig = [
  // Base configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true, jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      sonarjs,
      custom: noJsxCommentsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      sonarjs,
    },
    rules: {
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-nested-ternary': 'error',
      'no-constant-binary-expression': 'error',
      complexity: ['warn', { max: 100 }],
      'max-lines-per-function': [
        'warn',
        { max: 1000, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      'no-unused-vars': 'off',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'warn',
    },
  },
];

export default eslintConfig;
