import React, { useState} from "react";
import GoogleCheckout from "../../components/cart/GooglePay/GoogleCheckout";
import PaypalCheckout from "../../components/cart/Paypal/PaypalPayment";
import StripeChechkout from "../../components/cart/Stripe/StripeChechkout";
import { useNavigate } from "react-router-dom";
import { fetchUspsorder } from '../../store/action/OrderShipActions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { useEffect } from "react";
import axios from "axios"
import './payment.scss'


const Pay = () => {

const ShipIds:any=localStorage.getItem('shipId')
const ShipId=JSON.parse(ShipIds)
const navigate = useNavigate()
const { uspsorder }:any = useAppSelector(state => state.uspsorder)
const { UspsShip, error1 }:any = useAppSelector(state => state.UspsShip)
const {loading, FedexShip, error}:any=useAppSelector((state:any)=>state.FedexShip)
const dispatch = useAppDispatch()
const [price, setPrice]=useState<any>()
const [pricetrue, setPricetrue]=useState(false)
const [uspsShip,setUspsShip]=useState<any>()
const [fedexShip,setFedexShip]=useState<any>()
const [errors,setError] = useState<any>()
const [loadings, setLoading]=useState<any>()
const [allprice, setAllprice]=useState<any>()
const [Paymethod, setPaymethod] = useState<any>()
const [post, setPost]=useState(true)
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
name()
},[dispatch])

useEffect(()=>{
  setPrice(uspsorder)
 
  setPricetrue(true)
  priceer()
},[uspsorder, price])


async function name() {
  const response = await axios.get('http://localhost:3000/api/v1/users/paymentMethods');
 setPaymethod(response.data)
}
let sum:any = localStorage?.getItem('price')
let priceOrder:any = JSON.parse(sum)
if(priceOrder===null){
  priceOrder= 0
}
function priceer(){
  if(price !== undefined && pricetrue && price[0] !== "change failed"){
if(price[0]?.amount){

  
  setAllprice(priceOrder + (+price[0].amount))
  localStorage.setItem('price1', JSON.stringify(priceOrder + ( + price[0].amount)))
}else if(price[0]?.ratedShipmentDetails){

  
setAllprice(priceOrder + (price[0]?.ratedShipmentDetails[0]?.totalNetFedExCharge))
localStorage.setItem('price1', JSON.stringify(priceOrder + (price[0]?.ratedShipmentDetails[0]?.totalNetFedExCharge)))
}
}
}
async function Ship(){

    setPayseetrue(false)
    setPaying(!Paying)

   
}
async function doneTodo(id: number) {
  setLoading(true)
  await Ship()
  if(!error || !error1){
    setLoading(false)
    
    const newMethod = Paymethod.map((method: any) => {
      if (method.id === id) method.done = !method.done
      return method
    })
    for(let item of Paymethod){
      if(item.done===true){
        setPaysee(!Paysee)
      }}
    setPaymethod(newMethod)
  }else{
    setError('Payment error')
  }
  setPost(false)
}

   


return (<div className="container_pay">
{loading && <div>Loading....</div>}
{Paying && payseetrue &&  price?.length >0 && <div className="box-pay"> 
{error || error1 ? <div className="error"><h3>Shipp Errorr</h3> <button onClick={()=>navigate("/rate")}>back shipp</button> </div>: <div className="modaling" >
    <h1>Choose a payment method</h1>
    {loadings && <div>loading....</div>}
     
      {
        Paymethod?.map((item:any)=>
          item.status === true ?
           <div className="modesta" onClick={() => {doneTodo(item.id)}} key={item.id}>
            <img src={item.icon} alt="PayIcon"/>
          <span className="spantitle">{item.title}</span>
          </div>:<div className="modesta">{errors}</div>
          
        
)
      }
  </div>}
 { error || error1 ? " ":  <div className="total-box">
  <div  className="total">{price[0] !== "change failed" && price[0]?.provider && pricetrue &&  price    ? <div className="text"><span>Ship Price:</span>  <p>  {price[0]?.amount} {price[0]?.currency}</p></div>:
   pricetrue && price[0] !== "change failed"  && <div className="text"><span>Ship Price:</span>  <p> {price[0]?.ratedShipmentDetails[0]?.totalNetFedExCharge} {price[0]?.ratedShipmentDetails[0]?.currency}</p> </div>
    
 } {<div className="text"><span>Order Price:</span>  <p>  {priceOrder} USD</p></div>}
  <div className="line"> </div>
 {   pricetrue && price[0] !== "change failed" ? <div className="text"><span>Total Price:</span>  <p> {allprice}USD</p></div>:
 <div className="text"><span>Total Price:</span>  <p> {priceOrder } USD</p></div>
 }
  
 </div>
  </div>}
  </div>} 
 
  <main className='mainpay' >
    
    {Paysee && Paymethod[0]?.done && allprice &&
      <div>
           <PaypalCheckout />
       
      </div>
    }
    {Paysee && Paymethod[1]?.done && 
      <div className='cart' id="payment-form">
          <StripeChechkout/>
  
    
      </div>}
    {Paysee && Paymethod[2]?.done && <div className='cart' id="payment-form">
    <GoogleCheckout price={allprice} />
    </div>
    }
  {
    Paysee && post && <button onClick={()=>navigate(0)}>Back to Choose payment method</button>
  }
  </main>
</div>
)
}

export default Pay