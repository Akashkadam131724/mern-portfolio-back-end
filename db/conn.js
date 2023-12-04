const mongoose = require("mongoose");

const DB = process.env.DATA_BASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("db connection established");
  })
  .catch((e) => console.log(e.message));
