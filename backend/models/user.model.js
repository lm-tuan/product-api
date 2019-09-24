const mongoose = require('mongoose');
bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    address:String,
    phone:String,
    cart:[Object]
});

UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  
  //hashing a password before saving it to the database
  UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });


const User = mongoose.model('users',UserSchema);

module.exports =  User;