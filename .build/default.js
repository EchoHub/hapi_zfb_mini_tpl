const path = require("path")
const srcPath = path.resolve(__dirname, "./../src")
const destPath = path.resolve(__dirname, "./../dist")
module.exports = {
    common: {
        srcPath: srcPath,
        destPath: destPath,
        imageSrc: path.resolve(srcPath, "images/**/*.*"),
        imageDest: path.resolve(destPath, "images"),
        mixinExt: [".json", ".axml"],
        mixinDirs: [
            {
                src: path.resolve(srcPath, "pages/**/*.*"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.*"),
                dest: path.join(destPath, "components"),
            }
        ],
        jsonDirs: [
            {
                src: path.resolve(srcPath, "app.json"),
                dest: destPath,
            },
            {
                src: path.resolve(srcPath, "pages/**/*.json"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.json"),
                dest: path.join(destPath, "components"),
            }
        ],
        axmlDirs: [
            {
                src: path.resolve(srcPath, "pages/**/*.axml"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.axml"),
                dest: path.join(destPath, "components"),
            }
        ],
        lessDirs: [
            {
                src: path.resolve(srcPath, "app.less"),
                dest: destPath,
            },
            {
                src: path.resolve(srcPath, "pages/**/*.less"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.less"),
                dest: path.join(destPath, "components"),
            }
        ],
        jsDirs: [
            {
                src: path.resolve(srcPath, "app.js"),
                dest: destPath
            },
            {
                src: path.resolve(srcPath, "pages/**/*.js"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.js"),
                dest: path.join(destPath, "components")
            }
        ]
    },
    prod: {

    },
    dev: {
    }
}