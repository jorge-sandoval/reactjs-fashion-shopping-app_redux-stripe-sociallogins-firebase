import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollection } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner =  WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true
  }

  unsubscribreData = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubscribreData = collectionRef.onSnapshot( async snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollection(collectionMap);
      this.setState( { loading: false } );
    })
  }
  
  componentWillUnmount() {
    this.unsubscribreData()
  }
  
  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return(
      <div className='shop-page'>
      <Route exact path={`${match.path}`} 
        render={ 
          (props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> 
        } 
      />
      <Route path={`${match.path}/:collectionId`} 
        render={ 
          (props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> 
        } 
      />
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