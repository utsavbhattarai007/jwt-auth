import React, { useContext, useState, useEffect } from "react";
import styles from "../css/Home.module.css";
import { ContextProvider } from "../config/Context";
import { Navigate } from "react-router-dom";
import axios from "../config/axios";
import Profile from "../components/Profile";
import Edit from "../components/Edit";
import Change from "../components/Change";
import Secret from "../components/Secret";
const Home = () => {
  const { usr } = useContext(ContextProvider);
  const [user, setUser] = usr;
  const token = localStorage.getItem("access");
  const [secret, setSecret] = useState([]);
  const [swap, setSwap] = useState({
    profile: true,
    edit: false,
    change: false,
    loading: false,
    show: false,
  });

  if (!token) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    getSecretData();
  }, [token]);

  const getSecretData = async () => {
    try {
      const res = await axios.get("/users", {
        headers: {
          "x-access-token": token,
        },
      });
      if (res) {
        setSecret(res.data);
      }
    } catch (error) {}
  };
  if (swap.loading) {
    return (
      <>
        <div className={styles.home_con}>
          <div className={styles.loader}></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.home_con}>
        {swap.profile && <Profile user={user} state={[swap, setSwap]} />}
        {swap.edit && <Edit user={user} state={[swap, setSwap]} />}
        {swap.change && <Change user={user} state={[swap, setSwap]} />}
        {secret.length > 0 && <Secret data={secret} />}
      </div>
    </>
  );
};

export default Home;
