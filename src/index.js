import * as GetCharacters from './getCharacters';
import Koa from 'koa2';
import KoaRouter from 'koa-router';

const app = new Koa();
const router = KoaRouter();

async function home(ctx) {
  ctx.body = 'Usage : /characters | /timebased';
}

function run() {
  router.get('/', home);
  router.get('/characters', GetCharacters.characters);
  app.use(router.routes());
  app.listen(3000);
  console.log('Server started.');
  console.log('Listening on port 3000');
}

run();
