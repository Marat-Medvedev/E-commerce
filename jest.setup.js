import '@testing-library/jest-dom';

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
