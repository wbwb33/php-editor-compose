require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const getAction = require('./db/getAction');
const getStates = require('./db/getStates');
const getScriptByAction = require('./db/getScriptByAction');
const iter = require('./iter');
const update = require('./db/updateScript');
const getActionLabel = require('./db/getActionLabel');
const mongodb = require("./dbMongo/updateLog");

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const a = await getStates.get().then().catch(console.error);
  const tmp = await iter.get(a);
  
  res.send(tmp);
});

app.get('/action/:actionId', async (req, res) => {
  const a = await getScriptByAction.get(req.params.actionId).then().catch(console.error);

  res.send(a[0].action_script);
});

app.post('/update/action/:actionId', async (req, res) => {
  const actionId = req.params.actionId;
  const script = req.body.script;
  const updater = await update.update(actionId,script);
  const label = await getActionLabel.get(actionId);
  const date = new Date();

  const log = date.toISOString() + " - Updated " + label[0].action_label;
  const tmp = mongodb.update(label[0].action_label, actionId);
  if(!tmp) console.log("error saving log");
  
  res.send(log);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));