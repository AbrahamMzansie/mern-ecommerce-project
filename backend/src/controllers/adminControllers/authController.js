const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async(error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if(!user.role || !user.role === "admin")return res.status(400).json({message: "Customer login portal or Check user role"});
      if (await user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRECT,
          {
            expiresIn: process.env.TOKEN_EXPIRE_ON,
          }
        );
        const { firstName, lastName, role, email, fullName, _id } = user;
        res.cookie("token", token, { expiresIn: process.env.TOKEN_EXPIRE_ON });
        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            role,
            email,
            fullName,
            _id,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password or Email",
        });
      }
    } else {
      return res.status(400).json({ message: "Password or email is invalid" });
    }
  });
};

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin already exist",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      userName: shortid.generate(),
      lastName,
      email,
      hash_password,
      role: "admin",
    });
    _user.save((error, data) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error occured when creating your profile" });
      }
      if (data) {
        return res.status(201).json({
          user: data,
          message: "Action was successful",
        });
      }
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully",
  });
};

const profile = (req, res) => {
  return res.status(201).json({
    message: "Oracle User created",
  });
};

module.exports = {
  signup,
  signin,
  signout,
  profile,
};
