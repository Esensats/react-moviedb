import React, { Component } from "react";
// import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NoPage from "./pages/NoPage/NoPage";
import Details from "pages/Details/Details";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // movies: [],
      // moviesCached: [],
      searchTerm: "",
      // loaded: false,
      // totalPages: 0,
      currentPage: 1,
      // currentSlice: 0,
      handleFeatured: function(){},
      fetchMovies: function(apiQuery){},
    };
    this.searchApi =
      "https://api.themoviedb.org/3/search/movie?api_key=a6468ac36560c45e927925b8f646b478&query=";
    // this.handleFeatured =
    //   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a6468ac36560c45e927925b8f646b478";
    // this.rootElement = document.getElementById("root");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchTerm.length > 0) {
      this.state.fetchMovies(this.searchApi + this.state.searchTerm);
      this.setState({ currentPage: 1 });
      // this.setState({ searchTerm: "" });
    }
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  setHandleFeatured = (hFeat) => {
    this.setState({ handleFeatured: hFeat });
  };

  setFetchMovies = (fMovs) => {
    this.setState({ fetchMovies: fMovs });
  }

  // handleFeatured() {
  //   this.fetchMovies(this.featuredApi + "&page=1");
  // }

  // nextPage = (pageNumber) => {
  //   if (this.state.searchTerm.length > 0) {
  //     this.fetchMovies(
  //       this.searchApi + this.state.searchTerm + "&page=" + pageNumber
  //     );
  //     this.setState({ currentPage: pageNumber });
  //   } else {
  //     this.fetchMovies(this.featuredApi + "&page=" + pageNumber);
  //     this.setState({ currentPage: pageNumber });
  //   }
  // };

  // handleScroll = (e) => {
  //   if (
  //     window.innerHeight + Math.round(document.documentElement.scrollTop) !==
  //     document.scrollingElement.scrollHeight
  //   )
  //     return;
  //   if (this.state.currentSlice === 0) {
  //     this.setState({
  //       movies: [...this.state.movies, ...this.state.moviesCached],
  //       currentSlice: 1,
  //     });
  //     console.log("IF slice == 0");

  //   } else if (this.state.totalPages > this.state.currentPage) {
  //     window.scrollTo(0, 0);
  //     this.nextPage(this.state.currentPage + 1);
  //     this.setState({
  //       currentSlice: 0,
  //     });
  //     window.scrollTo(0, 0);
  //     console.log("Else if slice == 1");
  //   }
  //   setTimeout(() => {
  //     console.log(this.state.currentPage, " ", this.state.currentSlice);
  //   }, 500);
  // };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleFeatured={this.state.handleFeatured}
                loaded={this.state.loaded}
                searchTerm={this.state.searchTerm}
              />
            }
          >
            <Route
              index
              element={
                <Home
                  movies={this.state.movies}
                  searchApi={this.searchApi}
                  searchTerm={this.state.searchTerm}
                  currentPage={this.state.currentPage}
                  setCurrentPage={this.setCurrentPage}
                  setHandleFeatured={this.setHandleFeatured}
                  setFetchMovies={this.setFetchMovies.bind(this)}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
            <Route path=":movid" element={<Details />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
