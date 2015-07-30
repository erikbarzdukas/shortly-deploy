var db = require('../config');
var crypto = require('crypto');

if(process.env.NODE_ENV === 'production'){
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

  urlSchema.pre('save', function(err) {
    if(err) console.log("Err saving link ", err);

    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    model.code = shasum.digest('hex').slice(0, 5);
  });
  
  var Link = mongoose.model('Link', urlSchema);

} else {
  //Must be dev environment
  var Link = db.Model.extend({
    tableName: 'urls',
    hasTimestamps: true,
    defaults: {
      visits: 0
    },
    initialize: function(){
      this.on('creating', function(model, attrs, options){
        var shasum = crypto.createHash('sha1');
        shasum.update(model.get('url'));
        model.set('code', shasum.digest('hex').slice(0, 5));
      });
    }
  });
}
module.exports = Link;
