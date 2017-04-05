import Koa from 'koa2';
import KoaRouter from 'koa-router';
import http from 'http';

const app = new Koa();
const router = KoaRouter();
const urlPeople = 'http://swapi.co/api/planets/?format=json';

const getBody = (url) =>
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

async function characters(ctx) {
  return getBody(urlPeople).then(
    value => {
      const json = JSON.parse(value);
      ctx.response.type = 'html';
      ctx.body = 'Results number : ' + json.results.length + '<br/>';
	  ctx.body += 'Results : <br/>';
      json.results.forEach(elem => {
        ctx.body += elem.name + '<br/>';
      });
    },
    e => {
      ctx.response.type = 'html';
      ctx.body = e.message;
    },
  );
}
async function home(ctx) {
  ctx.body = 'Usage : /characters | /timebased';
}
router.get('/', home);
router.get('/characters', characters);
app.use(router.routes());
app.listen(3000);
console.log('Server started.');
console.log('Listening on port 3000');
