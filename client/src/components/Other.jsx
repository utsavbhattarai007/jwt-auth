import React from "react";
import styles from "../css/Other.module.css";

const Other = ({ data }) => {
  const { text, icon } = data;
  return (
    <>
      <div className={styles.other_body}>
        <div className={styles.other_con}>
          {icon}
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default Other;
