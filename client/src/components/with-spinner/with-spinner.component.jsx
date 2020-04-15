import React from 'react';
import Spinner from '../spinner/spinner.component';

const WithSpinner = WrapperComponent => {
    const MySpinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? ( 
            <Spinner/>
        ): <WrapperComponent {...otherProps}/>;
    }

    return MySpinner
};

export default WithSpinner;