import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner  from '../../components/with-spinner/with-spinner.component';
import CollectionComponent from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

export const CollectionContainer = compose(
    connect( mapStateToProps ),
    WithSpinner
) ( CollectionComponent );

export default CollectionContainer;