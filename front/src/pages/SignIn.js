import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://localhost:3001/users/signin";

export default function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const signIn = async (id, pw) => {
    axios
      .post(URL, {
        user_id: id,
        user_pw: pw,
      })
      .then(function (response) {
        setErrorMessage(response.data.message);
        console.log(response.data);
        console.log(response.data.message);
        console.log(response.data.success);
        if (response.data.success === true) {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        console.log("[DEBUG] error:" + error);
      });
  };

  return (
    <div id="accounts">
      <h1> 로그인 해주세요</h1>
      <h3>Id</h3>
      <input onChange={onChangeId}></input>
      <h3>Pw</h3>
      <input onChange={onChangePw}></input>
      <div
        className="button"
        onClick={() => {
          signIn(id, pw);
        }}
      >
        로그인
      </div>
      <p>{errorMessage}</p>
    </div>
  );
}
