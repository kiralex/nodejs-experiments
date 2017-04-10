import {
  arrayFromSubreddit,
  isEqual,
  getUnionEntries,
  getNewEntries,
  getRemovedEntries,
} from './getNewSubreddit';
import fs from 'fs';
// to use deep isEqual
import _ from 'lodash';

// is equal
test('test of isEqual', () => {
  const elem1 = { id: '1', titre: 'titre1' },
    elem2 = { id: '2', titre: 'titre2' },
    elem3 = { id: '1', titre: 'titre2' };

  expect(isEqual(elem1, elem1)).toBe(true);
  expect(isEqual(elem1, elem2)).toBe(false);
  expect(isEqual(elem1, elem3)).toBe(true); // because the two element have the same id
});

test('test of arrayFromSubreddit', () => {
  const json = fs.readFileSync('src/getNewSubreddit.example.json', 'utf8');

  const expected = {
    length: 2,
    elements: [
      {
        id: '640azj',
        title: 'Hey Russia',
      },
      {
        id: '640ax9',
        title: "Hey Russia, don't come to school tomorrow",
      },
    ],
  };

  expect(arrayFromSubreddit(json)).toEqual(expected);
});

test('test of getUnionEntries', () => {
  const elem1 = { id: '1', titre: 'titre1' },
    elem2 = { id: '2', titre: 'titre2' },
    elem3 = { id: '1', titre: 'titre1' },
    elem4 = { id: '3', titre: 'titre3' };

  const union = [elem1, elem2, elem4];
  const arr1 = [elem1, elem2];
  const arr2 = [elem2, elem3, elem4];

  expect(getUnionEntries(arr1, arr2)).toEqual(union);
});

test('test of getNewEntries', () => {
  const elem1 = { id: '1', titre: 'titre1' },
    elem2 = { id: '2', titre: 'titre2' },
    elem3 = { id: '3', titre: 'titre3' };

  const expected = [{ id: '3', titre: 'titre3' }];

  const news = [elem3];
  const arr1 = [elem1, elem2];
  const arr2 = [elem2, elem3];
  const union = getUnionEntries(arr1, arr2);

  expect(getNewEntries(union, arr1)).toEqual(news);
});

test('test of getRemovedEntries', () => {
  const elem1 = { id: '1', titre: 'titre1' },
    elem2 = { id: '2', titre: 'titre2' },
    elem3 = { id: '3', titre: 'titre3' };

  const expected = [{ id: '3', titre: 'titre3' }];

  const news = [elem1];
  const arr1 = [elem1, elem2];
  const arr2 = [elem2, elem3];
  const union = getUnionEntries(arr1, arr2);

  expect(getRemovedEntries(union, arr2)).toEqual(news);
});
