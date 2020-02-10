import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner =  WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  componentDidMount() {
    const { fecthCollection } = this.props;
    fecthCollection();
  }
  
  render() {
    const { isFetching, isLoaded, match } = this.props;
  
    return(
      <div className='shop-page'>
      <Route exact path={`${match.path}`} 
        render={ 
          (props) => <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} /> 
        } 
      />
      <Route path={`${match.path}/:collectionId`} 
        render={ 
          (props) => <CollectionPageWithSpinner isLoading={!isLoaded} {...props} /> 
        } 
      />
    </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
  isLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = (dispatch) => {
  return {
    fecthCollection: () => dispatch( fetchCollectionsStartAsync() )
  }
}

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);