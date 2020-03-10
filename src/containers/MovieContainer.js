import React, { Component } from "react";
import {
  getMovie,
  clearMovie,
  showLoadingSpinner,
  setMoviePersistedState
} from "../actions";
import { StaticRouter } from "react-router-dom";
import { connect } from "react-redux";
import Movie from "../components/Movie/Movie";

class MovieContainer extends Component {
  componentDidMount() {
    const { movieId } = this.props.match.params;

    if (sessionStorage.getItem(`${movieId}`)) {
      this.props.setMoviePersistedState(
        JSON.parse(sessionStorage.getItem(`${movieId}`))
      );
    } else this.getMovie(movieId);
  }

  componentDidUpdate() {
    const { movieId } = this.props.match.params;
    if (!sessionStorage.getItem(`${movieId}`)) {
      sessionStorage.setItem(`${movieId}`, JSON.stringify(this.props));
    }
  }

  getMovie = movieId => {
    this.props.clearMovie();
    this.props.showLoadingSpinner();
    this.props.getMovie(movieId);
  };

  render() {
    const { movie, directors, actors, loading } = this.props;
    return (
      <Movie
        movie={movie}
        directors={directors}
        actors={actors}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => {
  return state.movie;
};

const mapDispatchToProps = {
  getMovie,
  clearMovie,
  showLoadingSpinner,
  setMoviePersistedState
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
