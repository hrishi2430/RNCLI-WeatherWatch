module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensure Babel handles JS/TS files
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    'react-native-vector-icons': '<rootDir>/__mocks__/react-native-vector-icons.js',
    '^react-redux$': '<rootDir>/__mocks__/react-redux.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons)/)',
  ],
};
