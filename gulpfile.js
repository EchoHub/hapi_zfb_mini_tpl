const fs = require('fs')
const path = require('path')
const readline = require('readline');
const gulp = require('gulp')
const gulpif = require('gulp-if')
const gulpwatch = require('gulp-watch')
const minimist = require('minimist')
const rename = require('gulp-rename')
const gulprun = require('gulp-run')
const pump = require('pump')
const rimraf = require('rimraf')

const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['> 1%'] })
const cleanCss = require('gulp-clean-css')

const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')

const jsonmin = require("gulp-jsonmin")

const htmlmin = require("gulp-htmlmin")

const glob = require('./.build/default')
    ; require("colors")

const knownOptions = {
    // string: 'env',
    default: { env: process.env.NODE_ENV || 'development' }
};
gulp.task("clean", async function () {
    const { destPath } = glob["common"]
    const start = +new Date() / 1000;
    rimraf.sync(destPath)
    const end = + new Date() / 1000;
    console.log(`执行操作：删除文件目录>>>>${destPath}`.red)
    console.log(`执行结果：成功`.blue)
    console.log(`耗时：${end - start} ms`.green)
})
gulp.task("less:compile", async function () {
    const { lessDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    lessDirs.map(dir => {
        const end = + new Date() / 1000;
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
        ], function (err) {
            if (!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            } else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("js:compile", async function () {
    const { jsDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    jsDirs.map(dir => {
        const end = + new Date() / 1000;
        return pump([
            gulp.src(dir.src),
            babel(),
            gulpif(env === "production", uglify()),
            gulp.dest(dir.dest),
        ], function (err) {
            if (!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            } else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("axml:compile", async function () {
    const { axmlDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    axmlDirs.map(dir => {
        const end = + new Date() / 1000;
        return pump([
            gulp.src(dir.src),
            rename({
                extname: ".html"
            }),
            gulpif(env === "production", htmlmin({ collapseWhitespace: true })),
            rename({
                extname: ".axml"
            }),
            gulp.dest(dir.dest),
        ], function (err) {
            if (!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            } else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("json:compile", async function () {
    const { jsonDirs } = glob["common"]
    const { env } = minimist(process.argv.slice(2), knownOptions);
    jsonDirs.map(dir => {
        const end = + new Date() / 1000;
        return pump([
            gulp.src(dir.src),
            gulpif(env === "production", jsonmin()),
            gulp.dest(dir.dest),
        ], function (err) {
            if (!err) {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：成功`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            } else {
                console.log(`执行操作：生成文件>>>>${dir.dest}`.red)
                console.log(`执行结果：失败`.red, `  Message: ${err.message}`.blue)
                console.log(`耗时：${+new Date() / 1000 - end} ms`.green)
            }
        })
    })
})
gulp.task("assets:compile", assetsCompile)

gulp.task("build:prod", gulp.series("clean", gulp.parallel("json:compile", "axml:compile", "less:compile", "js:compile", "assets:compile")))
gulp.task("server:dev", gulp.series("build:prod", function () {
    const { jsDirs, lessDirs, axmlDirs, jsonDirs, imageSrc } = glob["common"]
    gulpwatch(imageSrc, assetsCompile)
    const _jsDirs = jsDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_jsDirs, gulp.series("js:compile"))
    const _lessDirs = lessDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_lessDirs, gulp.series("less:compile"))
    const _axmlDirs = axmlDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_axmlDirs, gulp.series("axml:compile"))
    const _jsonDirs = jsonDirs.map(dir => {
        return dir.src
    })
    gulp.watch(_jsonDirs, gulp.series("json:compile"))
}))
function hapiUtil() {
    const { name } = minimist(process.argv.slice(2), knownOptions)
    this.name = name;
}
hapiUtil.prototype = {
    build: async function (type) {
        const destPath = path.join(__dirname, `src/${type}/${this.name}`)
        return pump([
            gulp.src(path.join(__dirname, `src/${type}/_template/*.*`)),
            gulpif(!fs.existsSync(destPath), gulp.dest(destPath))
        ])
    },
    remove: async function () {
        const destPath = path.join(__dirname, `src/${this.name}`)
        // const child = exec(, null, function(err, stdout, stderr) {
        //     if (err) throw err;
        // });
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return rl.question(`您当前正在进行删除操作\n删除路径：${destPath}\n是否继续,Yes or No?`.red, answer => {
            if (answer.toUpperCase() === "YES") {
                rimraf.sync(destPath)
            }
            process.exit(0)
        });
    }
}
gulp.task("new", function () {
    return (new hapiUtil()).build("components")
})
gulp.task("create", function () {
    return (new hapiUtil()).build("pages")
})
gulp.task("remove", function () {
    return (new hapiUtil()).remove()
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

