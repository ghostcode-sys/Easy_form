const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FormQues = require("./formQuestion");

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityAns: {
    type: String,
    required: true,
  },
  securityQues: {
    type: String,
    required: true,
  },
  forms: [
    {
      formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formQuestion",
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    }
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
