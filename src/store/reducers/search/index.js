import {
    SEARCH_TRACKS_SUCCESS,
    SEARCH_TRACKS_ERROR,
    SEARCH_TRACKS_LOADING,
    FETCH_FIRST_TRACKS,
} from '../../actions/types';

const initialState = {
    tracks: [],
    loading: false,
    error: false,
    total: 0,
    offset: 1,
    query: '',
};

const handlers = {
    [SEARCH_TRACKS_SUCCESS]: (state, { data: { data, total, query, offset } }) => ({
        ...state,
        tracks: data,
        total: total,
        query: query,
        offset,
        loading: false,
    }),
    [FETCH_FIRST_TRACKS]: (state, { data }) => ({ ...state, tracks: data, loading: false }),
    [SEARCH_TRACKS_ERROR]: state => ({ ...state, loading: false, error: true }),
    [SEARCH_TRACKS_LOADING]: state => ({ ...state, loading: true, error: false }),
    DEFAULT: state => state,
};

export default function tracksReducer(state = initialState, action) {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}
