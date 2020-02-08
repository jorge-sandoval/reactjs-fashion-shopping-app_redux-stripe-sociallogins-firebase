import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollection } from '../../redux/shop/shop.actions';

class ShopPage extends Component {
  unsubscribreData = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot( async snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollection(collectionMap)
    })
  }
  
  componentWillUnmount() {
    this.unsubscribreData()
  }
  
  render() {
    const { match } = this.props;

    return(
      <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollection: collectionMap => dispatch( updateCollection(collectionMap) )
  }
}

export default connect( 
  null,
  mapDispatchToProps
)(ShopPage);