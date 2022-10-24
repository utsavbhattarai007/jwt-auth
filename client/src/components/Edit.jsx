import React, { useState } from "react";
import Card from "../components/Card";
import styles from "../css/Edit.module.css";
import Input from "./Input";
import { FiUpload } from "react-icons/fi";
import axios from "../config/axios";

const Edit = ({ user, state }) => {
  const [swap, setSwap] = state;
  const { profile, edit, loading } = swap;
  const [pic, setPic] = useState(user.profilePic);
  const [data, setData] = useState({
    profilePic: user.profilePic,
    username: user.username,
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const saveUpdate = async () => {
    try {
      setSwap({ ...swap, loading: !loading });
      const res = await axios.patch(
        "/user",
        {
          _id:user._id,
          username: data.username,
          profilePic: data.profilePic,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      setSwap({ ...swap, loading: false, profile: !profile, edit: !edit });
    } catch (error) {
      console.log(error);
    }
  };

  const picUpload = (e) => {
    const [file] = e.target.files;
    setPic(URL.createObjectURL(file));
    getImgUrl(file);
  };

  //Upload image and get img url
  const getImgUrl = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    const res = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { msg, imgUrl } = res.data;
    setData({ ...data, profilePic: imgUrl });
  };
  return (
    <Card title={"Edit profile"}>
      <div className={styles.img_upload_wrapper}>
        <img src={pic} />
        <div className={styles.overlay}>
          <input type="file" name="img" onChange={picUpload} />
          <FiUpload />
        </div>
      </div>
      <Input
        type={"text"}
        value={data.username}
        name="username"
        onChange={handleChange}
      />
      <div className={styles.btn_con}>
        <button className={styles.save_btn} onClick={() => saveUpdate()}>
          Save
        </button>
        <button
          className={styles.back_btn}
          onClick={() => setSwap({ ...swap, profile: !profile, edit: !edit })}
        >
          Back
        </button>
      </div>
    </Card>
  );
};

export default Edit;
