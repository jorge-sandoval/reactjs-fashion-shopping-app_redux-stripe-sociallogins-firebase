import React from 'react';
import './directory.styles.scss'
import MenuItem from './../menu-item/menu-item.component'
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({ sections } )=>{
    console.log(sections);
    return (
        <div className="directory-menu">
            { 
                sections.map( 
                    ({ id, ...otherProps }) => 
                    (
                        <MenuItem key={id} 
                            {...otherProps}>                    
                        </MenuItem>
                    )
                )
            }
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        sections: selectDirectorySections(state)
    }
}

export default connect(mapStateToProps)(Directory);