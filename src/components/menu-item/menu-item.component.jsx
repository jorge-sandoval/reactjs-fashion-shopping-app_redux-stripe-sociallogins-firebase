import React from 'react';
import { withRouter } from 'react-router-dom'
import './menu-item.styles.scss';

const MenuItem = ( {title, imageUrl, linkUrl, history, match } )=> {
    const background = { backgroundImage: 'url(' + imageUrl+')' };
    return(
        <div className="menu-item" onClick={()=> {history.push(match.url + linkUrl)}}>
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

export default withRouter(MenuItem);