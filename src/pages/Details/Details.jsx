import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Vote from "../../components/Vote/Vote";
import "./details.scss";

// API query example: "https://api.themoviedb.org/3/movie/526896?api_key=a6468ac36560c45e927925b8f646b478"

const IMG_API = "https://image.tmdb.org/t/p/w500";
const BACKDROP_API = "https://image.tmdb.org/t/p/w1280";
const API_FIRST = "https://api.themoviedb.org/3/movie/";
const API_KEY = "a6468ac36560c45e927925b8f646b478";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function renderImage(title, posterPath) {
  return <img src={IMG_API + posterPath} title={title} alt={title} />;
}

function renderTitle(title, releaseDate, voteAverage) {
  const releaseYear = new Date(releaseDate).getFullYear();

  return (
    <div className="title">
      <div>
        <Vote vote={voteAverage} />
      </div>
      <div>
        <h2>
          {title}
          &nbsp;
          <small>({releaseYear})</small>
        </h2>
      </div>
    </div>
  );
}

function Countries(props) {
  return (
    <li className="countries">
      {props.countries.map((country, i) => (
        <span key={country.iso_3166_1}>
          {country.name}
          {i < props.countries.length - 1 ? <>, </> : null}
        </span>
      ))}
    </li>
  );
}

function Genres(props) {
  return (
    <li className="genres">
      {props.genres.map((genre, i) => (
        <span key={genre.id}>
          {genre.name}
          {i < props.genres.length - 1 ? <>, </> : null}
        </span>
      ))}
    </li>
  );
}

function Runtime(props) {
  return (
    <li className="runtime">
      {Math.floor(props.runtime / 60)}h&nbsp;{props.runtime % 60}m
    </li>
  );
}

function Languages(props) {
  return (
    <li className="languages">
      {props.spoken_languages.map((language, i) => (
        <span key={language.iso_639_1}>
          {language.english_name}
          {i < props.spoken_languages.length - 1 ? <>, </> : null}
        </span>
      ))}
    </li>
  );
}

function Companies(props) {
  return (
    <ul>
      {props.companies.map((company, i) => (
        <li key={company.id}>
          <img
            src={IMG_API + company.logo_path}
            alt={company.name + " (" + company.origin_country + ")"}
            title={company.name + " (" + company.origin_country + ")"}
          />
        </li>
      ))}
    </ul>
  );
}

function Details() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [movie, setMovie] = useState([]);
  const params = useParams();

  const fetchMovie = (API) => {
    setLoaded(false);
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setError(response.status);
        throw new Error(`Something went wrong: ${error}`);
      })
      .then((data) => {
        setMovie(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    backdrop_path, //"/gG9fTyDL03fiKnOpf2tr01sncnt.jpg"
    overview, // string
    genres,
    budget, // 75000000
    revenue,
    status, // "Released / In Production"
    spoken_languages, // [0] = {english_name: "English", iso_639_1: "en", name: "English"}
    runtime, // ex: 104 = 1 hour and 44 minutes
    tagline, // ex: "A new Marvel legend arrives."
    adult, //bool
    production_countries: countries, //ex: countries[0] = {iso_3166_1: "US", name: "United States of America"}
    homepage,
    title,
    production_companies: companies, //ex: companies[0] = {id: 5, logo_path: "/71BqEFAF4V3qjjMPCpLuyJFB9A.png", name: "Columbia Pictures", origin_country: "US"}
    poster_path: posterPath,
    release_date: releaseDate,
    vote_average: voteAverage,
  } = movie;

  useEffect(() => {
    fetchMovie(`${API_FIRST}${params.movid}?api_key=${API_KEY}`);
    setTimeout(() => {
      if (loaded === true) setTimeOut(true);
    }, 15000);
  // eslint-disable-next-line
  }, []);

  return (
    <div className="Details">
      {loaded ? (
        <>
          <div
            className="hero"
            style={{
              backgroundImage: `url(${BACKDROP_API}${backdrop_path})`,
              backgroundRepeat: "repeat-y",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="container heroContainer">
              <div className="posterImg">{renderImage(title, posterPath)}</div>

              <div className="info">
                {renderTitle(title, releaseDate, voteAverage)}

                <ul className="subtitle">
                  <li className="status">{status}</li>
                  {adult && <li className="adult">Adult</li>}
                  <Countries countries={countries}></Countries>
                  <Languages spoken_languages={spoken_languages}></Languages>
                  <Genres genres={genres}></Genres>
                  <Runtime runtime={runtime}></Runtime>
                </ul>

                {tagline && <p className="tagline">{tagline}</p>}

                {overview && (
                  <>
                    <h3 className="overviewTitle">Overview</h3>
                    <p className="overview">{overview}</p>
                  </>
                )}
                {homepage && (
                  <p className="homepage">
                    <a href="{homepage}">{homepage}</a>
                  </p>
                )}
                <p className="budget">
                  Budget: {currencyFormatter.format(budget)}
                </p>
                <p className="revenue">
                  Revenue: {currencyFormatter.format(revenue)}
                </p>
              </div>
            </div>
            {companies && (
              <div className="container companies">
                <Companies companies={companies}></Companies>
              </div>
            )}
          </div>
        </>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2em",
          }}
        >
          {error ? (
            <span>
              Error: {error === 404 ? <>404 - Page not found</> : error}
            </span>
          ) : (
            <span>
              {timeOut ? (
                <>Error: Timed out. Try again later</>
              ) : (
                <>Loading...</>
              )}
            </span>
          )}
        </p>
      )}
    </div>
  );
}

/* This is the Details page {params.movid}
<ul>
  {Object.keys(movie).map((item, i) => (
    <li className="movieDetails">
      <span>
        Index: {i}; Key: {item}; Type: {typeof movie[item]}; Content: {(typeof movie[item]) !== "object" ? movie[item] : null}
      </span>
    </li>
  ))}
</ul> */

export default Details;
