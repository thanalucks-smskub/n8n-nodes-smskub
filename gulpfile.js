const { src, dest, series } = require('gulp');

function buildCredentials() {
	return src('src/credentials/**/*.ts')
		.pipe(dest('dist/credentials'));
}

function buildNodes() {
	return src('src/nodes/**/*')
		.pipe(dest('dist/nodes'));
}

exports.build = series(buildCredentials, buildNodes);
exports['build:icons'] = function () {};
