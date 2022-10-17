import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <header>
      <nav>
        <Link to={"/news"}>News</Link>
        <Link to={"/show"}>Shows</Link>
        <Link to={"/jobs"}>Jobs</Link>
      </nav>
    </header>
  );
};

export default Menu;
