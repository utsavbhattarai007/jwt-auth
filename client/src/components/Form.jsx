import React, { useState } from "react";
import styles from "../css/Form.module.css";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiUpload,
} from "react-icons/fi";
const Form = () => {
  const [eye, isEye] = useState(false);
  const [auth, isAuth] = useState("login");
  const [pic, setPic] = useState("");
  const [data,setData] = useState({
    username:"",
    email:"",
    password:"",
  })
  const swap = () => {
    setData({
      username: "",
      email: "",
      password: "",
      createPassword:"",
    });
    isAuth(auth === "login" ? "register" : "login");
  };
  const picUpload = (e) => {
    const [file] = e.target.files;
    setPic(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    //handling all changes in one state
    setData({
      ...data,
      [e.target.name]:e.target.value.trim() //Removing white spaces
    })
  }
  
  console.log(data);
  console.log(pic);
  
  const onSubmit = (e) => {
    e.preventDefault();
    //Sending data to database
  }
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
