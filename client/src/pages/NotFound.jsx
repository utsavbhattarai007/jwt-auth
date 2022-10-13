import React from "react";
import Other from "../components/Other";
import styles from "../css/Other.module.css";
import { FiXCircle } from "react-icons/fi";

const NotFound = () => {
  const data = {
    text: "404 Page not Found",
    icon: <FiXCircle className={styles.icon2} />,
  };
  return (
    <>
      <Other data={data}/>
    </>
  );
};

export default NotFound;
