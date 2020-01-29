import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl})=> {
    const background = { backgroundImage: 'url(' + imageUrl+')' };
    return(
        <div className="menu-item">
            <div className="background-image"
                style={background}>
            </div>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>    
            </div>
        </div>
    );
}

export default MenuItem;