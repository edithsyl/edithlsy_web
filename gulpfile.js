// https://www.youtube.com/watch?v=ubHwScDfRQA
// list dependences
// import gulp from "gulp";
var cloudflare = require("gulp-cloudflare");
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const browersync = require("browser-sync").create();
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

// create functions
// scss
function compilescss() {
  return src("scss/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("/dist", { sourcemaps: "." }));
}

// javascript
function jsmin() {
  return src("js/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("/dist/js", { sourcemaps: "." }));
}

// Browsersync Tasks
// initialize local server
function browersyncServe(cb) {
  browersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb(); //callback function signifying it is completed
}

function browsersyncReload(cb) {
  browersync.reload();
  cb();
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
  watch("*.html", browsersyncReload);
  watch(
    ["app/assets/scss/**/*.scss", "app/assets/js/*.js"],
    series(compilescss, jsmin, browsersyncReload)
  );
  watch("app/assets/images/*{jpg,png}", optimizeimg);
  watch("app/assets/images/*{jpg,png}", webpImage);
}

//Default gulp task
exports.default = series(
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  browersyncServe,
  watchtask
);

//Build gulp task
exports.build = series(compilescss, parallel(jsmin));
