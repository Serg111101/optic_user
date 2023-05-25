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
const { uspsorder }:any = useAppSelector(state => state.uspsorder)
const { UspsShip, error1 }:any = useAppSelector(state => state.UspsShip)
const {loading, FedexShip, error}:any=useAppSelector((state:any)=>state.FedexShip)
const dispatch = useAppDispatch()
// const [price, setPrice]=useState<any>()
// const [pricetrue, setPricetrue]=useState(false)
const [uspsShip,setUspsShip]=useState<any>()
const [fedexShip,setFedexShip]=useState<any>()
const [errors,setError] = useState<any>()
const [loadings, setLoading]=useState<any>()
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
const [post, setPost]=useState(false)
const [Paying, setPaying] = useState(true)
const [Paysee, setPaysee] = useState(false)
const [payseetrue, setPayseetrue]=useState(true)

useEffect(()=>{
  setUspsShip(UspsShip)
  setFedexShip(FedexShip)
  setError(error)
  setLoading(loading)
  },[UspsShip,FedexShip])


useEffect(()=>{
  dispatch(fetchUspsorder(ShipId));
},[dispatch,ShipId])

const [price, setPrice]=useState<any>()
const [pricetrue, setPricetrue]=useState(false)
dispatch(fetchUspsorder(ShipId));

useEffect(()=>{
  setPrice(uspsorder)
  setPricetrue(true)
},[uspsorder])


async function Ship(){
    await dispatch(fetchUspsShip(price))
    await dispatch(fetchFedexShip())

  if(price[0]?.provider){
   await dispatch(fetchUspsShip(price))


  }else{

   await dispatch(fetchFedexShip())
  }
    setPayseetrue(false)
 
    setPaying(!Paying)

   
}


 async function doneTodo(id: number) {
    setLoading(true)
   await Ship()
    if(!error || !error1){
      setLoading(false)
      console.log(fedexShip);
      
      const newMethod = Paymethod.map((method: any) => {
        if (method.id === id) method.done = !method.done
        return method
      })
      for(let item of Paymethod){
        if(item.done===true){
          setPaysee(false)
        }}
      setPaymethod(newMethod)
    }else{
      setError('xndirner kan')
    }
}

  return (<>

  {Paying && payseetrue &&
    <div className="modaling" >
      <h1>Choose a payment method</h1>
      {loadings && <div>loading....</div>}
       <div  className="total">{pricetrue && price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>}</div>
        {
          Paymethod.map((item:any)=>(
            <div className="modesta" onClick={() => {doneTodo(item.id)}} key={item.id}>
            <span className="spantitle">{item.title}</span>
            </div>
          ))
        }
    </div>} 
   {/* {error || error1 ? <div>{error}</div>:
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
    </main>} */}
  </>
  )
}

export default Pay