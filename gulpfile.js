//Default gulp task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

//Build gulp task
exports.build = series(scssTask, jsTask);
