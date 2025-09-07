// Basic service worker for Kristoffer's portfolio PWA
const CACHE_NAME = 'toffe-1757257199148-71f62a02';
const urlsToCache = ['/', '/index.html', '/scripts/app.js', '/styles/main.css', '/fav/site.webmanifest'];

// Install event - cache the essential files
self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Return cached version or fetch from network
			return response || fetch(event.request);
		})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
