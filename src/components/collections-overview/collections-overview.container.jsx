import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import ColllectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

export const CollectionsOverviewContainer = compose(
    connect( mapStateToProps ),
    WithSpinner
) ( ColllectionsOverview );

export default CollectionsOverviewContainer;