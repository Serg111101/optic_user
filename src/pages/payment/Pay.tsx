import React, { useState} from "react";
import GoogleCheckout from "../../components/cart/GooglePay/GoogleCheckout";
import PaypalCheckout from "../../components/cart/Paypal/PaypalPayment";
import StripeChechkout from "../../components/cart/Stripe/StripeChechkout";
import { useNavigate } from "react-router-dom";
import { fetchUspsorder } from '../../store/action/OrderShipActions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { useEffect } from "react";
import { fetchFedexShip, fetchUspsShip } from "../../store/action/ShipAction";
import './payment.scss'


const Pay = () => {

  const ShipIds:any=localStorage.getItem('shipId')
  const ShipId=JSON.parse(ShipIds)

const navigate = useNavigate()
//  navigate('/pay')
const { uspsorder }:any = useAppSelector(state => state.uspsorder)
const dispatch = useAppDispatch()

useEffect(()=>{
  dispatch(fetchUspsorder(ShipId));
},[dispatch,ShipId])

const [price, setPrice]=useState<any>()
const [pricetrue, setPricetrue]=useState(false)

useEffect(()=>{
  
  setPrice(uspsorder)
  setPricetrue(true)
},[uspsorder])


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

  const [Paying, setPaying] = useState(true)
  const [Paysee, setPaysee] = useState(false)
  const [payseetrue, setPayseetrue]=useState(true)




async function Ship(){
    await dispatch(fetchUspsShip(price))
    await dispatch(fetchFedexShip())
    setPayseetrue(false)
   
}


  function doneTodo(id: number) {
      const newMethod = Paymethod.map((method: any) => {
        if (method.id === id) method.done = !method.done
        return method
      })
      Ship()
      for(let item of Paymethod){
        if(item.done===true){
          setPaying(!Paying)
          setPaysee(!Paysee)
          

        }}
      setPaymethod(newMethod)
  }



  return (<>
  {Paying && payseetrue &&
    <div className="modaling" >
      <h1>Choose a payment method</h1>
       <div  className="total">{pricetrue && price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>}</div>
        {
          Paymethod.map((item:any)=>(
            <div className="modesta" onClick={() => doneTodo(item.id)} key={item.id}>
            <span className="spantitle">{item.title}</span>
            </div>
          ))
        }
    </div>} 
    <main className='mainpay' >
      
      {Paysee && Paymethod[0].done &&
        <div>
          <StripeChechkout price={price}/>
        </div>
      }
      {Paysee && Paymethod[1].done && 
        <div className='cart' id="payment-form">
        <PaypalCheckout price={price} />
        </div>}
      {Paysee && Paymethod[2].done && <div className='cart' id="payment-form">
      <GoogleCheckout price={price} />
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