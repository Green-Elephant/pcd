/**
 * Created by GreenElephaantt on 30.07.2017.
 */

const koa = require('koa'),
  app = new koa(),
  db=require('./db/dbMethods.js'),
  env = process.env,
  URL=require('url'),
  Router = require('koa-router'),
  bodyParser  = require('koa-bodyparser'),
  router = new Router();

db.createConnection();

router
  .get('/', async (ctx, next) => {
    ctx.res.writeHead(200);
    console.error(db.getAll());
    ctx.body= await db.getAll();
    return next();
  })
  .post('/set', async (ctx, next) => {
    var data = ctx.request.body;

    data = JSON.stringify(data);

    db.set(data);

    ctx.body = ctx.req;
  })

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});