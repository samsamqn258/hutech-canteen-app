module.exports = {
    extends: ['expo', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 100,
                tabWidth: 4,
                singleQuote: true,
                bracketSameLine: true,
            },
        ],
        eslintConfig: {
            extends: 'universe/native',
        },
    },

    env: {
        browser: true,
        node: true,
    },
};
