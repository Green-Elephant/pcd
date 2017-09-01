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
    ctx.res.writeHead(200);
    ctx.body= await db.getAll();
    return next();
  })
  .post('/set', async (ctx, next) => {
    var data = await getBody(ctx);

    db.set(data);

    ctx.body = ctx.req;
  })

app
  .use(router.routes())
  .use(router.allowedMethods());


function getBody(ctx){
  return new Promise(function(resolve,reject){
    var data = '';
    ctx.on('data', function (chunk) {
      data += chunk;
    })
    ctx.on('end', function (chunk) {
      resolve(data);
    })
  })
}



app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});