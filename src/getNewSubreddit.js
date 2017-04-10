// @flow

import getBody from './webUtils';
import _ from 'lodash';

const url = 'https://www.reddit.com/r/';
const subReddit = 'funny';
const type = 'new';
const apiType = '.json';
const nbResults = '10';
const fullURL = url +
  subReddit +
  '/' +
  type +
  '/' +
  apiType +
  '?limit=' +
  nbResults;

let globalArray = {
  length: 0,
  elements: [],
};
function arrayFromSubreddit(response: string) {
  const jsonResponse: {
    data: {
      children: Array<{
        data: {
          id: string,
          title: string,
        },
      }>,
    },
  } = JSON.parse(response);
  const array: {
    length: number,
    elements: Array<{ id: string, title: string }>,
  } = {
    length: 0,
    elements: [],
  };
  let elem = '';
  for (let i = 0; i < jsonResponse.data.children.length; i++) {
    elem = jsonResponse.data.children[i].data;
    array.elements.push({ id: elem.id, title: elem.title });
    array.length += 1;
  }
  return array;
}

// compare only the ID
function isEqual(elem1: { id: string }, elem2: { id: string }) {
  return elem1.id == elem2.id;
}

function getUnionEntries(
  elem1: Array<{ id: string, title: string }>,
  elem2: Array<{ id: string, title: string }>,
) {
  return _.uniqWith(_.union(elem1, elem2), isEqual);
}

function getNewEntries(
  union: Array<{ id: string, title: string }>,
  old: Array<{ id: string, title: string }>,
) {
  return _.differenceWith(union, old, isEqual);
}

function getRemovedEntries(
  union: Array<{ id: string, title: string }>,
  news: Array<{ id: string, title: string }>,
) {
  return _.differenceWith(union, news, isEqual);
}

async function getNewSubreddit() {
  try {
    const response: string = await getBody(fullURL);
    const array: {
      length: number,
      elements: Array<{ id: string, title: string }>,
    } = arrayFromSubreddit(response);

    const union: Array<{ id: string, title: string }> = getUnionEntries(
      globalArray.elements,
      array.elements,
    );
    const ajoute: Array<{ id: string, title: string }> = getNewEntries(union, globalArray.elements);
    const retire: Array<{ id: string, title: string }> = getRemovedEntries(union, array.elements);

    console.log(new Date().toLocaleTimeString());

    if (ajoute.length > 0) {
      if (retire.length > 0) {
        console.log('Removed elements : ');
        retire.forEach(elem => {
          console.log(elem.title);
        });
      }
      console.log('Added elements : ');
      ajoute.forEach(elem => {
        console.log(elem.title);
      });
      console.log('');
    } else {
      console.log('No new element\n');
    }
    globalArray = array;
  } catch (err) {
    console.log('Error when getting data from Reddit : ' + err.message);
  }
}

function run() {
  getNewSubreddit();
  setInterval(getNewSubreddit, 5000);
}

function getGlobalArrray() {
  return globalArray;
}

export default run;
export {
  run,
  getGlobalArrray,
  arrayFromSubreddit,
  isEqual,
  getUnionEntries,
  getNewEntries,
  getRemovedEntries,
};
