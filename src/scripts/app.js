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

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('/sw.js')
			.then(function (registration) {
				console.log('Service Worker registered successfully:', registration.scope);
			})
			.catch(function (error) {
				console.log('Service Worker registration failed:', error);
			});
	});
}

// Handle PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt = e;

	// Create a simple install button
	const installBtn = document.createElement('button');
	installBtn.textContent = '📱 Install App';
	installBtn.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: #85ff85;
		color: #3c2252;
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		z-index: 1000;
		transition: all 0.3s ease;
	`;
	installBtn.onmouseover = () => (installBtn.style.transform = 'scale(1.05)');
	installBtn.onmouseout = () => (installBtn.style.transform = 'scale(1)');
	document.body.appendChild(installBtn);

	installBtn.addEventListener('click', async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			console.log(`User ${outcome} the install prompt`);
			deferredPrompt = null;
			installBtn.remove();
		}
	});

	// Auto-hide after 10 seconds
	setTimeout(() => {
		if (installBtn.parentNode) {
			installBtn.remove();
		}
	}, 10000);
});
