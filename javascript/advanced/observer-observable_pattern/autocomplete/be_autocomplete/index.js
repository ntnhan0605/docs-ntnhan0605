const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const data = require('./fakeData');

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res) => {
  let limit;
  let offset;
  let searchStr = req.query.search || '';
  debugger;
  console.log(data);

  let dataSearch = data.filter((item) => {
    return (
      item.first_name?.toLowerCase().indexOf(searchStr.toLowerCase()) != -1
    );
  });

  if (req.query.limit) {
    // dataSearch = dataSearch.slice(0, req.query.limit);
  }

  res.json({ data: dataSearch });
});

app.get('/server');

app.listen(8888);
