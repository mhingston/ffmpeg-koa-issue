const stream = require('stream');
const fs = require('fs');
const Koa = require('koa');
const ffmpeg = require('fluent-ffmpeg');

const app = new Koa();

app.use((ctx, next) =>
{
    ctx.type = 'mp3';
    ctx.response.attachment('audio.mp3');
    const videoStream = fs.createReadStream('./video.m4a');
    ctx.body =  ffmpeg(videoStream)
    .withAudioCodec('libmp3lame')
    .toFormat('mp3')
    .pipe(stream.PassThrough(), {end: true});
});

app.listen(3000);
