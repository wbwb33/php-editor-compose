require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const fs = require('fs');
const read = require('./read');
const update = require('./update');
const forTable = require('./forTable');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.render('index', {
    code: 'go to /action/:actionId',
    actionId: 'welcome'
  });
});

app.get('/action/:actionId', async (req, res) => {
  const actionId = req.params.actionId;
  const text = await read.get(actionId);
  const data = JSON.parse(await forTable.get()).sort((a,b) => a.state_label.localeCompare(b.state_label));

  res.render('index', {
    code: text,
    actionId: actionId,
    data: data
  });
});

app.post('/action/update', async (req, res) => {
  const actionId = req.body.actionId;
  const script = req.body.script;
  const updater = await update.post(actionId,script);
  console.log(updater);
  res.send(updater);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));