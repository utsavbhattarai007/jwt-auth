import React from "react";
import Card from "../components/Card";

const Edit = ({ user, state }) => {
  const [swap, setSwap] = state;
  const { profile, edit, change } = swap;
  return <Card title={"Edit profile"}></Card>;
};

export default Edit;
