const mysql = require('mysql');

const get = () => {
  return new Promise(resolve => {
    const connection = mysql.createConnection({
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });

    connection.query(`SELECT state_label, state_id FROM botika_rule_states WHERE rule_id='c381e5'`, function (error, results, fields) {
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