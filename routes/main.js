const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../front/build"))); // 이거 없으면 밑에 코드 작동 안함!

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

// router.post("/", function (req, res) {
//   console.log("session:" + req.session.user_nickname);
//   res.send({
//     user_nickname: req.session.user_nickname,
//   });
// });

module.exports = router;
