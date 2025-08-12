const express = require("express");
const { createUser, getUsers } = require("../controllers/users");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/user").get(getUsers);

module.exports = router;

// DATA_BASE =  mongodb+srv://kadamakash131724:iBGYbohzoKtZiLUe@clusterportfolio.bixxduo.mongodb.net/portfolio?retryWrites=true&w=majority
// EMAIL = kadamakash131724@gmail.com
// PASSWORD = fvsa noxy qltu ckxd
