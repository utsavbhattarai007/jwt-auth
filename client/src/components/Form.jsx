import React, { useState } from "react";
import styles from "../css/Form.module.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
const Form = () => {
  const [eye, isEye] = useState(false);
  return (
    <>
      <div className={styles.form_container}>
        <div className={styles.form_wrapper}>
          <div className={styles.header}>
            <p>Login</p>
          </div>
          <form>
            <div className={styles.input_field}>
              <input type="email" placeholder="Enter your email" required />
              <FiMail className={styles.i} />
            </div>
            <div className={styles.input_field}>
              <input
                type={eye ? "text" : "password"}
                placeholder="Enter your Password"
                required
              />
              <FiLock className={styles.i} />
              {eye ? (
                <FiEye className={styles.i1} onClick={() => isEye(!eye)} />
              ) : (
                <FiEyeOff className={styles.i1} onClick={() => isEye(!eye)} />
              )}
            </div>
            <span>Forget Password?</span>
            <button className={styles.login_btn}>Login</button>
            <p>Don't have an account? <span>Signup now</span></p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Form;
