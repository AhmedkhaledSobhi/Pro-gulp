// const concat = require('concat-stream');
const { src, dest, series, parallel,watch  } = require('gulp');
const htmlmin = require('gulp-htmlmin');
// const terser = require('gulp-terser');
var htmlreplace = require('gulp-html-replace');

const globs={
    html:"project/*.html",
    css:"project/**/*.css",
    js:"project/js/**/*.js",
}

function htmlTask( ) {
    return src(globs.html)
    .pipe(htmlreplace({
        'css': './assets/style.min.css',
        'js': './assets/script.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    .pipe(dest("dist"))
}



exports.html=htmlTask

var concat=require('gulp-concat')
const cleancss=require('gulp-clean-css')
function cssTask( ) {
    return src(globs.css)
    .pipe(concat("style.min.css"))
    .pipe(cleancss())
    .pipe(dest("dist/assets"))
}
exports.css=cssTask

const terser=require('gulp-terser')
function javaTask() {
    return src(globs.js)
    .pipe(concat("script.min.js"))
    .pipe(terser())
     .pipe(dest("dist/assets"))
}
exports.java=javaTask

const imagemin = require('gulp-imagemin');
function imageTask() {
    return src("project/pics/*")
    .pipe(imagemin())
    .pipe(dest("dist/assets/images"))
}
exports.image=imagemin 

function watchTask()
{
    watch(globs.html,htmlTask)    
    watch(globs.css,cssTask)    
    watch(globs.js,javaTask)    
}

exports.default=series( parallel ( imageTask,htmlTask,cssTask,javaTask ) , watchTask )












// function firstTask()
// {
//     return Promise.resolve()
// }

// // exports.ts1=firstTask; // run gulp ts1
// exports.default=firstTask