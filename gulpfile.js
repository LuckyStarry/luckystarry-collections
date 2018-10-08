const gulp = require('gulp')
const typescript = require('gulp-tsc')
const uglify = require('gulp-uglify')
const browserify = require("browserify")
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

gulp.task('compile-typescript', function() {
  return gulp.src(['src/**/*.ts'])
    .pipe(typescript({
      module: 'commonjs',
      target: 'es2015',
      declaration: true
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('compile-es5', ['compile-typescript'], function() {
  return browserify('dist/index.js')
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
})

gulp.task('compile', ['compile-es5'])