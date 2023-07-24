import React, { useState, useEffect } from "react" ;
import { Space, Spin } from 'antd';
import {PaypalPay} from './PaypalPay'
import { useNavigate } from 'react-router-dom';
const URL = process.env.REACT_APP_BASE_URL


const PaypalCheckout = () => {
  const [clientToken, setClientToken] = useState(null);
  const [error,setError] =useState<any>(false)
  const clientId = "AYpZl-KPXdnlCR0DY7_DOvnBe-bWeoEaX22RnbdcpW9torewWYuSsyhOK24HO5d3mVzLiDH0LejDNsAu"
  const navigate = useNavigate()
useEffect(() => {
     (async () => {
      try{
         const response = await fetch(URL+"api/v1/paypal/token", {
                  method: "post",
                  });
            const client_token = await response.json();
            setClientToken(client_token);
          }
            catch(error){
              setError(error)
              
            }
            
     })();
   }, []);
  return (

     <div className='Payment'>
     <header >
     {clientToken ? (
        <PaypalPay clientToken={clientToken} clientID={clientId} />
      ) : (error ? <button onClick={()=>navigate(0)}>Go Pay</button> :<div className="lod"><Space >
      <Spin size="large">
      </Spin>
    </Space>  </div> ) }
     </header>
     </div>

  );
}
export default PaypalCheckout