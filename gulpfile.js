var gulp 	        = require('gulp');
var rename        = require('gulp-rename');
var minify        = require('gulp-clean-css');
var del           = require('del');
var less          = require('gulp-less');
var uglify        = require('gulp-uglify');
var fs            = require('fs');
var umd           = require('gulp-umd');
var sourcemaps    = require('gulp-sourcemaps');


gulp.task('default',['less'], function() {
  var requirejs = require('requirejs');
  var modalName = '$';
  

  return gulp.src('./src/js/*.js')
    .pipe(umd({
      	exports: function(file) {
          return modalName;
        },
        namespace: function(file) {
          return modalName;
        },
        dependencies: function(file) {
          return [ {
            name: 'jquery',
            amd: 'jquery',
            cjs: 'jquery',
            global: 'jQuery',
            param: '$'}];
        }
        
    }))
    .pipe(umd({
		templateSource :'/*!\n * @todo 日期选择器  \n * @author wanhappy@163.com\n * 使用方法 $(\'input\').timepicker(); \n**/\n <%= contents%> '
    }))
    .pipe( sourcemaps.init() )
    .pipe( gulp.dest('dist/js') )
    .pipe( uglify({output:{ comments:/^!/ } }) )
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(rename( function(path) {
    	path.basename += '.min';
    }))
    .pipe( sourcemaps.write('../maps') )
    .pipe( gulp.dest('dist/js') );

});

gulp.task('less',function () {
  gulp.src('./src/less/*.less')
      .pipe( sourcemaps.init() )
      .pipe( less() )
      .pipe( gulp.dest('./src/css') )
      .pipe( gulp.dest('./dist/css') )
      .pipe( minify() )
      .pipe(rename( function(path) {
        path.basename += '.min';
      }))
      .pipe( sourcemaps.write('../maps') )
      .pipe( gulp.dest('./dist/css') )
});