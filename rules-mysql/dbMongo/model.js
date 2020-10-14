const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let logs = new Schema(
  {
    label: {
      type: String
    },
    action_id: {
      type: String
    },
    date: {
      type: Date
    }
  },
  { collection: process.env.NODE_ENV }
);

module.exports = mongoose.model("logs", logs);