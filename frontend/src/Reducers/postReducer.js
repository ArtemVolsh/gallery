const SET_EXCS = "SET_EXCS";
const SET_EXHS = "SET_EXHS";
const SET_NEWS = "SET_NEWS";
const SET_LOADING = "SET_LOADING";

const CLEAR_EXCS = "CLEAR_EXCS";
const CLEAR_EXHS = "CLEAR_EXHS";
const CLEAR_NEWS = "CLEAR_NEWS";
const CLEAR_LOADING = "CLEAR_LOADING";

const CLEAR_ALL = "CLEAR_ALL";

const defaultState = {
  excursions: [],
  exhibitions: [],
  news: [],
  loading: false,
};

export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_EXCS:
      return {
        ...state,
        excursions: action.payload,
      };

    case SET_EXHS:
      return {
        ...state,
        exhibitions: action.payload,
      };

    case SET_NEWS:
      return {
        ...state,
        news: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CLEAR_EXCS:
      return {
        ...state,
        excursions: [],
      };

    case CLEAR_EXHS:
      return {
        ...state,
        exhibitions: [],
      };

    case CLEAR_NEWS:
      return {
        ...state,
        news: [],
      };

    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_ALL: {
      return {
        ...state,
        exhibitions: [],
        excursions: [],
        news: [],
      };
    }

    default:
      return state;
  }
}

export const setExhibitions = (arr) => ({ type: SET_EXHS, payload: arr });
export const setExcursions = (arr) => ({ type: SET_EXCS, payload: arr });
export const setNews = (arr) => ({ type: SET_NEWS, payload: arr });
export const setLoading = (bool) => ({ type: SET_LOADING, payload: bool });

export const clearLoading = () => ({ type: CLEAR_LOADING });
export const clearExhibitions = () => ({ type: CLEAR_EXHS });
export const clearExcursions = () => ({ type: CLEAR_EXCS });
export const clearNews = () => ({ type: CLEAR_NEWS });
