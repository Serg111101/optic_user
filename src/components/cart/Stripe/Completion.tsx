import {useEffect, useState} from 'react';
import "../cart.scss"
import {CheckCircleOutlined}  from "@ant-design/icons";
import {CloseCircleOutlined}  from "@ant-design/icons";
import { SuccesOrder } from '../../success/SuccesOrder';

function Completion(props:any) {
  const [ messageBody, setMessageBody ] = useState<any>('');
  const { stripePromise } = props;
  const order:any = localStorage.getItem("fedexShip")
  const orders = JSON.parse(order)
  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe:any) => {
      const url:URL = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);

  return (
    <>
      
     {messageBody ? <div className="messages" role="alert" style={{display: 'block'}}> <h1 className='errorin'>ERROR</h1>  <CloseCircleOutlined />  Status onsucssed </div>
      :<div className="messages" role="alert" style={{display: 'block'}}>  <SuccesOrder/> </div>}
    </>
  );
}

export default Completion;