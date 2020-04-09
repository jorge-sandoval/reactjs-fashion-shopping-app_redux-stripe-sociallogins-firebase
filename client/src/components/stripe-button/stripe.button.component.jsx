import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( { price } )=> {
    const priceInCents = price * 100;
    const publishableKey = 'pk_test_MajIoSvYXRUGGY1hrcXDD1N200hDawGFvf'

    const onToken = token => {
        console.log(token);
        alert('Paymenent Succesfull');
    }

    return ( 
        <StripeCheckout 
            label="Pay Now"
            name="CROWN Clothing Ltd."
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}  
        />
    )
}

export default StripeCheckoutButton;