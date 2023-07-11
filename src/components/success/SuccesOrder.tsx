
import './Success.scss';
import { useNavigate } from 'react-router-dom';
export const SuccesOrder = () => {
    const navigate= useNavigate()
    const order:any = localStorage.getItem("Shipping")
    const orders = JSON.parse(order)
    function back(){
      localStorage.clear()
      navigate('/')
    }
  return (
    <div className="success">
     {orders ? <>
           <h4>Your tracking Number: {orders[1]?.trackingNumber}</h4>
           <a href={orders[1]?.labelDocument} rel='noreferrer' target="_blank"> Click Your Label Document  </a>
     </>: <h4>success</h4>
          }
          <button onClick={()=>back()}>Back To Top</button>
        </div>
  )
}
