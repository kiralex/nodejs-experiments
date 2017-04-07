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

function isEqual(elem1, elem2) {
  return elem1.id == elem2.id;
}

async function getNewSubreddit() {
  try {
    const response = await getBody(fullURL);
    const array = arrayFromSubreddit(response);
    const union = _.union(globalArray.elements, array.elements);
    const unionUniq = _.uniqWith(union, isEqual);
    const ajoute = _.differenceWith(union, globalArray.elements, isEqual);
    const retire = _.differenceWith(union, array.elements, isEqual);

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

function run(){
  getNewSubreddit();
  setInterval(getNewSubreddit, 5000);
}

function getGlobalArrray(){
  return globalArray;
}

export default run;
export {run, getGlobalArrray};
