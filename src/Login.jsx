import { queryAllByAttribute } from "@testing-library/dom";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <p>email</p>
      <textarea
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <p>password</p>
      <textarea
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.massage);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.massage);
                }
              }
        }
      >
        {isLogin ? "login" : "register"}
      </button>
      <br />
      <br />
      <span
        onClick={() => {
          setIsLogin(!isLogin);
        }}
      >
        {isLogin ? "Create new account? >>>" : "Back to login >>>"}
      </span>
    </div>
  );
};

export default Login;
