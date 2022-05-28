import React from "react";
import "./vote.scss";

export default function Vote(props) {
  let ratingColor = "#000000";
  let ratingBgColor = "#EEEEEE";

  if (props.vote > 7) {
    ratingBgColor = "#3BB05C";
  } else if (props.vote > 5) {
    ratingBgColor = "#B0AA3B";
  } else {
    ratingColor = "#EEEEEE";
    ratingBgColor = "#B03B41";
  }
  return (
    <span className="Vote"
      style={{
        backgroundColor: ratingBgColor,
        color: ratingColor,
      }}
    >
      {props.vote}
    </span>
  );
}
