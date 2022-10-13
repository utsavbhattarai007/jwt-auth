import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import styles from "../css/Other.module.css";
import Other from "../components/Other";
import NotFound from "../pages/NotFound.jsx";
import axios from "../config/axios.js";

const EmailVerify = () => {
  const params = useParams();
  const [verified, setVerified] = useState(false);

  const verifyUrl = async () => {
    try {
      const res = await axios.get(`/user/${params.id}/verify/${params.token}`);
      console.log(res);
      if(res.status === 200){
        setVerified(true);
      }

    } catch (error) {
      console.log(error);
      setVerified(false);
    }
  };
  useEffect(() => {
    verifyUrl();
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, [params]);

  const data = {
    text: "Your email has been verified",
    icon: <FiCheckCircle className={styles.icon1} />,
  };
  return <>{verified ? <Other data={data} /> : <NotFound />}</>;
};

export default EmailVerify;
