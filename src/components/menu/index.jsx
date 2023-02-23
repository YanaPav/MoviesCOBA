import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Menu = ({ tabList }) => {
  return (
    <div className="tabs">
      {tabList.map(({ tabName, id }) => (
        <NavLink className="tab" key={"link_" + id} to={"/" + tabName}>
          {tabName}
        </NavLink>
      ))}
    </div>
  );
};

export default Menu;
