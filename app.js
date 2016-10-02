const stream = require('stream');
const fs = require('fs');
const Koa = require('koa');
const ffmpeg = require('fluent-ffmpeg');

const app = new Koa();

app.use((ctx, next) =>
{
    ctx.type = 'mp3';
    ctx.response.attachment('audio.mp3');
    ctx.body = stream.PassThrough();
    const videoStream = fs.createReadStream('./video.m4a');
    ffmpeg(videoStream)
    .withAudioCodec('libmp3lame')
    .toFormat('mp3')
    .pipe(ctx.body, {end: true});
});

app.listen(3000);
