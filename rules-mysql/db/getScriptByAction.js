const mysql = require('mysql');

const get = (actionId) => {
  return new Promise(resolve => {
    const connection = mysql.createConnection({
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });

    connection.query(`SELECT action_script FROM botika_rule_actions WHERE action_id='${actionId}'`, function (error, results, fields) {
      if (error) throw error;
      else {
        // console.log(results);
        resolve(results);
      }
    });
    
    connection.end();
    
  })
};

module.exports = {
  get
};