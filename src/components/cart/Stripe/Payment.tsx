import {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm'
import '../cart.scss'

const URL = process.env.REACT_APP_BASE_URL


function Payment(props:any) {
  const { stripePromise }:any = props;
 const amounts:any=localStorage.getItem("price1")
 const amount = JSON.parse(amounts)


  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    fetch(`/api/v1/stripe/create-payment-intent/${amount}`)
      .then(async(res) => await res.json())  
      .then(({clientSecret}) => setClientSecret(clientSecret));
      
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
