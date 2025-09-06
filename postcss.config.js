module.exports = {
	plugins: [
		require('autoprefixer')({
			grid: true, // Enable CSS Grid prefixes
			flexbox: 'no-2009', // Don't add 2009 flexbox prefixes
		}),
		require('cssnano')({
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true,
					},
					normalizeWhitespace: true, // Enable whitespace normalization for compression
					minifySelectors: true,
					minifyFontValues: true,
					minifyGradients: true,
				},
			],
		}),
	],
};
