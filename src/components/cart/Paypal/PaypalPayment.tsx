import { CLIENT_ID } from '../../../Config/Config'
import React, { useState, useEffect } from "react" ;
import {PaypalPay} from './PaypalPay'


const PaypalCheckout = () => {
  const [clientToken, setClientToken] = useState(null);
  const clientId = "AYpZl-KPXdnlCR0DY7_DOvnBe-bWeoEaX22RnbdcpW9torewWYuSsyhOK24HO5d3mVzLiDH0LejDNsAu"
useEffect(() => {
	 	(async () => {
	 	    const response = await fetch("http://localhost:3000/api/v1/paypal/token", {
                  method: "post",
                  });
            const client_token = await response.json();
            setClientToken(client_token);
            console.log(client_token);
            
	 	})();
	 }, []);
  return (
    <>
     <div>
     <header >
     {clientToken ? (
        <PaypalPay clientToken={clientToken} clientID={clientId} />
      ) : (<h4>error</h4>) }
     </header>
     </div>
    </>
  );
}
export default PaypalCheckout