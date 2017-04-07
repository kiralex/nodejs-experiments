import nock from 'nock';
import * as GetCharacters from './getCharacters';

const url = 'http://swapi.co';
const request = '/api/people/?format=json';

test('test of characters', () => {
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

  const generatedJSON = GetCharacters.charactersToJson(response);

  let i;
  expect(generatedJSON.count).toBe(expected.count);
  for (i = 0; i < generatedJSON.characters.length; i++) {
    expect(generatedJSON.characters[i]).toBe(expected.characters[i]);
    i++;
  }
});
