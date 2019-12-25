const express = require("express");
const router = express.Router();

router.post("/logout", function (req, res) {
  req.session.destroy(() => {
    console.log("im logout");
  });
});

router.post("/signup", async (req, res) => {
  const user_id = req.body.id;
  const user_pw = req.body.pw;
  const user_nickname = req.body.nickname;

  if (!user_id) {
    res.end("아이디를 입력해주세요");
  } else if (!user_pw) {
    res.end("비밀번호를 입력해주세요");
  }

  const id_check_sqlQuery = "select user_id from user_info where user_id = ?";
  const nickname_check_sqlQuery =
    "select user_nickname from user_info where user_nickname = ?";
  const insert_user_info_sqlUery =
    "insert into test.user_info(user_id, user_pw, user_nickname) values (?,?,?)";
  connection.query(id_check_sqlQuery, [user_id], (err, result, fields) => {
    if (err) throw err;
    if (result.length == 0) {
      //DB에 중복되는 id값이 없음
      connection.query(
        nickname_check_sqlQuery,
        [user_nickname],
        (err, result, field) => {
          if (err) throw err;
          if (result.length == 0) {
            //DB에 중복되는 nickname값이 없음
            connection.query(
              //모두 확인되었으니 db에 id,pw, nickname 입력
              insert_user_info_sqlUery,
              [user_id, user_pw, user_nickname],
              (err, result, fields) => {
                if (err) throw err;
                // res.cookie("is_logined", "true", {
                //   maxAge: Date.now() + 60 * 60 * 24 * 30,
                // });
                // res.cookie("user_nickname", user_nickname, {
                //   maxAge: Date.now() + 60 * 60 * 24 * 30,
                // });
                // req.session.is_logined = true;
                req.session.user_nickname = user_nickname;
                res.end("success");
              }
            );
          } else {
            res.end("중복되는 닉네임이 있습니다. 다른 닉네임을 입력해주세요");
          }
        }
      );
    } else {
      res.end("중복 아이디가 존재합니다. 다른 아이디를 입력해주세요");
    }
  });
});

router.post("/signin", async (req, res) => {
  const user_id = req.body.id;
  const user_pw = req.body.pw;

  if (!user_id) {
    res.end("아이디를 입력해주세요");
  } else if (!user_pw) {
    res.end("비밀번호를 입력해주세요");
  }

  const login_check_get_nickname_sqlQuery =
    "select user_nickname from user_info where user_id = ? and user_pw = ?";
  const session_check_get_session_id_sqlQuery =
    "select json_extract(data, '$.user_nickname') as data_user_nickname from sessions where json_extract(data, '$.user_nickname') = ?";

  connection.query(
    login_check_get_nickname_sqlQuery,
    [user_id, user_pw],
    (err, result, field) => {
      if (err) throw err;
      if (result.length == 0) {
        res.end("아이디나 비밀번호가 틀렸습니다");
      } else {
        let user_nickname = result[0].user_nickname;
        // res.cookie("is_logined", "true", {
        //   maxAge: Date.now() + 60 * 60 * 24 * 30,
        // });
        // res.cookie("user_nickname", user_nickname, {
        //   maxAge: Date.now() + 60 * 60 * 24 * 30,
        // });
        //
        //이미 session db에 로그인 되어 있는 게 있는 지 확인후 없으면 아래꺼 실행, 있으면 error
        // req.session.is_logined = true;
        connection.query(
          session_check_get_session_id_sqlQuery,
          [user_nickname],
          (err, result, field) => {
            if (err) throw err;
            if (result.length == 0) {
              req.session.user_nickname = user_nickname;
              res.end("success");
            } else {
              let user_nickname = result[0].data_user_nickname;
              console.log(user_nickname);
              res.end("이미 로그인 중입니다.");
            }
          }
        );
      }
    }
  );
});

module.exports = router;
