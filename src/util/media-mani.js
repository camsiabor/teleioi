
const ffmpeg = require('fluent-ffmpeg');

async function watermark(opts) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(opts.src)
            .input(opts.mark)
            .complexFilter(opts.complexFilter || [
                "[1]scale=iw*1.0:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2",
            ])
            .on('end', function() {
                resolve();
            })
            .on('error', function(err, stdout, stderr) {
                reject(stderr + '   |   |   |   ' + err);
            })
            .save(opts.des);
    });
}

async function videofy(opts) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(opts.src)
            // .inputFPS(1 / 5)
            .videoCodec(opts.videoCodec || 'libx264')
            .videoFilter(opts.videoFilter || 'pad=ceil(iw/2)*2:ceil(ih/2)*2' )
            .format(opts.format || 'mp4')
            .loop(opts.loop || 30)
            .fps(opts.fps || 1)
            // .videoBitrate(opts.videoBitrate || 1024)
            .outputOptions(opts.outputOptions || '-pix_fmt yuv420p')
            // .complexFilter( opts.complexFilter || "[0]scale='iw-mod(iw,2)':'ih-mod(ih,2)'[m];[m][1]" )
            .noAudio()
            .on('end', function() {
                resolve();
            })
            .on('error', function(err, stdout, stderr) {
                reject(stderr + '   |   |   |   ' + err);
            })
            .save(opts.des);
    });
}

module.exports = {
    watermark,
    videofy,
};

