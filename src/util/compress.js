
const fs = require('fs').promises;
const imagemin = require("imagemin");

// lossy
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
// lossless
const optipng = require('imagemin-optipng');
const jpegtran = require('imagemin-jpegtran');

const lossless = [
    optipng(),
    jpegtran(),
]

async function compress(src, des, quality = 1) {
    src = src.replace(/\\/g, '/');
    const stats = await fs.lstat(src);
    let srcArray = stats.isFile() ?
        [ src ] :
        [ src + '/*.jpg', src + '/*.jpeg', src + '/*.png'];


    const plugins = quality >= 1 ?
        lossless :
        [
            mozjpeg( { quality: 100 * quality }),
            pngquant( { quality: [ quality, quality ] })
        ];

    return await imagemin(srcArray, {
        destination: des,
        plugins,
    });
}

module.exports= {
    compress,
};