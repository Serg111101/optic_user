import React, { useState} from "react";
import GoogleCheckout from "../../components/cart/GooglePay/GoogleCheckout";
import PaypalCheckout from "../../components/cart/Paypal/PaypalPayment";
import StripeChechkout from "../../components/cart/Stripe/StripeChechkout";
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

  const [Paying, setPaying] = useState(true)
  const [Paysee, setPaysee] = useState(false)
  const navigate = useNavigate()







  function doneTodo(id: number) {
      const newMethod = Paymethod.map((method: any) => {
        if (method.id === id) method.done = !method.done
        return method
      })
      for(let item of Paymethod){
        if(item.done===true){
          setPaying(!Paying)
          setPaysee(!Paysee)
        }}
      setPaymethod(newMethod)
  }



  return (<>{Paying &&
    <div className="modaling" >
      <h1>Choose a payment method</h1>
      
        {
          Paymethod.map((item:any)=>(
            <div className="modesta" onClick={() => doneTodo(item.id)} key={item.id}>
            <span className="spantitle">{item.title}</span>
            </div>
          ))
        }
    </div>}:<></>
    <main className='mainpay'>
      {Paysee && Paymethod[0].done &&
        <div>
          <StripeChechkout/>
        </div>
      }
      {Paysee && Paymethod[1].done && 
        <div className='cart' id="payment-form"  >
        <PaypalCheckout />
        </div>}
      {Paysee && Paymethod[2].done && <div className='cart' id="payment-form">
      <GoogleCheckout/>
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