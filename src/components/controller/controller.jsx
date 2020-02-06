import React, { useEffect, useRef } from 'react';
import { Icon, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Equalizer from '../equalizer';

import { play, start } from '../../store/actions/play';
import ReactAudioPlayer from 'react-h5-audio-player';

const Controller = () => {
    const audioEl = useRef(null);
    const dispatch = useDispatch();
    const { play: _p, tracks } = useSelector(item => item);

    const icon = _p.data && _p.play ? 'pause' : 'caret-right';
    const title = _p.data ? _p.data.title : '';
    const artist = _p.data ? _p.data.artist.name : '';
    const clazz = !_p.play ? 'player-nav__icons' : 'player-nav__icons playing';

    const one = 'Playlist is empty';
    const two = 'There is no further track';

    useEffect(() => {
        if (!_p.play) {
            audioEl.current.audio.pause();
        } else {
            audioEl.current.audio.play();
        }
    }, [_p]);

    const iconHandler = () => {
        if (_p.data) {
            dispatch(play());
        } else {
            message.warning(one);
        }
    };

    const prev = () => {
        const position = _p.data ? tracks.tracks.findIndex(item => item.id === _p.data.id) : null;
        if (position !== null && position > 0) {
            dispatch(start(tracks.tracks[position - 1]));
        } else if (position === null) {
            message.warning(one);
        } else {
            message.warning(two);
        }
    };

    const next = () => {
        const position = _p.data ? tracks.tracks.findIndex(item => item.id === _p.data.id) : null;
        if (position !== null && position + 1 < tracks.tracks.length) {
            dispatch(start(tracks.tracks[position + 1]));
        } else if (position === null) {
            message.warning(one);
        } else {
            message.warning(two);
        }
    };

    const finishedTrack = () => {
        const position = _p.data ? tracks.tracks.findIndex(item => item.id === _p.data.id) : null;
        if (position !== null && position + 1 < tracks.tracks.length) {
            dispatch(start(tracks.tracks[position + 1]));
        } else {
            dispatch(play());
        }
    };

    return (
        <div className="player">
            <div className="player-nav">
                <div className={clazz}>
                    <Icon type="step-backward" onClick={prev} />
                    <Icon type={icon} onClick={iconHandler} />
                    <Icon type="step-forward" onClick={next} />
                </div>
                <div className="player-nav__equalizer">
                    <Equalizer show={_p.play} />
                </div>
            </div>
            <div className="player-controller">
                <div className="player-controller-block">
                    <ReactAudioPlayer
                        ref={audioEl}
                        autoPlay
                        showLoopControl={false}
                        showJumpControls={false}
                        onEnded={finishedTrack}
                        src={_p.data ? _p.data.preview : ''}
                    />
                </div>
            </div>
            <div className="player-info">
                {title}-{artist}
            </div>
        </div>
    );
};

export default Controller;
