// https://www.youtube.com/watch?v=ubHwScDfRQA
// list dependences
import gulp from "gulp";
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
// const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// create functions
// scss
function compilescss() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(gulp.dest("/dist"));
}

// javascript
function jsmin() {
  return gulp.src("js/*.js").pipe(gulp.dest("/dist/js"));
}

// images
function optimizeimg() {
  return gulp
    .src("app/assets/images/*{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
}
// webp images
function webpImage() {
  return gulp
    .src("app/assets/images/*{jpg,png}")
    .pipe(imagewebp())
    .pipe(gulp.dest("dist/images"));
}

// create watchtask
function watchtask() {
  gulp.watch("app/assets/scss/*.scss", compilescss);
  gulp.watch("app/assets/js/*.js", jsmin);
  gulp.watch("app/assets/images/*{jpg,png}", optimizeimg);
  gulp.watch("app/assets/images/*{jpg,png}", webpImage);
}

//Default gulp task
exports.default = gulp.series(
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  watchtask
);

//Build gulp task
exports.build = gulp.series(compilescss, gulp.parallel(jsmin));
