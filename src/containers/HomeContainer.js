import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPopularMovies,
  searchMovies,
  loadMoreMovies,
  clearMovies,
  showLoadingSpinner
} from "../actions";
import Home from "../components/Home/Home";
import { render } from "react-dom";

class HomeContainer extends Component {
  componentDidMount() {
    this.getMovies();
    console.log("ComponentDidMount done!");
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
  showLoadingSpinner
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
