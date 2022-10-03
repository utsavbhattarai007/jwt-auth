import React from 'react'
import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer_con}>
      <p>
        Made with 💖 by <a href="https://www.utsavbhattarai.info.np" target={"_blank"}>Utsav Bhattarai</a>
      </p>
    </div>
  );
}

export default Footer