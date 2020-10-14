const request = require('request');

const post = (actionId,script) => {
  return new Promise((resolve) => {
    request.post(`${process.env.BACKEND}/update/action/${actionId}`, {
      form: {
        script: script
      }
    }, (err, res, body) => {
      if (err) { return console.log(err); }
      resolve(body);
    });
  })
}

module.exports = {
  post
};