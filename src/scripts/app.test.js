// Basic functionality test
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

// App initialization test
describe('App Initialization', () => {
	test('console.log is available', () => {
		expect(typeof console.log).toBe('function');
	});

	test('document is available in jsdom', () => {
		expect(typeof document).toBe('object');
		expect(document).toBeTruthy();
	});
});

// Portfolio content validation
describe('Portfolio Content', () => {
	beforeAll(() => {
		// Load the HTML content for testing
		const fs = require('fs');
		const path = require('path');
		const html = fs.readFileSync(path.resolve(__dirname, '../../docs/index.html'), 'utf8');
		document.body.innerHTML = html;
	});

	test('HTML document loads correctly', () => {
		expect(document.body).toBeTruthy();
	});

	test('main element exists', () => {
		const main = document.querySelector('main');
		expect(main).toBeTruthy();
	});

	test('header contains correct title', () => {
		const h1 = document.querySelector('h1');
		expect(h1).toBeTruthy();
		expect(h1.textContent).toContain('Kristoffer');
	});

	test('navigation links exist', () => {
		const links = document.querySelectorAll('a');
		expect(links.length).toBeGreaterThan(0);
	});

	test('projects section exists', () => {
		const projectsSection = document.querySelector('#projects');
		expect(projectsSection).toBeTruthy();
	});
});
