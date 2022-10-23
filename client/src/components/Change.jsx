import React from "react";
import Card from "../components/Card";

const Change = ({ state }) => {
  const [swap, setSwap] = state;
  const { profile, edit, change } = swap;
  return (
    <>
      <Card title={"Change Password"}></Card>
    </>
  );
};

export default Change;
