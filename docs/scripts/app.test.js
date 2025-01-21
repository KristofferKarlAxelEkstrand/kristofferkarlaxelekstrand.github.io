"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// Basic functionality test
var sum = function sum(a, b) {
  return a + b;
};
test('adds 1 + 2 to equal 3', function () {
  expect(sum(1, 2)).toBe(3);
});

// App initialization test
describe('App Initialization', function () {
  test('console.log is available', function () {
    expect(_typeof(console.log)).toBe('function');
  });
  test('document is available in jsdom', function () {
    expect(typeof document === "undefined" ? "undefined" : _typeof(document)).toBe('object');
    expect(document).toBeTruthy();
  });
});

// Portfolio content validation
describe('Portfolio Content', function () {
  beforeAll(function () {
    // Load the HTML content for testing
    var fs = require('fs');
    var path = require('path');
    var html = fs.readFileSync(path.resolve(__dirname, '../../docs/index.html'), 'utf8');
    document.body.innerHTML = html;
  });
  test('HTML document loads correctly', function () {
    expect(document.body).toBeTruthy();
  });
  test('main element exists', function () {
    var main = document.querySelector('main');
    expect(main).toBeTruthy();
  });
  test('header contains correct title', function () {
    var h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Kristoffer');
  });
  test('navigation links exist', function () {
    var links = document.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });
  test('projects section exists', function () {
    var projectsSection = document.querySelector('#projects');
    expect(projectsSection).toBeTruthy();
  });
});