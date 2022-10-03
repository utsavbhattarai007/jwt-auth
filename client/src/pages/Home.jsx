import React from "react";
import styles from "../css/Home.module.css";
const Home = () => {
  return (
    <>
      <div className={styles.home_con}>
        <div className={styles.card_con}>
          <div className={styles.header}>
            <p>Profile</p>
          </div>
          <div className={styles.content}>
            <div className={styles.img_wrapper}>
              <img src="/pic.png" />
            </div>
            <div className={styles.des}>
              <p>Utsav Bhattarai</p>
              <p>utsavbhattarai007@gmail.com</p>
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
