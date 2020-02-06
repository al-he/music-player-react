/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from 'antd';
import { useDispatch } from 'react-redux';
import Equalizer from '../equalizer';
import { start, play } from '../../store/actions/play';
import pic from '../../assets/images/deezer.svg';

const _transformTime = seconds => {
    return `${Math.trunc(seconds / 60)}:${seconds - Math.trunc(seconds / 60) * 60}`;
};

const TrackItem = ({ data, state }) => {
    const dispatch = useDispatch();
    const isCheck = state.play.data && data.preview === state.play.data.preview && state.play.play;
    const clazz = isCheck ? 'track-item track-item_active' : 'track-item';
    const icon = isCheck ? <Icon type="pause-circle" /> : <Icon type="play-circle" />;
    const cl = isCheck ? 'eq' : 'eq d-none';

    const playTrack = () => {
        if (state.play.data && state.play.data.preview === data.preview) {
            dispatch(play());
        } else {
            dispatch(start(data));
        }
    };

    return (
        <div className={clazz}>
            <div className="track-item-main">
                <div className="track-item-main__img">
                    <img src={data.album.cover_medium} alt="img" />
                    <div className={cl}>
                        <Equalizer show={true} />
                    </div>
                </div>
                <button className="track-item-main__button" onClick={playTrack}>
                    {icon}
                </button>
                <div className="track-item-main__title">{data.title}</div>
            </div>
            <div className="track-item__artist">{data.artist.name}</div>
            <div className="track-item__album">{data.album.title}</div>
            <div className="track-item__duration">{_transformTime(data.duration)}</div>
            <div className="track-item__link">
                <a href={data.link} rel="noopener noreferrer" target="_blank">
                    <img src={pic} alt="my alt" />
                </a>
            </div>
        </div>
    );
};

export default TrackItem;
