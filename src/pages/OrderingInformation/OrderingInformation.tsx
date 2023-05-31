import React, { useEffect, useState } from 'react'
import "./OrderingInformation.scss"
import { Step1 } from '../../components/aaa/Step1'
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch, } from "../../hooks/redux";
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import FinalOrder from '../../components/aaa/FinalOrder';
export const OrderingInformation = () => {

  const [step2, setStep2] = useState();
  const [step3, setStep3] = useState();
  const [step4, setStep4] = useState();
  const [step5, setStep5] = useState();
  const [final, setFinal] = useState();
  const [total, setTotal] = useState();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  console.log(total);
  
  useEffect(() => {
    if (final) {
      const x: any = sessionStorage
      const y:any = []
      const z: any = []
      for (let key in x) {
        if (key?.slice()?.includes('_')) {
          y.push(key)
        }
      }
      y.sort()
      y.map((el: any) => {
        z.push(...JSON.parse(x[el]));
      })
      const zz = z.filter((el: any) => {
        if (el.is_active === null||el.is_active===true) {
          return el
        }
      })
      if(!total){
        setTotal(zz)
      }
    }
  }, [final, total])
  
  return (
    <div className='Order'>
      {final&&total ? <FinalOrder total={total}/> :
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
            <div className={step4 ? 'step4 ak' : 'step4'}><hr />
              <div className="klor" id="klor4" >{step5 ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
            <div className={step5 ? 'step5 ak' : 'step5'}><hr />
              <div className="klor" id="klor5" >{final ? <CheckOutlined /> : <LoadingOutlined />}</div>
            </div>
          </div>
           <Step1 step2={step2} step3={step3} step4={step4} step5={step5} final={final} setStep2={setStep2} setStep3={setStep3} setStep4={setStep4} setStep5={setStep5} setFinal={setFinal} />
        </>
      }
    </div>
  )
}



