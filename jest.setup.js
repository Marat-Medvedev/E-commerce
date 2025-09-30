import '@testing-library/jest-dom';

// Mock matchMedia for next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock structuredClone for older Node.js versions
if (!global.structuredClone) {
  global.structuredClone = (obj) => {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      // Fallback for objects that can't be serialized
      return obj;
    }
  };
}
