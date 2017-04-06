import nock from 'nock';
import {
  characters,
  getBody,
  charactersToJson,
} from './getCharacters';

const url = 'http://swapi.co';
const request = '/api/people/?format=json';

test('test of getbody', done => {
  const expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  nock(url).get(request).reply(200, expected);
  getBody('http://swapi.co/api/people/?format=json').then(
    value => {
      expect(value).toBe(expected);
      done();
    },
    error => {
      expect(error).not.toBeNull();
      expect(error).toBeDefined();
      expect(error.message).not.toBeNull();
      expect(error.message).toBeDefined();
      done();
    },
  );
});

test('test of characters', done => {
  const response = JSON.stringify({
    count: 6,
    results: [
      { name: 'test 1' },
      { name: 'test 2' },
      { name: 'test 3' },
      { name: 'test 4' },
    ],
  });

  const expected = {
    error: false,
    characters: ['test 1', 'test 2', 'test 3', 'test 4'],
  };

  const generatedJSON = charactersToJson(response);

  let i;
  expect(generatedJSON.count).toBe(expected.count);
  for (i = 0; i < generatedJSON.characters.length; i++) {
    expect(generatedJSON.characters[i]).toBe(expected.characters[i]);
    i++;
  }
  done();
});
