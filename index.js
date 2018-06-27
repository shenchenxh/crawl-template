var fs = require('fs');
const fetch = require('node-fetch');
var xlsx = require('node-xlsx').default;

function getData(postData) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    }
  });
}

// var buffer = xlsx.build([{ name: 'test', data: data }]);

const header = ['column1', 'column2'];
const resultData = [header];

async function fetchInfo(id) {
  const postData = {
    id
  };
  const res = await getData(postData);
  const json = await res.json();
  let arr = header.map(h => {
    return json[h];
  });
  return arr;
}

(async function() {
  let start = 0;
  let end = 100;
  for (let i = start; i <= end; i++) {
    let result = await fetchInfo(i.toString());
    resultData.push(result);
  }

  var buffer = xlsx.build([{ name: 'test', data: resultData }]); // Returns a buffer
  fs.writeFile('test.xlsx', buffer, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
})();
