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
    console.log("CDM Launched!");
    const { movieId } = this.props.match.params;

    if (sessionStorage.getItem(`${movieId}`)) {
      console.log("Loading this movie from storage--> ", movieId);
      this.props.setMoviePersistedState(
        JSON.parse(sessionStorage.getItem(`${movieId}`))
      );
    } else {
      this.getMovie(movieId);
    }
  }

  componentDidUpdate() {
    const { movieId } = this.props.match.params;
    if (this.props.movie) {
      console.log("Now saving movie in Session Storage");
      if (!sessionStorage.getItem(`${movieId}`)) {
        const { movie, directors, actors } = this.props;
        sessionStorage.setItem(
          `${movieId}`,
          JSON.stringify({ movie, directors, actors })
        );
      }
    } else console.log("Not saving movie now");
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
