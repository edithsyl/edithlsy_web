// https://www.youtube.com/watch?v=ubHwScDfRQA
// list dependences
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// create functions
// scss
function compilescss() {
  return src("scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("/dist"));
}

// javascript
function jsmin() {
  return src("js/*.js").pipe(dest("/dist/js"));
}

// images
function optimizeimg() {
  return src("app/assets/images/*{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}
// webp images
function webpImage() {
  return src("app/assets/images/*{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

// create watchtask
function watchtask() {
  watch("app/assets/scss/*.scss", compilescss);
  watch("app/assets/js/*.js", jsmin);
  watch("app/assets/images/*{jpg,png}", optimizeimg);
  watch("app/assets/images/*{jpg,png}", webpImage);
}

//Default gulp task
exports.default = series(compilescss, jsmin, optimizeimg, webpImage, watchtask);

//Build gulp task
exports.build = series(compilescss, jsmin);
