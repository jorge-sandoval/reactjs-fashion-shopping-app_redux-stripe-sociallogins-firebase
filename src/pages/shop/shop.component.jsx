import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../../pages/collection/colleccion.container';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

class ShopPage extends Component {
  componentDidMount() {
    const { fecthCollection } = this.props;
    fecthCollection();
  }
  
  render() {
    const { match } = this.props;
  
    return(
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    fecthCollection: () => dispatch( fetchCollectionsStartAsync() )
  }
}

export default connect( 
  null,
  mapDispatchToProps
)(ShopPage);