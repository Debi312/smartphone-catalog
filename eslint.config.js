import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescript from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
    { ignores: ["dist", "build", "node_modules", "webpack.config.ts", "coverage"] },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/set-state-in-effect": "off",
            "no-unused-vars": "off",
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: typescript.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        rules: {
            ...typescript.configs.recommended.rules,
            "react-hooks/set-state-in-effect": "off",
            "no-unused-vars": "off",
        },
    },
    {
        files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                jest: "readonly",
                global: "readonly",
            },
        },
    },
    prettier,
]
