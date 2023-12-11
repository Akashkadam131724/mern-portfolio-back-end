const express = require("express");
const { createUser, getUsers } = require("../controllers/users");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/user").get(getUsers);

module.exports = router;
