const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/logout", function (req, res) {
  //TODO: 구현 해야함 passport로
  req.session.destroy(() => {
    console.log("im logout");
  });
});

router.get("/", async (req, res) => {
  db.Users.findAll({}).then((data) => {
    res.json(data);
  });
});
router.post("/signup", async (req, res) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;
  const user_nickname = req.body.user_nickname;

  async function findIfIdExists(user_id) {
    let isIdExists;
    await db.Users.findOne({ where: { user_id: user_id } }).then((data) => {
      if (data != (null || undefined)) {
        isIdExists = true;
      } else {
        isIdExists = false;
      }
    });
    return isIdExists;
  }
  async function findIfNicknameExists(user_nickname) {
    let isNicknameExists;
    await db.Users.findOne({ where: { user_nickname: user_nickname } }).then(
      (data) => {
        if (data != (null || undefined)) {
          isNicknameExists = true;
        } else {
          isNicknameExists = false;
        }
      }
    );
    return isNicknameExists;
  }

  if (!user_id) {
    return res.send({ success: false, message: "아이디를 입력해주세요" });
  } else if (!user_pw) {
    return res.send({ success: false, message: "비밀번호를 입력해주세요" });
  }

  //id nickname 존재 유무 확인하고 기존 db에 존재 안하면 id, pw, nickname 추가
  //promise async, await 때문에 엄청 고생했네..
  const isIdExistsPromise = findIfIdExists(user_id);
  const isNicknameExistsPromise = findIfNicknameExists(user_nickname);
  const isIdExists = await isIdExistsPromise;
  const isNicknameExists = await isNicknameExistsPromise;
  if (isIdExists == false && isNicknameExists == false) {
    await db.Users.create({
      user_id: user_id,
      user_password: user_pw,
      user_nickname: user_nickname,
    }).then(
      res.send({
        success: true,
        message: user_nickname,
      })
    );
  } else {
    res.send({
      success: false,
      message: "이미 존재하는 아이디 혹은 닉네임입니다",
    });
  }
});

router.post("/signin", async (req, res) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;

  if (!user_id) {
    res.send({
      success: false,
      message: "아이디를 입력해주세요",
    });
  } else if (!user_pw) {
    res.send({
      success: false,
      message: "비밀번호를 입력해주세요",
    });
  }

  db.Users.findOne({
    where: { user_id: user_id, user_password: user_pw },
  }).then((data) => {
    if (data == (null || undefined)) {
      res.send({ success: false, message: "아이디나 비밀번호가 틀렸습니다" });
    } else {
      const user_nickname = data.user_nickname;
      res.send({ success: true, message: user_nickname });
    }
  });
});

module.exports = router;
