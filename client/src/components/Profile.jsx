import React from "react";
import styles from "../css/Home.module.css";
import Card from "../components/Card";

const Profile = ({ user, state }) => {
  const [swap, setSwap] = state;
  const { profile, edit, change } = swap;
  return (
    <>
      <Card title={"Profile"}>
        <div className={styles.img_wrapper}>
          <img src={user?.profilePic} />
        </div>
        <div className={styles.des}>
          <p>{user?.username}</p>
          <p>{user?.email}</p>
        </div>
        <div className={styles.btn_con}>
          <button
            className={styles.btn}
            onClick={() =>
              setSwap({ ...swap, profile: !profile, edit: !edit })
            }
          >
            Edit Profile
          </button>
          <button
            className={styles.btn}
            onClick={() =>
              setSwap({ ...swap, profile: !profile, change: !change })
            }
          >
            Change Password
          </button>
        </div>
      </Card>
    </>
  );
};

export default Profile;
