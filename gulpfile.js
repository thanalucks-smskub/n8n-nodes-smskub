const { src, dest, series } = require('gulp');

function buildIcons() {
  return src('nodes/**/*.svg').pipe(dest('dist/nodes'));
}

exports.build = series(buildIcons);
exports.build.icons = buildIcons;
exports['build:icons'] = buildIcons;
