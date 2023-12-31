const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email");
    },
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  messages: [],
});
// save message
userSchema.methods.MessageSave = async function (message) {
  try {
    this.messages = this.messages?.concat({ message });
    await this.save();
    return message;
  } catch (error) {
    console.log(error);
  }
};

const Users = new mongoose.model("users", userSchema);

module.exports = Users;
