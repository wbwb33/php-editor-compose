const getAction = require('./db/getAction');
const async = require('async');

const iterater = (array) => {
  return new Promise((resolve,reject) => {
    var obj = [];

    async.forEachOf(
      array,
      async (element) => {
        const tmp = await getAction.get(element.state_id).then().catch(console.error);
        const tmpb = {
          state_label: element.state_label,
          state_actions: tmp
        }
        obj.push(tmpb);
      },
      (err) => {
        if (err) reject(err);
        else resolve(obj);
      }
    );
  });
}

const get = (array) => {
  return new Promise(async (resolve) => {
    const obj = iterater(array);

    resolve(obj);
  })
};

module.exports = {
  get
};