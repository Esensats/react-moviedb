import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <div className="f-left">Copyright&nbsp;&copy;&nbsp;<a href="https://github.com/Esensats/react-moviedb">Esensats&nbsp;2022</a></div>
        <div className="f-center"><a href="mailto:esensats@gmail.com">esensats@gmail.com</a></div>
        <div className="f-right">Built&nbsp;with&nbsp;ReactJS&nbsp;&&nbsp;<a href="https://themoviedb.org/">TheMovieDB</a></div>
      </div>
    </div>
  );
}

export default Footer;
