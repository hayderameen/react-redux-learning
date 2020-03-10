import {
  SHOW_LOADING_SPINNER,
  CLEAR_MOVIES,
  SEARCH_MOVIES,
  GET_POPULAR_MOVIES,
  LOAD_MORE_MOVIES,
  SET_POPULAR_PERSISTED_STATE
} from "../actions";

const defaultState = {
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: ""
};

export default function(state = defaultState, action) {
  console.log("Inside default reducer function and state is: ", state);
  switch (action.type) {
    case SET_POPULAR_PERSISTED_STATE:
      return {
        ...state,
        ...action.payload
      };
    case GET_POPULAR_MOVIES:
      console.log(
        "Inside reducer of getting popular movies! and state is: ",
        state
      );
      return {
        ...state,
        movies: action.payload.results,
        heroImage: state.heroImage || action.payload.results[0],
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        searchTerm: ""
      };
    case LOAD_MORE_MOVIES:
      console.log("Inside reducer of load more movies! and state is: ", state);
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload.results,
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        searchTerm: action.payload.searchTerm
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      };
    case SHOW_LOADING_SPINNER:
      console.log("Inside Load spinner reducer");
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
