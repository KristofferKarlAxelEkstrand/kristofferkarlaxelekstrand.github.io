# PWA (Progressive Web App)

## What is PWA?

Progressive Web Apps provide app-like experiences using modern web capabilities
including offline functionality, installability, and native app behavior.

## Why PWA Features?

- **Modern Standards**: Demonstrates cutting-edge web development skills
- **User Experience**: App-like functionality and offline access
- **Performance**: Fast loading through intelligent caching
- **Installability**: Can be installed as native apps on devices
- **Professional Quality**: Shows technical competence with modern web standards

## How it's used in this project

### Implementation Components

#### Web App Manifest

- **File**: `site.webmanifest`
- **Purpose**: Defines PWA metadata for installation
- **Content**: App name, icons, theme colors, display preferences

#### Service Worker

- **File**: `sw.js`
- **Purpose**: Handles caching and offline functionality
- **Strategy**: Cache-first for static assets
- **Updates**: Automatic via `build-service-worker.js`

### Generated Files

```text
docs/
├── site.webmanifest  # PWA configuration and metadata
├── sw.js             # Service worker for caching
└── *.png             # Icons referenced in manifest
```

### Build Process

```bash
npm run build:sw     # Update service worker with file hashes
npm run build:static # Copies manifest and builds service worker
```

### Features Implemented

- **Offline Access**: Critical assets cached for offline browsing
- **Fast Loading**: Cache-first strategy for static resources
- **Installable**: Can be added to home screen on mobile devices
- **App-like**: Native app behavior and appearance

### User Benefits

- Portfolio remains accessible without internet connection
- Installs as native app on mobile devices and desktop
- Faster loading through intelligent caching strategies
- Professional presentation demonstrating modern web capabilities

The PWA implementation showcases modern web development skills while providing
practical benefits for portfolio visitors and potential clients.
