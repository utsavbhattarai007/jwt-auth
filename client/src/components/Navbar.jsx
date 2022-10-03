import React from 'react'
import styles from "../css/Navbar.module.css"
const Navbar = () => {
  return (
    <>
      <div className={styles.nav_con}>
        <div className={styles.left}>
          <p>
            Jwt-<span>Auth</span>
          </p>
        </div>
        <div className={styles.right}>
          <button>LogOut</button>
        </div>
      </div>
    </>
  );
}

export default Navbar