/**
 * Created by GreenElephaantt on 30.07.2017.
 */

const koa = require('koa'),
  app = new koa(),
  db=require('./db/dbMethods.js'),
  env = process.env,
  URL=require('url'),
  Router = require('koa-router'),
  router = new Router();

db.createConnection();

router
  .get('/', async (ctx, next) => {
    ctx.body= await db.getAll();
    return next();
  })
  .get('/set', async (ctx, next) => {
    const url=URL.parse(ctx.url);
    let urlInfo = decodeURIComponent(url.query);
    urlInfo=JSON.parse(urlInfo);

    db.set(urlInfo);

    return next();
  });

app
  .use(router.routes())
  .use(router.allowedMethods());





app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});