import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Navbar.module.css";
import axios from "../config/axios.js";
const Navbar = () => {
  const logout = async () => {
    try {
      const res = await axios.post(
        "/logout",
        {
          refreshToken: localStorage.getItem("refresh"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        console.log(res.data.msg);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.nav_con}>
        <div className={styles.left}>
          <Link to="/">
            <p>
              Jwt-<span>Auth</span>
            </p>
          </Link>
        </div>
        <div className={styles.right}>
          <button onClick={() => logout()}>LogOut</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
