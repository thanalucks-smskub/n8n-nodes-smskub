const { src, dest } = require('gulp');
const path = require('path');

/**
 * Copy SVG icons into dist folder
 * Preserve folder structure (e.g. nodes/Smskub/smskub.svg)
 */
function buildIcons() {
  return src('nodes/**/*.svg', { base: './' })
    .pipe(dest('dist'));
}

exports['build:icons'] = buildIcons;
