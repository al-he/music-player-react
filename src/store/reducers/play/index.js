import { START, PLAY } from '../../actions/types';

const initialState = {
    data: null,
    play: false,
};

const handlers = {
    [START]: (state, { data }) => ({ ...state, data, play: true }),
    [PLAY]: state => ({ ...state, play: !state.play }),
    DEFAULT: state => state,
};

export default function playReducer(state = initialState, action) {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}
