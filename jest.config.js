/** @type {import('jest').Config} */
const config = {
    verbose: false,
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/__fixtures__/',
        '/__tests__/__assets__/'
    ],
    testEnvironment: 'node',
};

module.exports = config;
