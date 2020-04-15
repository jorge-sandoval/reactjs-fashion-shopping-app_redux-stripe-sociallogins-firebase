import React, { useEffect,lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart }  from '../../redux/shop/shop.actions';

const CollectionsOverviewContainer = lazy( () => import('../../components/collections-overview/collections-overview.container') );
const CollectionContainer = lazy( () => import('../../pages/collection/colleccion.container') );

const ShopPage = ({ fetchCollection, match }) => {
  useEffect( () => {
    fetchCollection()
  },[fetchCollection]);
  
  return (
    <div className='shop-page'>
      <Suspense>
        <Route exact path={`${match.path}`}
          component= {CollectionsOverviewContainer}
        /> 
        <Route path={`${match.path}/:collectionId`}
          component= {CollectionContainer}
        />
      </Suspense>
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