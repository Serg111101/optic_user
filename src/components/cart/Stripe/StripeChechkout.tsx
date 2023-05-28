import React, {useState, useEffect} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./Payment";
import Completion from "./Completion";
import { knopka } from "./checkoutForm";


const StripeChechkout = () => {

    const [stripePromise, setStripePromise] = useState<any>(null);
    const [mek, setMek]=useState<any>(false)

    useEffect(() => {
    console.log("inside handleGetJson");
    fetch('/config')
    .then(async (response) => {
      console.log(response);
      
      const { publishableKey }:any = await response.json();
      console.log(publishableKey);
      
      setStripePromise(loadStripe(publishableKey));
    })
    .then((messages) => {console.log("messages");});
    setMek(knopka())
   
    }, []);

      console.log(stripePromise);
      
  return (
    <div>
        {mek ? <>
            {/* {price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>} */}
          <Payment stripePromise={stripePromise} /></>
          :
          <Completion stripePromise={stripePromise}/>
        }
    </div>
  )
}

export default StripeChechkout