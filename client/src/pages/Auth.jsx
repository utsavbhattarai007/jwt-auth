import React from "react";
import { Navigate } from "react-router-dom";
import Form from "../components/Form";
import styles from "../css/Auth.module.css";

const Auth = () => {
  const token = localStorage.getItem("access");
  if (token) {
    return <Navigate replace to="/app" />;
  }
  return (
    <>
      <div className={styles.container}>
        <Form />
      </div>
    </>
  );
};
export default Auth;
