const fs = require('fs');
const path = require('path');

describe('Content Validation', () => {
	let htmlContent;
	let doc;

	beforeAll(() => {
		const htmlFile = path.resolve(__dirname, '../docs/index.html');
		htmlContent = fs.readFileSync(htmlFile, 'utf8');
		doc = global.testUtils.parseHTML(htmlContent);
	});

	describe('HTML Structure', () => {
		test('proper DOCTYPE and structure', () => {
			expect(htmlContent).toMatch(/^<!doctype html>/i);

			const htmlElement = doc.querySelector('html');
			expect(htmlElement?.getAttribute('lang')).toMatch(/^[a-z]{2}(-[a-z]{2})?$/i);

			const title = doc.querySelector('title');
			expect(title?.textContent).toContain('Kristoffer');

			const h1 = doc.querySelector('h1');
			expect(h1?.textContent).toContain('Kristoffer');
		});

		test('semantic elements exist', () => {
			['header', 'main', 'footer'].forEach((tag) => {
				expect(doc.querySelector(tag)).toBeTruthy();
			});
		});
	});

	describe('Links and Security', () => {
		test('links are valid and secure', () => {
			const links = Array.from(doc.querySelectorAll('a'));

			links.forEach((link) => {
				expect(link.href).toBeTruthy();
				expect(link.textContent.trim()).not.toBe('');

				// External links must use HTTPS
				if (link.href.startsWith('http://') || link.href.startsWith('https://')) {
					expect(link.href).toMatch(/^https:\/\//);
				}
			});
		});

		test('email links are properly formatted', () => {
			expect(htmlContent).toMatch(/toffe@kristofferekstrand\.se/);
		});
	});

	describe('Content Sections', () => {
		test('major sections exist', () => {
			['projects', 'sites', 'work'].forEach((id) => {
				expect(doc.querySelector(`#${id}`)).toBeTruthy();
			});
		});

		test('key content is present', () => {
			expect(htmlContent).toContain('Adventure Kid Wave Forms');
			expect(htmlContent).toContain('AKWF FREE');
		});
	});

	describe('Meta Tags and Assets', () => {
		test('essential meta tags exist', () => {
			expect(htmlContent).toContain('charset="utf-8"');
			expect(htmlContent).toContain('name="viewport"');
			expect(htmlContent).toContain('name="description"');

			const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content');
			expect(desc?.length).toBeGreaterThan(50);
		});

		test('assets are referenced', () => {
			expect(htmlContent).toContain('styles/main.css');
			expect(htmlContent).toContain('scripts/app.js');
			expect(htmlContent).toContain('fonts.googleapis.com');
		});
	});
});
