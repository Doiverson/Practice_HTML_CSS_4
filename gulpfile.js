var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var bs = require('browser-sync').create();

// browser-sync
gulp.task('bs', function(){
    var bsOptions = {}
    bsOptions.files = ['./**/*.html', './css/**/*.css'];
    bsOptions.port  = 3000;
    bs.init(bsOptions);
});

// Sassコンパイルタスク
gulp.task('sass', function(){
    gulp.src('./scss/**/*.scss')
        .pipe(plumber()) // ←ここが追加
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./css/'));
});

// watchタスク(**/*.scss変更時に実行するタスク)
gulp.task('sass-watch', ['sass'], function(){
    var watcher = gulp.watch('./scss/**/*.scss', ['sass']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// gulpのデフォルト動作としてsass-watchを実行
gulp.task('default', ['bs','sass-watch']);