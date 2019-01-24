import React from 'react';

const DetailListItem = ({ title, description, children }) => (
    <dl className="dl-horizontal">
        <dt>{title || ''}</dt>
        <dd>{description || '--'}</dd>
        {children || null}
    </dl>
);

export default DetailListItem;
