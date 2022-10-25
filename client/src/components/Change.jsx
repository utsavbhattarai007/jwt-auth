import React, { useState } from "react";
import Card from "../components/Card";
import Input from "./Input";
import styles from "../css/Edit.module.css";
import axios from "../config/axios";
import toast from "react-hot-toast";

const Change = ({ state, user }) => {
  const [swap, setSwap] = state;
  const { profile, change, loading } = swap;
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = async () => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        return toast.error("Password not matched");
      }
      setSwap({ ...swap, loading: !loading });
      const res = await axios.patch(
        "/user/password",
        {
          _id:user._id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        toast.success(res.data.msg);
        setSwap({ ...swap, loading: false, profile: !profile, change: !change });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setSwap({ ...swap, loading: false });
        return toast.error(error.response.data.msg);
      }
      toast("Something went wrong");
    }
  };
  return (
    <>
      <Card title={"Change Password"}>
        <Input
          type={"text"}
          name="oldPassword"
          placeholder={"Enter Old Password"}
          value={data.oldPassword}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          name="newPassword"
          placeholder={"Enter New Password"}
          value={data.newPassword}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          name="confirmPassword"
          placeholder={"Confirm New Password"}
          value={data.confirmPassword}
          onChange={handleChange}
        />
        <div className={styles.btn_con}>
          <button className={styles.save_btn} onClick={() => updatePassword()}>
            Update
          </button>
          <button
            className={styles.back_btn}
            onClick={() =>
              setSwap({ ...swap, profile: !profile, change: !change })
            }
          >
            Back
          </button>
        </div>
      </Card>
    </>
  );
};

export default Change;
