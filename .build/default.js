const path = require("path")
const srcPath = path.resolve(__dirname, "./../src")
const destPath = path.resolve(__dirname, "./../dist")
module.exports = {
    common: {
        srcPath: srcPath,
        destPath: destPath,
        imageSrc: path.resolve(srcPath, "images/**/*.*"),
        imageDest: path.resolve(destPath, "images"),
        lessDirs: [
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