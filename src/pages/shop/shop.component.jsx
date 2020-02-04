import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { connect } from 'react-redux';
import { selectShopCollections } from '../../redux/shop/shop.selectors';

const ShopPage = ({collections}) => {
    return ( 
        <div>
            {
                collections.map(
                    ({ id, title, items }) => (
                        <CollectionPreview key={id} title={title} items={items}/>
                    )
                )
            }
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        collections: selectShopCollections(state)
    }
}

export default connect(
    mapStatetoProps,
    null
)(ShopPage);