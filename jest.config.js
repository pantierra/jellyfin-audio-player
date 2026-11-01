module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|i18n-js|make-plural)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
