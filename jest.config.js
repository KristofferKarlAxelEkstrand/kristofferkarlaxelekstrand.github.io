module.exports = {
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src/scripts', '<rootDir>/test'],
	testMatch: ['**/*.test.js'],
	setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
	collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 0,
			statements: 0,
		},
	},
	coverageReporters: ['text', 'lcov', 'html'],
	// Add test timeout for long-running build tests
	testTimeout: 30000,
	// Add verbose output for better debugging
	verbose: true,
	// Add custom test environment setup
	testEnvironmentOptions: {
		// Configure jsdom for better HTML parsing
		html: '<html lang="en"><body></body></html>',
		url: 'https://kristofferkarlaxelekstrand.github.io',
		userAgent: 'Jest-Test-Agent/1.0',
	},
	// Add module name mapping for easier imports
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@test/(.*)$': '<rootDir>/test/$1',
	},
	// Add transform configuration for better module handling
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	// Add module file extensions
	moduleFileExtensions: ['js', 'json'],
	// Add test results processor for better reporting
	testResultsProcessor: null,
};
