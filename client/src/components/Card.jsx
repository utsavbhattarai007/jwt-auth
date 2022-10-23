import React from "react";
import styles from "../css/Home.module.css";

const Card = ({title,children}) => {
  return (
    <>
      <div className={styles.card_con}>
        <div className={styles.header}>
          <p>{title}</p>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
