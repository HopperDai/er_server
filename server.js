const koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const db = require('./libs/database');
const config = require('./config');
const pathlib = require('path');

// 服务
let server = new koa();
server.listen(config.PORT);

server.use(async (ctx, next) => {
    ctx.user_id = 'adsiufisifjsiodjfos';
    console.log(111);
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

// 路由
let router = new Router();
router.use('/api/', require('./routers/api.router'));
server.use(router.routes());

// 静态文件
server.use(static(pathlib.resolve(__dirname, 'www/')));