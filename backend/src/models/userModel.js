const mongoose = require("mongoose");
const bcrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "user"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
/*
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrpt.hashSync(password, 10);
});
*/
userSchema.virtual("fullName").get(function(){
  return `${this.firstName} ${this.lastName}`
});


userSchema.methods = {
  authenticate:async function (password) {
    return await bcrpt.compare(password, this.hash_password);
  },
};

const user = mongoose.model("User", userSchema);
module.exports = user;
