import Koa from 'koa2';
import KoaRouter from 'koa-router';
import http from 'http';

const app = new Koa();
const router = KoaRouter();
const urlPeople = 'http://swapi.co/api/people/?format=json';

const getBody = url =>
  new Promise(function(resolve, reject) {
    let temp = '';
    http.get(url, function(res) {
      res.on('data', data => {
        temp += data;
      });
      res.on('end', () => {
        resolve(temp);
      });
      res.on('error', e => {
        reject(e);
      });
    });
  });

function charactersToJson(response) {
  const res = {};
  const json = JSON.parse(response);
  res['error'] = false;
  res.characters = [];
  json.results.forEach(elem => {
    res.characters.push(elem.name);
  });
  res.length = json.results.length;
  return res;
}

async function characters(ctx) {
  const res = {};
  return getBody(urlPeople).then(
    value => {
      ctx.response.type = 'json';
      ctx.body = JSON.stringify(charactersToJson(value) );
    },
    e => {
      ctx.response.type = 'json';
      res['error'] = true;
      res['errorMessage'] = e.message;
      ctx.body = JSON.stringify(res);
    },
  );
}
async function home(ctx) {
  ctx.body = 'Usage : /characters | /timebased';
}

function run() {
  router.get('/', home);
  router.get('/characters', characters);
  app.use(router.routes());
  app.listen(3000);
  console.log('Server started.');
  console.log('Listening on port 3000');
}

export { getBody, characters, charactersToJson, run };
