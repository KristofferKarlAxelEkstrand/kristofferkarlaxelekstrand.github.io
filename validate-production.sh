#!/bin/bash

# Production Readiness Validation Script
# Tests Jekyll migration for production deployment

echo "🚀 Jekyll Migration - Production Readiness Validation"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check status
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
        return 0
    else
        echo -e "${RED}✗ $1${NC}"
        return 1
    fi
}

# Counter for tests
TESTS_PASSED=0
TESTS_TOTAL=0

echo ""
echo "1. Jekyll Build System Validation"
echo "=================================="

# Test Jekyll build
echo -n "Testing Jekyll build... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
bundle exec jekyll build --quiet > /dev/null 2>&1
if check_status "Jekyll builds successfully"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Check HTML file count
echo -n "Checking HTML file generation... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
HTML_COUNT=$(find _site -name "*.html" | wc -l)
if [ $HTML_COUNT -ge 20 ]; then
    check_status "$HTML_COUNT HTML files generated"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Only $HTML_COUNT HTML files generated (expected 20+)"
fi

# Check collection pages
echo -n "Checking collection pages... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
COLLECTION_COUNT=$(find _site -path "*workplaces*" -o -path "*projects*" -o -path "*lab_sites*" -o -path "*client_sites*" | grep "index.html" | wc -l)
if [ $COLLECTION_COUNT -ge 15 ]; then
    check_status "$COLLECTION_COUNT collection pages generated"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Only $COLLECTION_COUNT collection pages generated (expected 15+)"
fi

echo ""
echo "2. Favicon System Validation"
echo "============================="

# Test favicon files
echo -n "Checking favicon files... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "assets/favicon.ico" ] && [ -f "assets/icon-192.png" ] && [ -f "assets/icon-512.png" ] && [ -f "assets/site.webmanifest" ]; then
    check_status "All favicon files present"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Missing favicon files"
fi

# Test favicon sizes
echo -n "Checking favicon optimization... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
FAVICON_SIZE=$(stat -c%s assets/favicon.ico 2>/dev/null || echo 0)
if [ $FAVICON_SIZE -lt 2000 ]; then
    check_status "Favicon properly optimized (${FAVICON_SIZE} bytes)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Favicon may be too large (${FAVICON_SIZE} bytes)"
fi

echo ""
echo "3. PWA Functionality Validation"
echo "==============================="

# Check service worker
echo -n "Checking service worker... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "_site/sw.js" ] && grep -q "addEventListener" _site/sw.js; then
    check_status "Service worker properly configured"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Service worker missing or malformed"
fi

# Check PWA manifest
echo -n "Checking PWA manifest... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "assets/site.webmanifest" ] && grep -q "\"name\"" assets/site.webmanifest; then
    check_status "PWA manifest properly configured"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "PWA manifest missing or malformed"
fi

# Check offline page
echo -n "Checking offline page... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "_site/offline.html" ] && grep -q "offline" _site/offline.html; then
    check_status "Offline page exists"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Offline page missing"
fi

echo ""
echo "4. SEO Validation"
echo "================="

# Check sitemap
echo -n "Checking sitemap generation... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "_site/sitemap.xml" ] && grep -q "<urlset" _site/sitemap.xml; then
    URL_COUNT=$(grep -c "<loc>" _site/sitemap.xml)
    check_status "Sitemap generated with $URL_COUNT URLs"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Sitemap missing or malformed"
fi

# Check robots.txt
echo -n "Checking robots.txt... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "_site/robots.txt" ] && grep -q "Sitemap:" _site/robots.txt; then
    check_status "Robots.txt properly configured"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Robots.txt missing or malformed"
fi

# Check RSS feed
echo -n "Checking RSS feeds... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if [ -f "_site/feed.xml" ] && grep -q "<feed" _site/feed.xml; then
    check_status "RSS feed generated"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "RSS feed missing or malformed"
fi

echo ""
echo "5. Performance Validation"
echo "========================="

# Check file sizes
echo -n "Checking HTML file size... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
HTML_SIZE=$(stat -c%s _site/index.html 2>/dev/null || echo 0)
if [ $HTML_SIZE -lt 50000 ]; then
    check_status "HTML optimized (${HTML_SIZE} bytes)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "HTML may be too large (${HTML_SIZE} bytes)"
fi

# Check CSS file size
echo -n "Checking CSS file size... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))
CSS_SIZE=$(stat -c%s _site/assets/css/main.css 2>/dev/null || echo 0)
if [ $CSS_SIZE -lt 10000 ]; then
    check_status "CSS optimized (${CSS_SIZE} bytes)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "CSS may be too large (${CSS_SIZE} bytes)"
fi

echo ""
echo "6. Build Performance"
echo "===================="

# Test build time with clean build
echo -n "Testing build performance... "
TESTS_TOTAL=$((TESTS_TOTAL + 1))

# Ensure clean build by removing cache and site
rm -rf _site .jekyll-cache .jekyll-metadata

# Use more precise timing with better cross-platform compatibility
if command -v gdate >/dev/null 2>&1; then
    # macOS with GNU coreutils
    BUILD_START=$(gdate +%s%3N)
    bundle exec jekyll build --quiet > /dev/null 2>&1
    BUILD_STATUS=$?
    BUILD_END=$(gdate +%s%3N)
    BUILD_TIME=$((BUILD_END - BUILD_START))
elif date --version >/dev/null 2>&1; then
    # GNU date (Linux)
    BUILD_START=$(date +%s%3N)
    bundle exec jekyll build --quiet > /dev/null 2>&1
    BUILD_STATUS=$?
    BUILD_END=$(date +%s%3N)
    BUILD_TIME=$((BUILD_END - BUILD_START))
else
    # Fallback for systems without millisecond precision
    BUILD_START=$(date +%s)
    bundle exec jekyll build --quiet > /dev/null 2>&1
    BUILD_STATUS=$?
    BUILD_END=$(date +%s)
    BUILD_TIME=$(( (BUILD_END - BUILD_START) * 1000 ))
fi

# Check if build was successful
if [ $BUILD_STATUS -ne 0 ]; then
    check_status "Build failed"
    return 1
fi

if [ $BUILD_TIME -lt 5000 ]; then
    check_status "Build completed in ${BUILD_TIME}ms (excellent)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
elif [ $BUILD_TIME -lt 10000 ]; then
    check_status "Build completed in ${BUILD_TIME}ms (good)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    check_status "Build took ${BUILD_TIME}ms (may be slow)"
fi

echo ""
echo "======================================================"
echo "📊 PRODUCTION READINESS SUMMARY"
echo "======================================================"

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! ($TESTS_PASSED/$TESTS_TOTAL)${NC}"
    echo -e "${GREEN}✅ Ready for production deployment${NC}"
    exit 0
elif [ $TESTS_PASSED -ge $((TESTS_TOTAL * 80 / 100)) ]; then
    echo -e "${YELLOW}⚠️  MOSTLY READY ($TESTS_PASSED/$TESTS_TOTAL tests passed)${NC}"
    echo -e "${YELLOW}🟡 Minor issues need attention${NC}"
    exit 0
else
    echo -e "${RED}❌ NOT READY FOR PRODUCTION ($TESTS_PASSED/$TESTS_TOTAL tests passed)${NC}"
    echo -e "${RED}🔴 Critical issues need to be resolved${NC}"
    exit 1
fi