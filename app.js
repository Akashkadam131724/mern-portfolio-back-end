require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/conn");
const app = express();
const router = require("./Routes/router");

const port = 6002;

app.use(cors());
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("<h1>Home route</h1>");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
