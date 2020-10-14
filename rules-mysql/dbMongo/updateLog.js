const mongoose = require("mongoose");
const logModel = require("./model");


var uri = process.env.MONGO_URL;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const update = (label, actionId) => {
  return new Promise(resolve => {
    const date = new Date();
    const data = [
      {
        label: label,
        action_id: actionId,
        date: date.toISOString()
      }
    ]

    logModel.insertMany(data, (err, result) => {
      if(err) {
        console.log(err);
        resolve(false);
      }
      else resolve(true);
    }) 
  })
}

module.exports = {
  update
};