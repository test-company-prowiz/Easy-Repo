# grms-frontend/eslint.config.js

> **Source File:** [grms-frontend/eslint.config.js](https://github.com/test-company-prowiz/Easy-Repo/blob/master/grms-frontend/eslint.config.js)
> **Repository:** `Easy-Repo`
> **Branch:** `master`

# grms-frontend/eslint.config.js

### Overview
This file defines the ESLint configuration for the `grms-frontend` project. Its primary purpose is to enforce code quality, consistency, and identify potential issues within TypeScript and React files during development and build processes.

### Architecture & Role
This file operates within the development tooling layer of the frontend application. It is a static configuration file that dictates how the ESLint linter should analyze the project's source code, specifically targeting `.ts` and `.tsx` files. It does not contribute to the runtime behavior of the application but is crucial for maintaining code standards.

### Key Components
*   **`tseslint.config(...)`**: The main function used to define the ESLint configuration, provided by the `typescript-eslint` package.
*   **`ignores: ['dist']`**: Specifies directories or files that ESLint should explicitly skip during linting.
*   **`extends: [js.configs.recommended, ...tseslint.configs.recommended]`**: Incorporates recommended rule sets from both standard JavaScript ESLint and `typescript-eslint`.
*   **`files: ['**/*.ts,tsx']`**: Limits the application of this configuration block to TypeScript and TSX files.
*   **`languageOptions.globals: globals.browser`**: Configures the linter to recognize standard browser global variables.
*   **`plugins: {'react-hooks': reactHooks, 'react-refresh': reactRefresh}`**: Registers ESLint plugins for React Hooks and React Refresh.
*   **`rules`**: Defines specific linting rules, including extending recommended rules from `react-hooks` and adding a custom rule for `react-refresh/only-export-components`.

### Execution Flow / Behavior
When an ESLint command is executed (e.g., `eslint .` or via an IDE integration), this configuration file is loaded. ESLint then processes files matching `**/*.{ts,tsx}` (excluding `dist`), applying the combined recommended rules for JavaScript and TypeScript, along with specialized rules for React Hooks and React Refresh. The `react-refresh/only-export-components` rule specifically warns about non-component exports in modules that might interfere with React Fast Refresh.

### Dependencies
*   **`@eslint/js`**: Provides recommended base JavaScript ESLint configurations.
*   **`globals`**: A utility library offering definitions for global variables in various environments (e.g., `browser`).
*   **`eslint-plugin-react-hooks`**: An ESLint plugin that enforces rules of hooks for React.
*   **`eslint-plugin-react-refresh`**: An ESLint plugin integrated with React Fast Refresh to ensure compatibility and prevent issues related to module exports.
*   **`typescript-eslint`**: A set of tools that enables ESLint to lint TypeScript code, providing parsers, plugins, and recommended configurations.

### Design Notes
The configuration prioritizes a robust linting setup for a modern React and TypeScript frontend. Key design decisions include:
*   **Layered Configuration**: Extending recommended configurations (`js.configs.recommended`, `tseslint.configs.recommended`) provides a strong baseline, reducing the need to manually define common rules.
*   **TypeScript-First**: Explicitly targeting `.ts` and `.tsx` files with `typescript-eslint` ensures proper parsing and type-aware linting.
*   **React-Specific Linting**: Integration of `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` addresses common pitfalls and best practices specific to React development, especially critical for maintaining Fast Refresh functionality.
*   **Performance**: Ignoring the `dist` directory prevents linting of generated build output, which is unnecessary and improves linting speed.