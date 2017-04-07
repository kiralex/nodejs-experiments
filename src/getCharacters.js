import getBody from "./webUtils";

const urlPeople = 'https://swapi.co/api/people/?format=json';

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

export { characters, charactersToJson };
