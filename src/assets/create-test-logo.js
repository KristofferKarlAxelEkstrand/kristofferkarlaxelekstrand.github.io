const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple test logo for demonstration
async function createTestLogo() {
	const size = 512;
	const outputPath = path.join(__dirname, 'logo.png');

	// Create a simple logo with Sharp: purple circle with white "K"
	const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 20}" fill="#3c2252"/>
      <text x="${size / 2}" y="${size / 2 + 60}" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white">K</text>
    </svg>
  `;

	await sharp(Buffer.from(svg)).png().toFile(outputPath);

	console.log(`✓ Created test logo: ${outputPath}`);
	console.log('This is just for testing - replace with your actual logo!');
}

if (require.main === module) {
	createTestLogo().catch(console.error);
}

module.exports = createTestLogo;
