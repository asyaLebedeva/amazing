const { src, dest, series, watch } = require('gulp')
const htmlminify = require('gulp-htmlmin')
const cssminify = require('gulp-clean-css')
const autoprefix = require('gulp-autoprefixer')
const styleConcat = require('gulp-concat-css')
const JSconcat = require('gulp-concat')
const svg = require('gulp-svgo')
const browSync = require('browser-sync').create()


const browser = () => {
  browSync.init({
    server: {baseDir: 'dist'}
  })
}

const htmlmin = () => {
  return src('src/*.html')
  .pipe(htmlminify({
    collapseWhitespace: true,
    useShortDoctype: true,
    removeComments: true
  }))
  .pipe(dest('dist'))
  .pipe(browSync.stream())
}

const styles = () => {
  return src('src/css/**/*.css')
  .pipe(autoprefix({
    cascade: false
  }))
  .pipe(styleConcat('style.css', 'bootstrap-grid.min.css'))
  .pipe(cssminify({
    level: 2,
    compatibility: 'ie9'
  }))
  .pipe(dest('./dist/css/'))
  .pipe(browSync.stream())
}

const scripts = () => {
  return src('src/js/*.js')
  .pipe(JSconcat('all.js'))
  .pipe(dest('./dist/'))
  .pipe(browSync.stream())
}

const img = () => {
  return src('src/img/**/*.svg')
  .pipe(svg())
  .pipe(dest('./dist/img/svg'))
}

const optimize = () => {
  return src('src/img/**/*.png')
  .pipe(image())
  .pipe(dest('./dist/img/'))
  .pipe(browSync.stream())
}


exports.scripts = scripts
exports.htmlmin = htmlmin
exports.styles = styles
exports.img = img
exports.default = series(htmlmin, styles, scripts, browser)
