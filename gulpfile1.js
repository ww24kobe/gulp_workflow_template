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

// 将src/index.html赋值到dist目录中
function copyHtmlHandle() {
    console.log('html任务')
    return src('./src/*.html')
        .pipe(dest('./dist'))
}

function copyJsHandle() {
    console.log('js任务')
    return src('./src/lib/**/*.js')
        .pipe(dest('dist/js'))
}

// 监听src目录下的index.html文件，如果该文件有改动，自动执行copyHtml任务
function watchHtmlChange() {
    watch('./src/index.html', series(copyHtmlHandle))
}

// 暴露任务名
exports.copyHtml = copyHtmlHandle
exports.copyJs = copyJsHandle
exports.watchHtml = watchHtmlChange

// 串行(顺序！！)
// exports.copyHtmlJs = series(copyHtmlHandle,copyJsHandle)

// 并行(一起)
exports.copyHtmlJs = parallel(copyHtmlHandle, copyJsHandle)