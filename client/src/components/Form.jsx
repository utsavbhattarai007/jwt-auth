import React, { useState, useEffect } from "react";
import styles from "../css/Form.module.css";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiUpload,
} from "react-icons/fi";
import axios from "../config/axios.js";
const Form = () => {
  const [eye, isEye] = useState(false);
  const [auth, isAuth] = useState("login");
  const [pic, setPic] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [picUrl,setPicUrl] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const swap = () => {
    setData({
      username: "",
      email: "",
      password: "",
      createPassword: "",
    });
    setPic("");
    isAuth(auth === "login" ? "register" : "login");
  };
  const picUpload = (e) => {
    const [file] = e.target.files;
    setPic(URL.createObjectURL(file));
    getImgUrl(file);
  };

  const handleChange = (e) => {
    //handling all changes in one state
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(), //Removing white spaces
    });
  };

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Resetting err and msg state while inputing
  useEffect(() => {
    //change error and message state to empty string while inputing
    setErr("");
    setMsg("");
  }, [data]);

  //Auth submit
  const onSubmit = async (e) => {
    setMsg("");
    setErr("");
    e.preventDefault();
    //Sending data to database
    {
      auth === "login" ? login() : register();
    }
  };

  //login
  const login = async () => {
    try {
      const res = await axios.post(
        "/login",
        {
          email: data.email,
          password: data.password,
        },
        header
      );
      if (res) {
        setMsg(res.data.msg);
        localStorage.setItem("access", res.data.accessToken);
        localStorage.setItem("refresh", res.data.refreshToken);
        window.location.href="/app";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.msg);
      }
    }
  };

  //Register
  const register = async () => {
    try {
      if(data.password !== data.createPassword){
        return setErr("Password doesn't match");
      }
      const res = await axios.post(
        "/signup",
        {
          username: data.username,
          email: data.email,
          password: data.password,
          profilePic: picUrl,
        },
        header
      );
      if (res) {
        setMsg(res.data.msg);
        setTimeout(() => {
          swap();
        }, 2000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.msg);
      }
    }
  };

  //Upload image and get img url
  const getImgUrl = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    const res = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {msg,imgUrl} = res.data;
    setPicUrl(imgUrl);
  };

  return (
    <>
      <div className={styles.form_container}>
        <div className={styles.form_wrapper}>
          <div className={styles.header}>
            <p>{auth === "login" ? "Login" : "Register"}</p>
          </div>
          <form onSubmit={onSubmit}>
            {auth === "login" ? (
              <>
                <div className={styles.input_field}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={data.email}
                    required
                  />
                  <FiMail className={styles.i} />
                </div>
                <div className={styles.input_field}>
                  <input
                    type={eye ? "text" : "password"}
                    placeholder="Enter your Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  <FiLock className={styles.i} />
                  {eye ? (
                    <FiEye className={styles.i1} onClick={() => isEye(!eye)} />
                  ) : (
                    <FiEyeOff
                      className={styles.i1}
                      onClick={() => isEye(!eye)}
                    />
                  )}
                </div>
                {err && (
                  <p className={styles.err_con}>
                    <label className={styles.msg1}>{err}</label>
                  </p>
                )}
                {msg && (
                  <p className={styles.msg_con}>
                    <label className={styles.msg2}>{msg}</label>
                  </p>
                )}
                <span>Forget Password?</span>
              </>
            ) : (
              <>
                <div className={styles.pic_container}>
                  <input type="file" name="img" onChange={picUpload} />
                  <button type="submit" className={styles.pic_upload}>
                    {pic ? (
                      <img src={pic} className={styles.pic} />
                    ) : (
                      <FiUpload className={styles.uploadbtn} />
                    )}
                  </button>
                </div>
                <div className={styles.input_field}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your Name"
                    value={data.username}
                    onChange={handleChange}
                    required
                  />
                  <FiUser className={styles.i} />
                </div>
                <div className={styles.input_field}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                  <FiMail className={styles.i} />
                </div>
                <div className={styles.input_field}>
                  <input
                    type={"password"}
                    placeholder="Create your Password"
                    name="createPassword"
                    value={data.createPassword}
                    onChange={handleChange}
                    required
                  />
                  <FiLock className={styles.i} />
                </div>
                <div className={styles.input_field}>
                  <input
                    type={eye ? "text" : "password"}
                    name="password"
                    placeholder="Confirm your Password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  <FiLock className={styles.i} />
                  {eye ? (
                    <FiEye className={styles.i1} onClick={() => isEye(!eye)} />
                  ) : (
                    <FiEyeOff
                      className={styles.i1}
                      onClick={() => isEye(!eye)}
                    />
                  )}
                </div>
                {err && (
                  <p className={styles.err_con}>
                    <label className={styles.msg1}>{err}</label>
                  </p>
                )}
                {msg && (
                  <p className={styles.msg_con}>
                    <label className={styles.msg2}>{msg}</label>
                  </p>
                )}
              </>
            )}
            <button type="submit" className={styles.login_btn}>
              {auth === "login" ? "Login" : "Register"}
            </button>
            <p>
              {auth === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span onClick={() => swap()}>Signup</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => swap()}>Login</span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Form;
