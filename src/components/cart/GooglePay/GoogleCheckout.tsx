import React, {useState, useEffect} from 'react'
import { buildPaymentRequest, getUpdatedPaymentData } from './GooglePay';
import GooglePayButton from '@google-pay/button-react';
import { useNavigate } from "react-router-dom";




const GoogleCheckout = ({price}:any) => {

  const [paymentRequest, setPaymentRequest] = useState(buildPaymentRequest([]));
  const navigate = useNavigate()


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

  function handleLoadPaymentData(paymentData: google.payments.api.PaymentData) {
    navigate('/Completion');
  }

  return (
    <div className='googlepay '>
          <h1>Payment in GPay</h1>
          {price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>}

          <GooglePayButton
            environment="TEST"
            buttonSizeMode="fill"
            paymentRequest={paymentRequest}
            onLoadPaymentData={handleLoadPaymentData}
            onError={error => console.error(error)}
            onPaymentDataChanged={paymentData => getUpdatedPaymentData(paymentRequest, paymentData)}
          />
    </div>
  )
}

export default GoogleCheckout