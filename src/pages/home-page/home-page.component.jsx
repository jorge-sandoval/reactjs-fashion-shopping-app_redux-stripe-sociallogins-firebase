import React from 'react';
import './home-page.styles.scss';
import Directory from  '../../components/directory/directory.component'


const HomePage = () => {    
    return (
        <div className="homepage">
            <Directory></Directory>
        </div>
    )
}

export default HomePage;