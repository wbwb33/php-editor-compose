const fs = require('fs');
const request = require('request');
// f0cf0b
const get = (actionId) => {
  return new Promise((resolve) => {
    request(`${process.env.BACKEND}/action/${actionId}`, (err, res, body) => {
      if (err) { return console.log(err); }
      resolve(body);
    });
  })
}

module.exports = {
  get
};