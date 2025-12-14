import '@testing-library/jest-dom';

// Mock the config module to avoid import.meta issues
jest.mock('./config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000',
  },
}));
