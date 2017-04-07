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
function arrayFromSubreddit(response) {
  const jsonResponse = JSON.parse(response);
  const array = {
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
function isEqual(elem1, elem2) {
  return elem1.id == elem2.id;
}

function getUnionEntries(elem1, elem2) {
  return _.uniqWith(_.union(elem1, elem2), isEqual);
}

function getNewEntries(union, old) {
  return _.differenceWith(union, old, isEqual);
}

function getRemovedEntries(union, news) {
  return _.differenceWith(union, news, isEqual);
}

async function getNewSubreddit() {
  try {
    const response = await getBody(fullURL);
    const array = arrayFromSubreddit(response);

    const union = getUnionEntries(globalArray.elements, array.elements);
    const ajoute = getNewEntries(union, globalArray.elements);
    const retire = getRemovedEntries(union, array.elements);

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
