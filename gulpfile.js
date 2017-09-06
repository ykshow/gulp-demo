/**
 * Created by 糖纸 on 2017/9/5.
 */
/* 启用严格模式 */
'use strict';

/*
任务
* 1.less:编译，合并，压缩
* 2.js:合并，压缩，混淆
* 3.img:复制
* 4.html:压缩
*/

/* 载入gupl包 */
var gulp = require('gulp');
/* less转css包 */
var less = require('gulp-less');
/* css压缩包 */
var cssnano = require('gulp-cssnano');
/* 合并包 */
var concat = require('gulp-concat');
/* js压缩混淆包 */
var uglify = require('gulp-uglify');
/* html压缩 */
var htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-Sync');
/* less:编译，压缩，（合并）建议用自带的@import url引用 */
gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        /* 如果文件有改动自动页面刷新 */
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        /* 如果文件有改动自动页面刷新 */
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        /* 如果文件有改动自动页面刷新 */
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true, /* 删除空白字符 */
            removeComments:true /* 删除注释 */
        }))
        .pipe(gulp.dest('dist'))
        /* 如果文件有改动自动页面刷新 */
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('browser-Sync',function(){
    browserSync.init({
        server : {
            baseDir : ['dist']
        }
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})