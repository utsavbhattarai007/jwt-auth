import React, { useContext, useState } from "react";
import styles from "../css/Home.module.css";
import { ContextProvider } from "../config/Context";
import { Navigate } from "react-router-dom";
import Profile from "../components/Profile";
import Edit from "../components/Edit";
import Change from "../components/Change";
const Home = () => {
  const { usr } = useContext(ContextProvider);
  const [user, setUser] = usr;
  const token = localStorage.getItem("access");
  const [swap,setSwap] = useState({
    profile:true,
    edit:false,
    change:false
  })

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className={styles.home_con}>
        {swap.profile && <Profile user={user} state={[swap, setSwap]} />}
        {swap.edit && <Edit user={user} state={[swap, setSwap]} />}
        {swap.change && <Change state={[swap, setSwap]} />}
      </div>
    </>
  );
};

export default Home;
