module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        //'airbnb/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        'no-new': 0,
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'warn',
        'class-methods-use-this': 'off',
        /*
        "import/extensions": [
            "error",
            "ignorePackages",
            {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
            }
        ]
        */
    },
}
