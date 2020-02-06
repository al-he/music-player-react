import { START, PLAY } from '../types';

export const start = data => {
    return {
        type: START,
        data,
    };
};

export const play = () => {
    return {
        type: PLAY,
    };
};
