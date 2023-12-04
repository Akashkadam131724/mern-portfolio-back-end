const Users = require("../models/user-schema");

const createUser = async (req, res) => {
  try {
    const { fname, lname, email, mobile } = req.body;
    const newUser = await Users.create({
      fname,
      lname,
      email,
      mobile,
    });
    res.status(200).send({
      message: "user responded successfully",
      data: newUser,
    });
  } catch (error) {
    res.send({
      error: error.message,
      message: "api error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { fname, lname, email, mobile } = req.body;
    const users = await Users.find();
    res.status(200).send({
      data: users,
    });
  } catch (error) {
    res.send({
      error: error.message,
      message: "api error",
    });
  }
};

module.exports = { createUser, getUsers };
