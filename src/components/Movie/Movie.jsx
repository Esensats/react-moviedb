import React from "react";
import "./Movie.scss";
import noImage from "../../assets/img/no-image.jpg";
import { Link } from "react-router-dom";
import Vote from "../Vote/Vote";

const IMG_API = "https://image.tmdb.org/t/p/w500";

const Movie = ({ title, poster_path, overview, vote_average, id }) => {
  return (
    <Link to={`/${id}`} className="Movie">
      {poster_path ? (
        <img src={IMG_API + poster_path} alt="Movie" />
      ) : (
        <img
          src={noImage}
          style={{ objectFit: "cover", flexGrow: "100" }}
          alt="No"
        />
      )}

      <div className="movieInfo">
        <h3 className="movieTitle">{title}</h3>
        <Vote vote={vote_average}></Vote>
      </div>
      <div className="overview">{overview}</div>
    </Link>
  );
};

export default Movie;
