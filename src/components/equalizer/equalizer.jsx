import React from 'react';

const Equalizer = ({ show }) => (
    <div className="equalizer">
        <ul className={show ? '' : 'd-none'}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
);

export default Equalizer;
