var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

if(process.env.NODE_ENV === 'production'){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
      username: String,
      password: String,
      created_at: {time: Date, default: Date.now}
  });
  
  var User = mongoose.model('User', userSchema);

  User.prototype.comparePassword = function(username, attemptedPassword, callback){
    bcrypt.compare(attemptedPassword, this.findOne(this.username).password, function(err, isMatch){
      if(err) console.log("Error comparing passwords ", err);
      callback(isMatch);
    });
  };

  User.prototype.hashPassword = function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash){
        this.password = hash;
      });
  }

} else {
  //Must be in dev enviromennt
  var User = db.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    initialize: function(){
      this.on('creating', this.hashPassword);
    },
    comparePassword: function(attemptedPassword, callback) {
      bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
        callback(isMatch);
      });
    },
    hashPassword: function(){
      var cipher = Promise.promisify(bcrypt.hash);
      return cipher(this.get('password'), null, null).bind(this)
        .then(function(hash) {
          this.set('password', hash);
        });
    }
  });
}
module.exports = User;
