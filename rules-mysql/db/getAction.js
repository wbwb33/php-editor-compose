const mysql = require('mysql');

const get = (stateId) => {
  return new Promise(resolve => {
    const connection = mysql.createConnection({
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });

    connection.query(`SELECT action_label, action_id FROM botika_rule_actions WHERE state_id='${stateId}'`, function (error, results, fields) {
      if (error) throw error;
      else {
        resolve(results);
      }
    });
    
    connection.end();
    
  })
};

module.exports = {
  get
};