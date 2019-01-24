import React from 'react';

const DetailList = ({ title, children }) => (
    <div className="detailblock clear">
        <h5>{title}</h5>
        {children}
    </div>
);

export default DetailList;
