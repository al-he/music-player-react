import { combineReducers } from 'redux';
import tracksReducer from './search/';
import playReducer from './play/';

export default combineReducers({
    tracks: tracksReducer,
    play: playReducer,
});
