import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../../store/actions/search';
import TrackItem from './track-item';
import { Message } from '../ui/message/';
import { Spinner } from '../ui/spinner/';
import pic from '../../assets/images/deezer.svg';

const Tracks = () => {
    const state = useSelector(item => item);
    const dispatch = useDispatch();
    const spinner = state.tracks.loading ? <Spinner /> : null;
    const error = state.tracks.error ? <Message text="Something went wrong please try again" /> : null;
    const empty = !state.tracks.tracks.length ? <Message text="No Data" /> : null;
    const hasData = !(spinner || error || empty);
    const list = hasData ? <TrackList state={state} /> : null;
    const length = state.tracks.tracks.length;

    const clickPagination = value => {
        dispatch(search(state.tracks.query, value));
    };

    const pag = (
        <Pagination
            defaultCurrent={state.tracks.offset}
            total={state.tracks.total}
            defaultPageSize={10}
            onChange={clickPagination}
        />
    );

    const isPag = hasData && length >= 10 ? pag : '';

    return (
        <div className="tracks">
            <div className="container">
                <div className="tracks-total">
                    {hasData && length >= 10 ? `${state.tracks.total} tracks` : `${length} tracks`}
                </div>
                <div className="tracks-header">
                    <div className="tracks-header__track">track</div>
                    <div className="tracks-header__artist">artist</div>
                    <div className="tracks-header__album">album</div>
                    <div className="tracks-header__duration">dur.</div>
                    <div className="tracks-header__link">
                        <img src={pic} alt="description" />
                    </div>
                </div>
                <div className="tracks-list">
                    {spinner}
                    {error}
                    {empty}
                    {list}
                </div>
                <div className="tracks-pagination">{isPag}</div>
            </div>
        </div>
    );
};

const TrackList = ({ state }) => {
    return state.tracks.tracks.map(item => {
        return <TrackItem data={item} key={item.id} state={state} />;
    });
};

export default Tracks;
