import React, { Component } from "react";
import { getMovie, clearMovie, showLoadingSpinner } from "../actions";
import { StaticRouter } from "react-router-dom";
import { connect } from "react-redux";
import Movie from "../components/Movie/Movie";

class MovieContainer extends Component {
  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.getMovie(movieId);
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
  showLoadingSpinner
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
