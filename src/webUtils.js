import http from 'http';

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

export default getBody;
