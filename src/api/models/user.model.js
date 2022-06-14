const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: false },
  surnames: { type: String, trim: true, required: false },
  title: { type: String, trim: true, required: false },
  location: { type: String, trim: true, required: false },
  img: { type: String, trim: true, required: false },
});


UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("users", UserSchema);
module.exports = User