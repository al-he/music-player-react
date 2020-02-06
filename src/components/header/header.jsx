import React, { useState, useRef, useEffect } from 'react';
import { Icon, message } from 'antd';
import { search, fetchFirstTracks } from '../../store/actions/search';
import { useDispatch } from 'react-redux';

const Header = () => {
    const [query, setQuery] = useState('');
    const inputEl = useRef(null);
    const dispatch = useDispatch();

    const changeInput = e => {
        setQuery(e.target.value);
    };

    const submitForm = e => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(search(query.trim()));
            localStorage.setItem('query', query.trim());
        } else {
            inputEl.current.focus();
            message.warning('Fill in the field');
        }
    };

    useEffect(() => {
        const q = localStorage.getItem('query');
        if (q) {
            setQuery(q);
            dispatch(search(q));
        } else {
            dispatch(fetchFirstTracks());
        }
    }, [dispatch]);

    return (
        <header className="header">
            <div className="container">
                <div className="header-entry">
                    <form action="#" onSubmit={submitForm}>
                        <input type="text" placeholder="Search" ref={inputEl} onChange={changeInput} value={query} />
                        <button type="submit">
                            <Icon type="search" style={{ fontSize: '20px' }} />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;
