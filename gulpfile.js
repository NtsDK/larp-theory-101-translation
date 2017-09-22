var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileInclude = require('gulp-file-include');
var config = require('./config');

var projectDir = 'app';
var projectBase = 'app';
var lang = config.get('lang');

var htmls = [projectDir + '/index.html'];
var customStyles = [projectDir + '/presentation/customStyles.css'];
var slides = ['translations/' + lang + '/**/*.html'];
var partials = ['./translations/' + lang + '/**/*'];
    
gulp.task('copyPresentation', function() {
    return gulp.src(projectDir + '/presentation' + '/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    return gulp.src(htmls, {base : projectDir})
    .pipe(fileInclude({
      prefix: '@@',
      basepath: './translations/' + lang + '/',
      context: {
          PAGE_TITLE: config.get('pageTitle')
      }
    }))
//    .pipe(htmlmin({collapseWhitespace : true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    
    gulp.watch(htmls, ['html']);
    gulp.watch(slides, ['html']);
    gulp.watch(customStyles, ['copyPresentation']);
    gulp.watch(partials, ['html']);
    
});

gulp.task('dev', ['copyPresentation', 'html','watch']);