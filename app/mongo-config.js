var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  created_at: {time: Date, default: Date.now}
});

var usersSchema = new Schema({
  username: String,
  password: String,
  created_at: {time: Date, default: Date.now}
});


