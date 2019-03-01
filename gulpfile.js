const gulp = require('gulp')
const gulpif = require('gulp-if')
const gulpwatch = require('gulp-watch')
const minimist = require('minimist')
const rename = require("gulp-rename");
const pump = require('pump')
const rimraf = require('rimraf')

const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['> 1%'] })
const cleanCss = require("gulp-clean-css")

const babel = require("gulp-babel");
const uglify = require('gulp-uglify')

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');

const glob = require('./.build/default')
;require("colors")

const knownOptions = {
    // string: 'env',
    default: { env: process.env.NODE_ENV || 'development' }
};
gulp.task("clean", async function () {
    const { destPath } = glob["common"]
    const start = +new Date()/1000;
    rimraf.sync(destPath)
    const end = + new Date()/1000;
    console.log(`执行操作：删除文件目录>>>>${destPath}`.red)
    console.log(`执行结果：成功`.blue)
    console.log(`耗时：${end - start} ms`.green)
})
gulp.task("less:compile", async function() {
    const { lessDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    lessDirs.map(dir => {
        const end = + new Date()/1000;
        return pump([
            gulp.src(dir.src),
            less({
                plugins: [autoprefix]
            }),
            gulpif(env === "production", cleanCss()),
            rename({
                extname: ".acss"
            }),
            gulp.dest(dir.dest),
        ],  function (err) {
            if(!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date()/1000 - end} ms`.green)
            }else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date()/1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("js:compile", async function() {
    const { jsDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    jsDirs.map(dir => {
        const end = + new Date()/1000;
        return pump([
            gulp.src(dir.src),
            babel(),
            gulpif(env === "production", uglify()),
            gulp.dest(dir.dest),
        ],  function (err) {
            if(!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date()/1000 - end} ms`.green)
            }else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date()/1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("axml:compile", function() {

})
gulp.task("json:compile", function() {
    
})
gulp.task("assets:compile", assetsCompile)

gulp.task("build:prod", gulp.series("clean", gulp.parallel("less:compile", "js:compile", "assets:compile")))
gulp.task("server:dev", function() {
    const { jsDirs, lessDirs, imageSrc } = glob["common"]
    gulpwatch(imageSrc, assetsCompile)
    const _jsDirs = jsDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_jsDirs, gulp.series("js:compile"))
    const _lessDirs = lessDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_lessDirs, gulp.series("less:compile"))
})
async function assetsCompile() {
    const { imageSrc, imageDest } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    rimraf.sync(imageDest)
    return pump([
            gulp.src(imageSrc),
            gulpif(env === "production", imagemin({
                optimizationLevel: 7, 
                progressive: true,
                use: [pngquant(), imageminJpegtran()]
            })),
            gulp.dest(imageDest)
    ])
}
