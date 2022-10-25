import React from "react";
import styles from "../css/Secret.module.css";
import {MdDelete} from "react-icons/md"
import axios from "../config/axios";
import toast from "react-hot-toast";
const Secret = ({data}) => {
  const column = ["SN no.", "User Name", "Email", "Verified", "Role","Action"];
  const Table = ({ data, column }) => {
    return (
      <>
        <table>
          <thead>
            <tr>
              {column.map((col, index) => (
                <TableHead item={col} key={index} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <TableRow item={item} i={index + 1} key={index} />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  const TableHead = ({ item }) => <th>{item}</th>;
  const TableRow = ({ item, i }) => (
    <>
      <td>{i + "."}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <span className={item.verified ? styles.yes : styles.no}>
          {item.verified.toString()}
        </span>
      </td>
      <td>
        <span className={item.roles.includes("user") ? styles.user : styles.admin}>
          {item.roles}
        </span>
      </td>
      <td>
       <span className={styles.dlt} onClick={() =>dltUser(item._id)}><MdDelete/></span>
      </td>
    </>
  );

  const dltUser = async(id) => {
    try {
        const res = await axios.delete(`/user/${id}`)
        if(res){
            toast.success(res.data.msg);
            window.location.reload();
        }
    } catch (error) {
        toast.error(error.response.data.msg);
    }
  }

  return (
    <>
      <div className={styles.special_con}>
        <Table column={column} data={data} />
      </div>
    </>
  );
};

export default Secret;
