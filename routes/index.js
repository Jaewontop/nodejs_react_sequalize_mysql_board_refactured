const express = require("express");
const router = express.Router();

const main = require("./main.js");
const users = require("./users.js");
const comments = require("./comments");

router.use("/", main);
router.use("/user", users);
router.use("/comments", comments);

module.exports = router;
