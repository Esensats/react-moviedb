import style from "./header.module.css";
import React from "react";

function Header() {
  return (
    <div className={`${style.globalHeader} ${style.Lol}`}>
      <code>header</code>
    </div>
  );
}

export default Header;
