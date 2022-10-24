import React from 'react'
import styles from "../css/Edit.module.css";

const Input = ({type,name,value,placeholder,onChange}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.user_input}
        onChange={onChange}
      />
    </>
  );
}

export default Input