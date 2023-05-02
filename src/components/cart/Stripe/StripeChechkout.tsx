import React, {useState, useEffect} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./Payment";
import Completion from "./Completion";
import { knopka } from "./checkoutForm";


const StripeChechkout = () => {

    const [stripePromise, setStripePromise] = useState<any>(null);


    useEffect(() => {
        fetch("/config").then(async (r) => {
          const { publishableKey }: any = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }, []);

      let mek = knopka()
  return (
    <div>
        {mek ?
          <Payment stripePromise={stripePromise} />
          :
          <Completion stripePromise={stripePromise} />
        }
    </div>
  )
}

export default StripeChechkout