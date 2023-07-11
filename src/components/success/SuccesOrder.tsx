
import './Success.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const SuccesOrder = () => {
    const navigate= useNavigate()
    const order:any = localStorage.getItem("Shipping")
    const orders = JSON.parse(order)
    console.log(orders);
    function back(){
      localStorage.clear()
      navigate('/rate')
    }
  return (
    <div className="success">
     {orders ? <>
           <h4>Your tracking Number: {orders[1]?.trackingNumber}</h4>
           <a href={orders[1]?.labelDocument} target="_blank"> Your labelDocument  </a>
     </>: <h4>success</h4>
          }
          <button onClick={()=>back()}>Back To Top</button>
        </div>
  )
}
