const {
    src,
    pipe,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

// series:串行执行任务，要按照定义的顺序依次执行
// parallel:一起执行任务，可以提高执行效率

const sass = require('gulp-sass')(require('sass')); // 编译css
var cssmin = require('gulp-cssmin'); // 压缩的
var rename = require('gulp-rename'); // 重命名的
const autoprefixer = require('gulp-autoprefixer'); // 添加浏览器厂商前缀（can i use）
const babel = require('gulp-babel');
var uglify = require('gulp-uglify'); // 压缩js
var concat = require('gulp-concat'); // 合并js或css

function complieScss() {
    return src('./src/css/index.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'))
}



//压缩css代码
function compressCss() {
    return src('./src/css/style.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'))
}


function css() {
    return src('./src/scss/*.scss') // 源目录
        .pipe(sass()) // 下一步编译 先编译
        .pipe(autoprefixer())
        .pipe(cssmin()) // 在压缩
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest('./dist/css/')) // 最后输送到目标目录
}


function transformJs(){
    return src('./src/app.js')
            .pipe(babel(
                {
                    presets: ['@babel/preset-env']
                }
            ))
            .pipe(dest('./dist/js/'));
}

function js(){
    return src('./src/js/*.js')
            .pipe(concat('bundle-423534.js'))
            .pipe(babel(
                {
                    presets: ['@babel/preset-env']
                }
            ))
            .pipe( uglify())
            .pipe(dest('./dist/js/'))
}

exports.jsTask = js

exports.cssTask = css;
exports.compreCssTask = compressCss

exports.complieScssTask = complieScss
exports.es62es5 = transformJs