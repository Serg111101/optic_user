import {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm'
import '../cart.scss'

function Payment(props:any) {
  const { stripePromise }:any = props;
 

  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    fetch("/create-payment-intent")
      .then((res) => res.json())      
      .then(({clientSecret}) => setClientSecret(clientSecret));
  }, []);


  return (
    <>
    
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
              <h1>Payment in Stripe</h1>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
