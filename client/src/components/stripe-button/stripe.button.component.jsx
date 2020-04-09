import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ( { price } )=> {
    const priceInCents = price * 100;
    const publishableKey = 'pk_test_MajIoSvYXRUGGY1hrcXDD1N200hDawGFvf'

    const onToken = ( token ) => {
        axios({
            url: 'http://localhost:5000/payment',
            method: 'post',
            data: {
                amount: priceInCents,
                token
            }
        }).then( response => {
            alert('Payment successful');
        }).catch( error => {
            console.log( 'Payment error', error );
            alert('There was an issue with your paiment');
        });
    }

    return ( 
        <StripeCheckout 
            label="Pay Now"
            name="CROWN Clothing Ltd."
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