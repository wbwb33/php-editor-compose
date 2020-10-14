const request = require('request');

const get = (actionId) => {
  return new Promise((resolve) => {
    request(process.env.BACKEND, (err, res, body) => {
      if (err) { return console.log(err); }
      resolve(body);
    });
  })
}

module.exports = {
  get
};