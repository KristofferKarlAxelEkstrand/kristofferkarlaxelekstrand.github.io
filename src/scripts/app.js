'use strict';

// Simple analytics and performance tracking
document.addEventListener('DOMContentLoaded', function () {
	// Track page load time
	const loadTime = performance.now();
	console.log(`Page loaded in ${Math.round(loadTime)}ms`);

	// Add smooth scroll behavior for skip link
	const skipLink = document.querySelector('.skip-to-content');
	if (skipLink) {
		skipLink.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.focus();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}

	// Track external link clicks for analytics
	const externalLinks = document.querySelectorAll('a[target="_blank"]');
	externalLinks.forEach((link) => {
		link.addEventListener('click', function () {
			console.log(`External link clicked: ${this.href}`);
			// Here you could add actual analytics tracking
		});
	});

	// Add loading state management
	document.body.classList.add('loaded');
});
