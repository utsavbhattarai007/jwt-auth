import React, { createContext, useEffect, useState } from "react";
import axios from "../config/axios.js";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(null);


  //getting access token through refresh token
  const getAccessToken = async () => {
    try {
      if (localStorage.getItem("refresh")) {
        const res = await axios.post("/refresh", {
          refreshToken: localStorage.getItem("refresh"),
        });
        if (res) {
          localStorage.setItem("access", res.data.accessToken);
          return res.data.accessToken;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  //fetching data from access token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("/user", {
        headers: {
          "x-access-token": token,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await axios.get("/user", {
          headers: {
            "x-access-token": accessTok,
          },
        });
        setUser(res.data.user);
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access") !== null) {
      fetchUser();
    }
  }, [user]);

  return (
    <>
      <ContextProvider.Provider value={{
        usr:[user,setUser],
      }}>{children}</ContextProvider.Provider>
    </>
  );
};

export default Context;
