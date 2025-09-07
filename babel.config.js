module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['> 1%', 'last 2 versions', 'not ie 11', 'not op_mini all'],
				},
				modules: false,
				useBuiltIns: 'usage',
				corejs: '3.0',
			},
		],
	],
};
