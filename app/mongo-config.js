var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(/*Mongo instanze on Azure*/, function(err){
  if(err) console.log("Mongo error ", err);

  /**
   * Might not work b/c 'exports' value in anon func
   * could differ from invocation context
   */
  exports.urlSchema = new Schema({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number,
    created_at: {time: Date, default: Date.now}
  });

  exports.userSchema = new Schema({
    username: String,
    password: String,
    created_at: {time: Date, default: Date.now}
  });
});



