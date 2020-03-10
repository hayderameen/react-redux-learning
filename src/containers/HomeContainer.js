import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPopularMovies,
  searchMovies,
  loadMoreMovies,
  clearMovies,
  showLoadingSpinner,
  setPopularPersistedState
} from "../actions";
import Home from "../components/Home/Home";
import { render } from "react-dom";

class HomeContainer extends Component {
  componentDidMount() {
    if (sessionStorage.getItem("HomeState")) {
      const home = JSON.parse(sessionStorage.getItem("HomeState"));
      this.props.setPopularPersistedState(home);
    } else {
      this.getMovies();
      console.log("ComponentDidMount done!");
    }
  }

  componentDidUpdate() {
    if (this.props.movies.length > 0 && this.props.searchTerm === "") {
      sessionStorage.setItem("HomeState", JSON.stringify(this.props));
    }
  }

  getMovies = () => {
    this.props.showLoadingSpinner();
    this.props.getPopularMovies();
  };

  searchMovies = searchTerm => {
    this.props.clearMovies();
    this.props.showLoadingSpinner();
    this.props.searchMovies(searchTerm);
  };

  loadMoreMovies = () => {
    console.log("Start of LoadMoreMovies");
    const { searchTerm, currentPage } = this.props;

    this.props.showLoadingSpinner();
    console.log("After spinner is done and on to load movies action");
    this.props.loadMoreMovies(searchTerm, currentPage);
  };

  render() {
    console.log("Inside render method of Home", this.props);
    return (
      <Home
        {...this.props}
        searchMovies={this.searchMovies}
        loadMoreMovies={this.loadMoreMovies}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log("Inside mapStateToProps and this is the state --> ", state);
  return state.home;
};

const mapDispatchToProps = {
  getPopularMovies,
  searchMovies,
  loadMoreMovies,
  clearMovies,
  showLoadingSpinner,
  setPopularPersistedState
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
