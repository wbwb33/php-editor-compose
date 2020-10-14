const mysql = require('mysql');

const update = (actionId,script) => {
  return new Promise(resolve => {
    const connection = mysql.createConnection({
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });

    connection.query(
      `UPDATE botika_rule_actions SET action_script=? WHERE action_id='${actionId}'`, 
      [script], 
      function (error, results, fields) {
        if (error) throw error;
        else {
          resolve(results.message);
        }
      }
    );
    
    connection.end();
    
  })
};

module.exports = {
  update
};