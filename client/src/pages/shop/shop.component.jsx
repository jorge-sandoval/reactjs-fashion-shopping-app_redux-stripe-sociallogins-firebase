import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../../pages/collection/colleccion.container';
import { connect } from 'react-redux';
import { fetchCollectionsStart }  from '../../redux/shop/shop.actions';

const ShopPage = ({ fetchCollection, match }) => {
  useEffect( () => {
    fetchCollection()
  },[fetchCollection]);
  
  return (
    <div className='shop-page'>
    <Route exact path={`${match.path}`}
      component= {CollectionsOverviewContainer}
    /> 
    <Route path={`${match.path}/:collectionId`}
      component= {CollectionContainer}
    />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollection: () => dispatch( fetchCollectionsStart() )
  }
}

export default connect( 
  null,
  mapDispatchToProps
)(ShopPage);