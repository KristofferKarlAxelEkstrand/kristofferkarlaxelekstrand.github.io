module.exports = {
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/test'],
	testMatch: ['**/*.test.js'],
	setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
	collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
		},
	},
	coverageReporters: ['text', 'lcov'],
	testTimeout: 30000,
};
