const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	plugins: [
		require('autoprefixer')({
			grid: true, // Enable CSS Grid prefixes
			flexbox: 'no-2009', // Don't add 2009 flexbox prefixes
		}),
		// Only minify in production
		!isDev &&
			require('cssnano')({
				preset: [
					'default',
					{
						discardComments: {
							removeAll: true,
						},
						normalizeWhitespace: true,
						minifySelectors: true,
						minifyFontValues: true,
						minifyGradients: true,
						mergeLonghand: true, // Merge longhand properties
						mergeRules: true, // Merge similar rules
						discardDuplicates: true, // Remove duplicate rules
					},
				],
			}),
	].filter(Boolean),
};
