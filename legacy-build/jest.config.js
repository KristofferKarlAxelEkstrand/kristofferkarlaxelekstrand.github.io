module.exports = {
	testEnvironment: 'node',
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
	coverageReporters: ['text'],
	testTimeout: 10000,
	maxWorkers: 1,
	bail: false,
	verbose: false,
};
