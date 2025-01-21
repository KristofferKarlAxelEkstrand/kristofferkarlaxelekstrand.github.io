'use strict';

// Simple analytics and performance tracking
document.addEventListener('DOMContentLoaded', function () {
  // Track page load time
  var loadTime = performance.now();
  console.log("Page loaded in ".concat(Math.round(loadTime), "ms"));

  // Add smooth scroll behavior for skip link
  var skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }

  // Track external link clicks for analytics
  var externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      console.log("External link clicked: ".concat(this.href));
      // Here you could add actual analytics tracking
    });
  });

  // Add loading state management
  document.body.classList.add('loaded');
});