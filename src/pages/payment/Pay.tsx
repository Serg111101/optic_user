import Payment from "../../components/cart/Stripe/Payment";
import Completion from "../../components/cart/Stripe/Completion";
import { knopka } from "../../components/cart/Stripe/checkoutForm";
import PaypalCheckout from "../../components/cart/Paypal/PaypalCheckout";
import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { buildPaymentRequest, getUpdatedPaymentData } from '../../components/cart/GooglePay/GooglePay';
import GooglePayButton from '@google-pay/button-react';
import { useNavigate } from "react-router-dom";
import './payment.scss'


const Pay = () => {

  const [Paymethod, setPaymethod] = useState<any>([
    {
      id: 1,
      title:'Payment in Stripe',
      done: false
    },
    {
      id: 2,
      title:'Payment in Paypal',
      done: false
    }, {
      id: 3,
      title:'Payment in GooglePay',
      done: false
    }
  ])

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [Paying, setPaying] = useState(true)
  const [Paysee, setPaysee] = useState(false)
  const navigate = useNavigate()
  const [paymentRequest, setPaymentRequest] = useState(buildPaymentRequest([]));
  let mek = knopka()


  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey }: any = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    Object.assign(
      paymentRequest,
      buildPaymentRequest(

        [
          {
            label: `${500} (${10}) x ${2}`,
            price: (0 * 1).toFixed(2),
            type: 'LINE_ITEM'
          }
        ]

      )
    );
    setPaymentRequest(paymentRequest);
  }, [paymentRequest]);

  function doneTodo(id: number) {
      const newMethod = Paymethod.map((method: any) => {
        if (method.id === id) method.done = !method.done
        return method
      })
      Paymethod.map((item:any)=>{
        if(item.done===true){
          setPaying(!Paying)
          setPaysee(!Paysee)
          return item
        }})
      setPaymethod(newMethod)
  }

  function handleLoadPaymentData(paymentData: google.payments.api.PaymentData) {
    console.log('Payment data', paymentData);
    navigate('/Completion');
  }

  return (<>{Paying &&
    <div className="modaling" >
      <h1>Choose a payment method</h1>
      
        {
          Paymethod.map((item:any)=>(
            <div className="modesta" onClick={() => doneTodo(item.id)}>
            <span className="spantitle">{item.title}</span>
            </div>
          ))
        }
    </div>}:<></>
    <main className='pay'>
      {Paysee && Paymethod[0].done &&
        <div>{mek ?
          <Payment stripePromise={stripePromise} />
          :
          <Completion stripePromise={stripePromise} />
        }
        </div>
      }
      {Paysee && Paymethod[1].done && <><PaypalCheckout />
        <div className='cart' id="payment-form"  >
        </div></>}
      {Paysee && Paymethod[2].done && <div className='cart' id="payment-form">
        <div className="googlepay">
          <h1>Payment in GPay</h1>
          <GooglePayButton
            environment="TEST"
            buttonSizeMode="fill"
            paymentRequest={paymentRequest}
            onLoadPaymentData={handleLoadPaymentData}
            onError={error => console.error(error)}
            onPaymentDataChanged={paymentData => getUpdatedPaymentData(paymentRequest, paymentData)}
          />
        </div>
      </div>
      }
    {
      Paysee &&   <button onClick={()=>navigate(0)}>Back to Choose payment method</button>
    }

    </main>
  </>
  )
}

export default Pay