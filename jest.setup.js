import '@testing-library/jest-dom';

// Mock structuredClone for older Node.js versions
if (!global.structuredClone) {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
