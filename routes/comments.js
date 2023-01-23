const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  db.Comments.findAll({}).then((data) => {
    res.json(data);
  });
});

router.post("/", async (req, res) => {
  //TODO: user_nickname 받아서 넣어주게 해야함 이제
  const content = req.body.content;
  db.Comments.create({ content: content }).then(res.send({ success: true }));
});

router.post("/delete", async (req, res) => {
  const id = req.body.id;
  db.Comments.destroy({ where: { id: id } }).then(res.send({ success: true }));
});

module.exports = router;
