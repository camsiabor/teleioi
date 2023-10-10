const fs = require("fs").promises;
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");


(async () => {
    const files = await imagemin([ "D:/snapshot/1.jpg"    ], {
        destination: 'D:/snapshot/acompress',
        plugins: [
            imageminMozjpeg({quality: 50}),
            imageminPngquant( { quality: [ 0.5, 0.6] })
        ]
    });

    console.log(files);
})();

