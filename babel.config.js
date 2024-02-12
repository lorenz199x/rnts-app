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
