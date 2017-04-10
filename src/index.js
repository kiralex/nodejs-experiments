// @flow

import * as GetCharacters from './getCharacters';
import Koa from 'koa2';
import KoaRouter from 'koa-router';
import * as GetNewSubreddit from './getNewSubreddit';

const app = new Koa();
const router = KoaRouter();

// @flow
async function home(ctx: { body: string }) {
  ctx.body = 'Usage : /characters | /timebased';
}

// @flow
async function timebased(ctx: { body: string, response: { type: string } }) {
  ctx.response.type = 'json';
  ctx.body = JSON.stringify(GetNewSubreddit.getGlobalArrray());
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
