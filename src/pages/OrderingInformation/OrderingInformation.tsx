import React, { useEffect, useState } from 'react'
import "./OrderingInformation.scss"
import { Step1 } from '../../components/Steps/Step1'
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import FinalOrder from '../../components/Steps/FinalOrder';
import { Loading } from '../../components/loading';


export const OrderingInformation = () => {
  const { loading,orders }: any = useAppSelector((state) => state.orders);
  
  console.log(typeof orders[0]?.is_active);
  
  
  let arr:any=sessionStorage?.getItem('orders')
  let [stepArr,setStepArr]=useState<any>(JSON.parse(arr)||[])
  const [step1, setStep1] = useState(false);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  


  useEffect(() => {
    if (orders.length>0 && !sessionStorage.getItem('orders')) {
      sessionStorage.setItem('orders', JSON.stringify(orders))
      setStepArr(orders)
    }
  }, [orders,dispatch])

  useEffect(()=>{
    if(stepArr?.length){
      setStep1(true)
      
    }
  },[stepArr])




  const [step2, setStep2] = useState();
  const [step3, setStep3] = useState();
  const [step4, setStep4] = useState();
  const [step5, setStep5] = useState();
  const [final, setFinal] = useState();
  const [total, setTotal] = useState();


  

  useEffect(() => {
    if (!sessionStorage.getItem("step2")) {
      sessionStorage.setItem("step2", "false")
      const stepp2: any = sessionStorage.getItem("step2")
      setStep2(JSON.parse(stepp2))
    } else {
      const stepp2: any = sessionStorage.getItem("step2")
      setStep2(JSON.parse(stepp2))
    }



    if (!sessionStorage.getItem("step3")) {
      sessionStorage.setItem("step3", "false")
      const stepp3: any = sessionStorage.getItem("step3")
      setStep3(JSON.parse(stepp3))
    } else {
      const stepp3: any = sessionStorage.getItem("step3")
      setStep3(JSON.parse(stepp3))
    }


    if (!sessionStorage.getItem("step4")) {
      sessionStorage.setItem("step4", "false")
      const stepp4: any = sessionStorage.getItem("step4")
      setStep4(JSON.parse(stepp4))
    } else {
      const stepp4: any = sessionStorage.getItem("step4")
      setStep4(JSON.parse(stepp4))
    }

    if (!sessionStorage.getItem("step5")) {
      sessionStorage.setItem("step5", "false")
      const stepp5: any = sessionStorage.getItem("step5")
      setStep5(JSON.parse(stepp5))
    } else {
      const stepp5: any = sessionStorage.getItem("step5")
      setStep5(JSON.parse(stepp5))
    }
    if (!sessionStorage.getItem("final")) {
      sessionStorage.setItem("final", "false")
      const final: any = sessionStorage.getItem("final")
      setFinal(JSON.parse(final))
    } else {
      const final: any = sessionStorage.getItem("final")
      setFinal(JSON.parse(final))
    }

  }, [step2, step3, step4, step5, final])


  let arr1:any =[]
  if(orders != "Table is empty"){
   arr1 = orders?.map((item: any) => item.table_name);
  
  }
  
  // let arr1 = orders?.map((item: any) => item.table_name);


  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);

   console.log(stepArr);
   

  return (
    <>
    {loading?<Loading/>:
    <div className='Order'>
      {final && total ? <FinalOrder total={total} /> :
        <>
          <div className='step'>
            <div className='step1 ak'><hr />
              <div className="klor" id="klor1">{step2 ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
            <div className={step2 ? 'step2 ak' : 'step2'}><hr />
              <div className="klor" id="klor2" >{step3 ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
            <div className={step3 ? 'step3 ak' : 'step3'}><hr />
              <div className="klor" id="klor3" >{step4 ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
            {/* <div className={step4 ? 'step4 ak' : 'step4'}><hr />
              <div className="klor" id="klor4" >{step5 ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div> */}
            <div className={step4 ? 'step4 ak' : 'step4'}><hr />
              <div className="klor" id="klor5" >{final ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
          </div>
       <Step1 headArr={headArr} stepArr={stepArr} setStepArr={setStepArr} step2={step2} step3={step3} step4={step4} step5={step5} final={final} setStep2={setStep2} setStep3={setStep3} setStep4={setStep4} setStep5={setStep5} setFinal={setFinal} />
        </>
      }
    </div>}   
    </>
  )
}



