const { src, dest, watch, parallel, series } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify-es').default
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const imgcompress = require('compress-images')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()

 const cleanDist = () => {
  return src('dist/**/*', {read: false})
  .pipe(clean())
}

const move = () => {
  src('app/img/src/*.webp')
  .pipe(dest('app/img/dest/'))
  .pipe(browserSync.stream())
}

const styles = () => {
  return src(['app/css/style.css', 'app/css/media.css'])
  .pipe(autoprefixer({
    cascade: false,
    overrideBrowserslist: ['last 4 versions'], 
    grid: true
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(concat('app.min.css'))
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream())
}

async function images() {
  imgcompress('app/img/src/**/*',
              'app/img/dest/',
              {compress_force: false, statistic: true, autoupdate: true},
              false,
              {jpg: {engine: 'mozjpeg', command: false }},
              {png: {engine: 'pngquant', command: ['--quality=20-50', '-o']}},
              {svg: {engine: 'svgo', command: '--multipass'}},
              {gif: {engine: 'gifsicle', command: false }},
              function (err, completed) {
                if (completed === true) {
                  browserSync.reload;
                }
              }
            )
          } /* just throw async function, than isn't working! */

const scripts = () => {
  return src(['node_modules/jquery/dist/jquery.min.js', 
              'app/js/script.js'])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js/'))
  .pipe(browserSync.stream())
}

const streamOnline = () => {
  browserSync.init({
    server: { baseDir: 'app/'},
    online: true
  });
}

  const minifyHTML = () => {
    return src('app/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('app/'))
  }

const watching = () => {
  watch('app/css/**/*.css', styles)
  watch('app/*.html').on('change', browserSync.reload)
  watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts)
  watch(['app/img/*.{png}', 'app/img/svg/*.svg'], images)
}

const building = () => {
  return src([
    'app/css/normalize.css',
    'app/css/**/*.min.css',
    'app/js/app.min.js',
    'app/img/dest/**/*',
    'app/fonts/**',
    'app/**/*.html',
  ], {base: 'app'})
  .pipe(dest('dist'))
}

exports.cleanDist = cleanDist
exports.move = move
exports.minifyHTML = minifyHTML
exports.styles = styles
exports.streamOnline = streamOnline
exports.scripts = scripts
exports.images = images
exports.default = parallel(cleanDist, move, styles, scripts, minifyHTML, streamOnline, watching)
exports.build = series(styles, scripts, images, building)