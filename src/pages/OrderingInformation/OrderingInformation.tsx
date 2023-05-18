import React, { useEffect, useState } from 'react'
import "./OrderingInformation.scss"
import { Aaa } from '../../components/aaa/Aaa'
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch, } from "../../hooks/redux";
import { CheckOutlined ,LoadingOutlined } from '@ant-design/icons';
 export const OrderingInformation = () => {


  
  const [step2 ,setStep2]= useState()
  const [step3,setStep3]=useState();
  const [step4,setStep4]=useState();
  const [step5,setStep5]=useState();
  const dispatch = useAppDispatch();
  
  
  useEffect(()=>{
    if(!localStorage.getItem("step2")){
      localStorage.setItem("step2","false")
      const stepp2:any = localStorage.getItem("step2")
      setStep2(JSON.parse(stepp2))
    }else{
      const stepp2:any = localStorage.getItem("step2")
      setStep2(JSON.parse(stepp2))
    }



    if(!localStorage.getItem("step3")){
      localStorage.setItem("step3","false")
      const stepp3:any = localStorage.getItem("step3")
      setStep3(JSON.parse(stepp3))
    }else{
      const stepp3:any = localStorage.getItem("step3")
      setStep3(JSON.parse(stepp3))
    }


    if(!localStorage.getItem("step4")){
      localStorage.setItem("step4","false")
      const stepp4:any = localStorage.getItem("step4")
      setStep4(JSON.parse(stepp4))
    }else{
      const stepp4:any = localStorage.getItem("step4")
      setStep4(JSON.parse(stepp4))
    }

    if(!localStorage.getItem("step5")){
      localStorage.setItem("step5","false")
      const stepp5:any = localStorage.getItem("step5")
      setStep5(JSON.parse(stepp5))
    }else{
      const stepp5:any = localStorage.getItem("step5")
      setStep5(JSON.parse(stepp5))
    }


  },[step2,step3,step4,step5,])

 

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className='Order'>
      <div className='step'>
        <div className='step1 ak'><hr />
        <div className="klor" id="klor1">{step2?<CheckOutlined />:<LoadingOutlined />}</div>
        </div>
        <div className={step2?'step2 ak':'step2'}><hr />
        <div className="klor" id="klor2" >{step3?<CheckOutlined />:<LoadingOutlined />}</div>
        </div>
        <div className={step3?'step3 ak':'step3'}><hr />
        <div className="klor" id="klor3" >{step4?<CheckOutlined />:<LoadingOutlined />}</div>
        </div>
        <div className={step4?'step4 ak':'step4'}><hr />
        <div className="klor" id="klor4" >{step5?<CheckOutlined />:<LoadingOutlined />}</div>
        </div>
        <div className={step5?'step5 ak':'step5'}><hr />
        <div className="klor" id="klor5" >{step2&&step3&&step4&&step5?<CheckOutlined />:<LoadingOutlined />}</div>
        </div>
      </div>
      <Aaa step2={step2} step3={step3} step4={step4} step5={step5} setStep2={setStep2} setStep3={setStep3} setStep4={setStep4} setStep5={setStep5} />
    </div>
  )
}
  
    

