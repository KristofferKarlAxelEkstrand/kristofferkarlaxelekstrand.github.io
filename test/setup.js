// Test setup file for Jest configuration

// Global test utilities
global.testUtils = {
	// Helper to parse HTML content for testing
	parseHTML: (htmlContent) => {
		return {
			querySelector: (selector) => {
				if (selector === 'title') {
					const match = htmlContent.match(/<title>(.*?)<\/title>/);
					return match ? { textContent: match[1] } : null;
				}
				if (selector === 'h1') {
					const match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
					return match ? { textContent: match[1] } : null;
				}
				if (selector === 'html') {
					const match = htmlContent.match(/<html[^>]*lang="([^"]*)"[^>]*>/);
					return match ? { getAttribute: () => match[1] } : null;
				}
				if (['main', 'header', 'footer'].includes(selector)) {
					return htmlContent.includes(`<${selector}`) ? { children: [{}] } : null;
				}
				if (selector === 'meta[name="description"]') {
					const match = htmlContent.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/);
					return match ? { getAttribute: () => match[1] } : null;
				}
				if (selector.startsWith('#')) {
					const id = selector.substring(1);
					return htmlContent.includes(`id="${id}"`) ? { tagName: 'SECTION' } : null;
				}
				return null;
			},
			querySelectorAll: (selector) => {
				if (selector === 'a') {
					const links = [];
					const regex = /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g;
					let match;
					while ((match = regex.exec(htmlContent)) !== null) {
						links.push({ href: match[1], textContent: match[2] });
					}
					return links;
				}
				return [];
			},
			getElementById: (id) => (htmlContent.includes(`id="${id}"`) ? {} : null),
		};
	},

	// Helper to validate CSS content
	validateCSS: (cssContent) => {
		if (!cssContent || typeof cssContent !== 'string') {
			return { isValid: false, issues: ['Invalid CSS content'] };
		}

		const openBraces = (cssContent.match(/{/g) || []).length;
		const closeBraces = (cssContent.match(/}/g) || []).length;

		return {
			isValid: openBraces === closeBraces && cssContent.includes('{') && cssContent.includes('}'),
			issues: openBraces !== closeBraces ? ['Unmatched braces'] : [],
		};
	},
};
