const Users = require("../models/user-schema");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const createUser = async (req, res) => {
  try {
    const { fname, lname, email, mobile, message } = req.body;
    if (!fname || !lname || !email || !mobile) {
      res.status(401).json({ status: 401, error: "All Input require" });
    }

    const preUser = await Users.findOne({ email: email });
    if (preUser) {
      const userMessage = await preUser.MessageSave(message);

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you. Your contact form submitted",
        text: "We will get back to you!",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ status: 500, error: "Error sending email" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });
    } else {
      const newUser = await Users.create({
        fname,
        lname,
        email,
        mobile,
        messages: { message: message },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you. Your contact form submitted",
        text: "We will get back to you!",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ status: 500, error: "Error sending email" });
        } else {
          console.log("Email sent" + info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent successfully" });
        }
      });

      res.status(201).json({ status: 201, newUser });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: error.message });
    console.log("catch error");
  }
};

const getUsers = async (req, res) => {
  try {
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
