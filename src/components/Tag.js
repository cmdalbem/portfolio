import React from 'react'

const Tag = (props) => {
    const { icon, fill, size } = props;
    let classes = 'br3 dark-gray dib flex flex-row items-center justify-center ';
    if (fill) {
        classes += 'bg-near-white ';
    } else {
        classes += 'ba b--light-gray ';
    }
    // let classes = "br2 ba b--light-gray dark-gray f7 mr2 mt2 pa1";

    if (size && size === 'big') {
        classes += 'f5 mr2 mb2 pv1 ph2';
    } else {
        classes += 'f7 mr1 mb2 pv1 ph2';
    }

    return (
        <div className={classes}>
            {
                icon && <div className="mr1 h1 w1">{icon}</div>
            }
            {props.children}
        </div>
    );
}

export default Tag
