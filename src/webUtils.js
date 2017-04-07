import https from 'https';

const getBody = url =>
  new Promise(function(resolve, reject) {
    let temp = '';
    https.get(url, function(res) {
      res.on('data', data => {
        temp += data;
      });
      res.on('end', () => {
        resolve(temp);
      });
      res.on('error', e => {
        reject(e);
      });

      res.on('abort', e => {
        reject(e);
      });
    });
  });

export default getBody;
