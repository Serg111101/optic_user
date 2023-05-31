import {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm'
import '../cart.scss'

function Payment(props:any) {
  const { stripePromise }:any = props;
 console.log(stripePromise);
 

  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    fetch("/create-payment-intent")
      .then(async(res) => await res.json())  
      // .then((res)=>console.log(res))
      .then(({clientSecret}) => setClientSecret(clientSecret));
      console.log(clientSecret);
      
  }, []);


  return (
    <>
    
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
