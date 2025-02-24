import React from 'react';
import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem }  from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItem })=> {
    const {name, price, imageUrl} = item;
    const backgroundImage = 'url('+ imageUrl + ')';
    return(
        <div className="collection-item">
            <div className="image" 
                style={ {backgroundImage: backgroundImage} }>
            </div>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton className="custom-button" inverted={true} onClick={() => addItem(item) }>Add To Cart</CustomButton>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addItem: (item) => dispatch( addItem(item) )
    }
}

export default connect(
    null, 
    mapDispatchToProps
)(CollectionItem);