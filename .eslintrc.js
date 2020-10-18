module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['prettier', 'react-hooks'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                bracketSpacing: false,
                arrowParens: 'always',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                printWidth: 150,
                jsxBracketSameLine: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        '@typescript-eslint/no-var-requires': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
