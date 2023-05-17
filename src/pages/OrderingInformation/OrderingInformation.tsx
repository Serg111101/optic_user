import React, { useEffect, useState } from 'react'
import "./OrderingInformation.scss"
import { Aaa } from '../../components/aaa/Aaa'
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch, } from "../../hooks/redux";

 export const OrderingInformation = () => {


  const [step2,setStep2]=useState(false);
  const [step3,setStep3]=useState(false);
  const [step4,setStep4]=useState(false);
  const [step5,setStep5]=useState(false);
  const dispatch = useAppDispatch();


 

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className='Order'>
      <div className='step'>
        <div className='step1 ak'><hr />
        <div className="klor" id="klor1">1</div>
        </div>
        <div className={step2?'step2 ak':'step2'}><hr />
        <div className="klor" id="klor2" >2</div>
        </div>
        <div className={step3?'step3 ak':'step3'}><hr />
        <div className="klor" id="klor3" >3</div>
        </div>
        <div className={step4?'step4 ak':'step4'}><hr />
        <div className="klor" id="klor4" >4</div>
        </div>
        <div className={step5?'step5 ak':'step5'}><hr />
        <div className="klor" id="klor5" >5</div>
        </div>
      </div>
      <Aaa step2={step2} step3={step3} step4={step4} step5={step5} setStep2={setStep2} setStep3={setStep3} setStep4={setStep4} setStep5={setStep5} />
    </div>
  )
}
  
    

