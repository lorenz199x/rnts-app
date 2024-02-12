# rnts-app

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Setup Prettier

We have to setup prettier config for the coding standard and discipline.

1. Go to VSCode Extensions and install Prettier.
2. Modify or Add .prettierrc.js

```bash
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  singleQuote: true,
  semi: true,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  endOfLine: 'auto',
};
```

3. Modify Workspace Settings. navigate 'File > Preferences > Settings'
4. Make sure you are in 'Workspace' Tab and not 'User' Tab
5. Set Prettier as 'Default Formatter' navigate 'File > Preferences > Settings' and search 'Formatter'
6. Enable 'Format On Save' navigate 'File > Preferences > Settings' and search 'Format On Save'

## Step 2: Setup ESLint

Setting up our own linting rules

1. Install eslint and plugins run. `yarn add eslint eslint-plugin-unused-imports eslint-plugin-simple-import-sort --dev`
2. Modify eslintrc.js

```bash
module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['unused-imports', 'simple-import-sort'],
  rules: {
    'no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^react', '^@?\\w'],
          ['^(@|components)(/.*|$)'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    'react-native/no-inline-styles': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
```

3. Rules are

```
- Do not allow unused imports
- Do not allow unused variable
- Do not allow inline styles
- Proper imports sort *error but fixable*
  Order:
    - React related imports *react, react-native*
    - Internal packages *@|components*
    - Side imports *import script.ts*
    - Parent imports *../*
    - Other relative imports. *./ - same folder imports*
    - Styles imports *.css, .scss*
- Prettier rules
```

## Step 3: Setup husky for commiting validations

Added pre-commit validation

1. Install husky `yarn add husky --dev`
2. Install lint-staged `yarn add lint-staged --dev`
3. Configure lint-staged in package.json

```bash
{
  ...,
  "lint-staged": {
    "src/**/*.{js,ts,tsx}": "eslint"
  }
}
```

4. Init husky `npx husky-init`
5. You should be able to see .husky folder
6. Install .husky dependencies `yarn install`
7. Add pre-commit hook `npx husky add .husky/pre-commit "yarn lint-staged"`

## Step 4: Setup alias

Setting up paths alias for import convenience

1. Install Babel Plugin Module Resolver as dev dependencies. `yarn add babel-plugin-module-resolver --dev`
2. Modify tsconfig.json

```bash
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@mocks/*": ["./__mocks__/*"],
      "@tests/*": ["./__tests__/*"],
      "@temps/*": ["./__temps__/*"],
      "@assets/*": ["./src/assets/*"],
      "@components/*": ["./src/components/*"],
      "@constants/*": ["./src/constants/*"],
      "@navigation/*": ["./src/navigation/*"],
      "@redux/*": ["./src/redux/*"],
      "@screens/*": ["./src/screens/*"],
      "@shared/*": ["./src/shared/*"],
      "@utils/*": ["./src/utils/*"],
      "@styles/*": ["./src/styles/*"],
      "@themes/*": ["./src/themes/*"]
    }
  }
}
```

3. Modify babel.config.js

```bash
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@mocks': './__mocks__',
          '@tests': './__tests__',
          '@temps': './__temps__',
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@shared': './src/shared',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@themes': './src/themes',
        },
      },
    ],
  ],
};
```

4. Install 'metro-react-native-babel-preset' and 'react-native-reanimated' by running this

```package.json
yarn add -D metro-react-native-babel-preset && yarn add react-native-reanimated
```

## Step 5: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 6: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
