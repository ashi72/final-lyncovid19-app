const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  google_url: String,

})

module.exports = mongoose.model('User', UserSchema);
