import * as GetCharacters from './getCharacters';
import Koa from 'koa2';
import KoaRouter from 'koa-router';
import * as GetNewSubreddit from './getNewSubreddit';

const app = new Koa();
const router = KoaRouter();

async function home(ctx) {
  ctx.body = 'Usage : /characters | /timebased';
}

async function timebased(ctx) {
  ctx.response.type = 'json';
  ctx.body = GetNewSubreddit.getGlobalArrray();
}

function run() {
  router.get('/', home);
  router.get('/characters', GetCharacters.characters);
  router.get('/timebased', timebased);
  app.use(router.routes());
  GetNewSubreddit.run();
  app.listen(3000);
  console.log('Server started.');
  console.log('Listening on port 3000');
}

run();
