import React, { useContext } from "react";
import styles from "../css/Home.module.css";
import { ContextProvider } from "../config/Context";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { usr } = useContext(ContextProvider);
  const [user, setUser] = usr;
  const token = localStorage.getItem("access");
  
  if(!token){
    return <Navigate to="/" replace/>
  }
  return (
    <>
      <div className={styles.home_con}>
        <div className={styles.card_con}>
          <div className={styles.header}>
            <p>Profile</p>
          </div>
          <div className={styles.content}>
            <div className={styles.img_wrapper}>
              <img src={user?.profilePic} />
            </div>
            <div className={styles.des}>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
            </div>
            <div className={styles.btn_con}>
              <button className={styles.btn}>Edit Profile</button>
              <button className={styles.btn}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
