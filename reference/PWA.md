# Progressive Web Apps (PWA)

## What is a Progressive Web App?

A Progressive Web App (PWA) is a web application that uses modern web
capabilities to deliver an app-like experience to users. PWAs bridge the gap
between web and native mobile applications by providing features traditionally
associated with native apps while maintaining the accessibility and reach of web
applications.

## Core Features

### App-like Experience

- Installable on devices (home screen, app drawer)
- Standalone display mode (no browser UI)
- Splash screens and app icons
- Full-screen or minimal browser interface

### Offline Functionality

- Service workers cache resources and API responses
- Works without internet connection
- Background sync for data updates
- Graceful degradation when offline

### Performance & Reliability

- Fast loading through caching strategies
- Reliable performance in poor network conditions
- Progressive enhancement approach
- Responsive design across all devices

### Security

- Served over HTTPS (required for service workers)
- Secure context for sensitive features
- Origin-based security model

## Core Technologies

### Service Workers

- JavaScript that runs in the background
- Intercepts network requests
- Manages caching strategies
- Enables offline functionality
- Handles push notifications

### Web App Manifest

- JSON file defining app metadata
- App name, icons, colors, display mode
- Controls installation experience
- Defines app appearance and behavior

### Cache API

- Programmatic cache management
- Store network requests and responses
- Multiple caching strategies available
- Works with service workers

## Role in This Project

### Implementation Details

**Service Worker** (`static/sw.js`)

- Caches essential files: HTML, CSS, JavaScript, manifest
- Uses "cache first, then network" strategy
- Automatically cleans up old cache versions
- Provides offline access to the main portfolio page

**Web App Manifest** (`static/site.webmanifest`)

- Defines app as "Kristoffer Ekstrand Portfolio"
- Uses brand colors: purple background (#3c2252), green theme (#85ff85)
- Includes SVG icons for different sizes (192x192, 512x512, Apple touch)
- Configured for standalone display mode

### Integration with Build Process

- Build script copies PWA files from `/static` to `/docs`
- Service worker automatically deployed with GitHub Pages
- HTML includes manifest link and Apple touch icon
- JavaScript registers service worker and handles install prompts

### Benefits for This Portfolio

#### User Experience

- Faster repeat visits through intelligent caching
- Works offline for viewing cached content
- Can be installed as a "real app" on phones and desktops
- Professional, native-like feel

#### Performance

- Immediate loading of cached resources
- Reduced server load and bandwidth usage
- Better Lighthouse PWA scores
- Improved Core Web Vitals metrics

#### Professional Presentation

- Demonstrates modern web development skills
- Shows understanding of performance optimization
- Provides app-like experience for potential clients
- Works seamlessly across all devices

### Caching Strategy

#### Files Cached

- Main HTML page (`/`, `/index.html`)
- Compiled JavaScript (`/scripts/app.js`)
- Compiled CSS (`/styles/main.css`)
- Web app manifest (`/site.webmanifest`)

#### Cache-First Approach

- Serves cached version immediately when available
- Falls back to network if not cached
- Updates cache in background for next visit
- Provides instant loading for repeat visitors

### Browser Support

#### Modern Browser Features

- Service Workers (supported in all modern browsers)
- Cache API (widely supported)
- Web App Manifest (good support, graceful fallback)
- Install prompts (Chrome, Edge, Safari, Firefox)

#### Graceful Degradation

- Functions as normal website when PWA features unavailable
- Progressive enhancement approach
- No negative impact on older browsers
- Maintains full accessibility

## Development Workflow

### Testing PWA Features

- Chrome DevTools → Application tab for service worker status
- Test offline functionality in Network tab
- Lighthouse audits for PWA compliance
- Real device testing for install experience

### Build Integration

- `npm run build` includes PWA file deployment
- Service worker automatically registered in main JavaScript
- Icons and manifest copied to production directory
- GitHub Pages serves all PWA files correctly

### Best Practices Applied

- HTTPS requirement (GitHub Pages provides SSL)
- Proper error handling in service worker
- Cache versioning for updates
- Install prompt with user-friendly UI
- Accessible fallbacks for all features
