import React from 'react';
import PropTypes from 'prop-types';

const LabeledIcon = (props) => {
    return (
        <span className="labeled-icon">
            <i className={`${props.icon}${props.colored ? ' colored' : ''}`} />
            <span className={props.labelClass}>{props.label}</span>
        </span>
    );
    // return (
    // );
};

LabeledIcon.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    colored: PropTypes.bool,
};

LabeledIcon.defaultProps = {
    icon: 'icon',
    label: 'Item',
    labelClass: 'label',
    colored: false,
};

export default LabeledIcon;
