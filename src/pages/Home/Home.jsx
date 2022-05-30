import Movie from "components/Movie/Movie";
import React, { Component } from "react";
import "./home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesCached: [],
      loaded: false,
      totalPages: 0,
      currentSlice: 0,
      onScrollCoolDown: false,
    };
    this.featuredApi =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a6468ac36560c45e927925b8f646b478";
  }

  fetchMovies = (API) => {
    this.setState({ loaded: false });
    fetch(API)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          movies: [...data.results].slice(0, 10),
          totalPages: data.total_pages,
          moviesCached: [...data.results].slice(10, 20),
          loaded: true,
        });
      });
  };

  handleFeatured() {
    this.fetchMovies(this.featuredApi + "&page=1");
  }

  nextPage = (pageNumber) => {
    if (this.props.searchTerm.length > 0) {
      this.fetchMovies(
        this.props.searchApi + this.props.searchTerm + "&page=" + pageNumber
      );
    } else {
      this.fetchMovies(this.featuredApi + "&page=" + pageNumber);
    }
    this.props.setCurrentPage(pageNumber);
  };

  printPage = () => {
    setTimeout(() => {
      console.log(
        "Page: %d-%d of %d",
        this.props.currentPage,
        this.state.currentSlice + 1,
        this.state.totalPages
      );
    }, 250);
  };

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <=
        document.scrollingElement.scrollHeight ||
      this.state.loaded === false ||
      this.state.onScrollCoolDown === true
    )
      return;
    this.setState({ onScrollCoolDown: true });
    setTimeout(() => {
      this.setState({ onScrollCoolDown: false });
    }, 500);

    setTimeout(() => {
      if (this.state.currentSlice === 0) {
        window.scrollTo(0, 2400);
        this.setState({
          movies: [...this.state.movies, ...this.state.moviesCached],
          currentSlice: 1,
        });
        // console.log("IF slice == 0");
      } else if (this.state.totalPages > this.props.currentPage) {
        window.scrollTo(0, 0);
        this.nextPage(this.props.currentPage + 1);
        this.setState({
          currentSlice: 0,
        });
        window.scrollTo(0, 0);
        // console.log("Else if slice == 1");
      }
    }, 50);
    this.printPage();
  };

  componentDidMount() {
    this.handleFeatured();
    window.addEventListener("scroll", this.handleScroll);
    this.props.setHandleFeatured(this.handleFeatured);
    this.props.setFetchMovies(this.fetchMovies);

    this.printPage();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          {this.state.loaded ? (
            this.state.movies.map((movie, i) => <Movie key={i} {...movie} />)
          ) : (
            <div className="loadingBlock">Loading...</div>
          )}
          {/* <button>Click to console log</button> */}
        </div>
        <p className="tip">Tip: Scroll down to load more movies.</p>
      </div>
    );
  }
}

export default Home;
