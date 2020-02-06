import { SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_ERROR, SEARCH_TRACKS_LOADING, FETCH_FIRST_TRACKS } from '../types';
import { DEEZER, FIREBASE } from '../../../services';

export const search = (query, ind = 0) => async dispatch => {
    dispatch(searchTracksLoading());
    try {
        const offset = ind ? (ind - 1) * 10 : 0;
        const response = await DEEZER.get(`search?q=${query}&limit=10&index=${offset}`);
        response.data.query = query;
        response.data.offset = ind === 0 ? 1 : ind;
        dispatch(searchTracksSuccess(response.data));
    } catch (e) {
        dispatch(searchTracksError());
    }
};

export const fetchFirstTracks = () => async dispatch => {
    dispatch(searchTracksLoading());
    try {
        const response = await FIREBASE.get('list.json');
        dispatch(firstTracksSuccess(response.data));
    } catch (e) {
        dispatch(searchTracksError());
    }
};

export const searchTracksSuccess = data => {
    return {
        type: SEARCH_TRACKS_SUCCESS,
        data,
    };
};

export const firstTracksSuccess = data => {
    return {
        type: FETCH_FIRST_TRACKS,
        data,
    };
};

export const searchTracksError = () => {
    return {
        type: SEARCH_TRACKS_ERROR,
    };
};

export const searchTracksLoading = () => {
    return {
        type: SEARCH_TRACKS_LOADING,
    };
};
