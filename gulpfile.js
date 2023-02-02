// https://www.youtube.com/watch?v=ubHwScDfRQA
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

function compilescss() {
  return;
}

function defaultTask(cb) {
  cb();
}

exports.default = defaultTask;

//Default gulp task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

//Build gulp task
exports.build = series(scssTask, jsTask);
