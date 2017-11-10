const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username : { type: String, required: [true, 'Username can\'t be blank']},
  password : { type: String, required: [true, 'You must have a password']}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
