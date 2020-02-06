import axios from 'axios';

export const FIREBASE = axios.create({
    baseURL: 'https://music-player-4c61a.firebaseio.com/',
});

export const DEEZER = axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
    headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': 'YOUR_OWN_KEY',
    },
});
