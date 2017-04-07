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
        console.log('=====================================');
        reject(e);
      });

      res.on('abort', e => {
        console.log('=====================================');
        reject(e);
      });
    });
  });

export default getBody;
